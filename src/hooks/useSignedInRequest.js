import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useAuth } from 'react-oidc-context';

// Requests as the signed-in user (react-oidc-context), for pages that need more than useGet,
// usePut and usePost give: it reports whether there's a usable token yet (hasToken), so a page
// can wait for it; ignores an answer that a newer request has overtaken; catches network
// failures; signs in again when the API rejects the token (a 401 with no message; at most once
// a minute); and never hands the server's raw body to the page.
//
// send(url, body) returns a promise of { ok, status, result, errorMessage, superseded }:
// - result is the parsed JSON of a successful response (null for an empty body);
// - errorMessage is the API's refusal message, only for a 4xx whose body is a JSON string (how
//   Linn.Common.Service writes a BadRequestResult's message); anything else, such as an HTML
//   error page or a stack trace, gives null, and the page says something of its own instead;
// - superseded is true when a later send (or clearData) on the same hook has happened since, so
//   the page should ignore this answer.
// The same values (but superseded) are also kept as state, for the page to render from.

const signInAgainKey = 'auth:signedInAgainAt';
const oneMinute = 60 * 1000;

const refusalMessage = (status, text) => {
    if (status < 400 || status >= 500 || !text) {
        return null;
    }
    try {
        const parsed = JSON.parse(text);
        return typeof parsed === 'string' && parsed.trim() ? parsed : null;
    } catch {
        return null;
    }
};

// A token the server keeps refusing would otherwise send the browser round the sign-in loop
// for ever, so this signs in again at most once a minute.
const signInAgain = auth => {
    try {
        const last = Number(sessionStorage.getItem(signInAgainKey) ?? 0);
        if (Date.now() - last < oneMinute) {
            return;
        }
        sessionStorage.setItem(signInAgainKey, String(Date.now()));
        sessionStorage.setItem('auth:redirect', window.location.pathname);
    } catch {
        return;
    }
    Promise.resolve(auth?.signinRedirect?.()).catch(() => {});
};

const idle = { isLoading: false, result: null, status: null, errorMessage: null };

function useSignedInRequest(method) {
    const auth = useAuth();
    const token = auth?.user?.access_token;
    // a stored token that has expired is being renewed (or the app is signing in again), so the
    // page waits rather than loading with it and getting a 401
    const hasToken = !!token && !auth?.user?.expired;

    // Kept in refs so that send keeps its identity when the token is renewed (react-oidc-context
    // renews it silently in the background): a page that loads in an effect depending on send
    // would otherwise load again, and throw away the user's unsaved edits.
    // A layout effect, so they're up to date before any component's ordinary effects run: a child
    // that sends as soon as hasToken turns true would otherwise send without the token.
    const authRef = useRef(auth);
    const tokenRef = useRef(token);
    useLayoutEffect(() => {
        authRef.current = auth;
        tokenRef.current = token;
    }, [auth, token]);

    const [state, setState] = useState(idle);
    const latestRequest = useRef(0);

    const send = useCallback(
        async (url, body) => {
            latestRequest.current += 1;
            const thisRequest = latestRequest.current;
            setState(previous => ({ ...previous, isLoading: true, errorMessage: null }));

            const headers = { accept: 'application/json' };
            if (tokenRef.current) {
                headers.Authorization = `Bearer ${tokenRef.current}`;
            }
            if (body !== undefined) {
                headers['Content-Type'] = 'application/json';
            }

            let outcome;
            try {
                const response = await fetch(url, {
                    method,
                    headers,
                    body: body === undefined ? undefined : JSON.stringify(body)
                });
                const text = await response.text();
                if (response.ok) {
                    outcome = {
                        ok: true,
                        status: response.status,
                        result: text ? JSON.parse(text) : null,
                        errorMessage: null
                    };
                } else {
                    const errorMessage = refusalMessage(response.status, text);
                    // A token the API rejects (expired, say) gets the bearer challenge: a 401 with
                    // no body. A 401 with a message is the app's own ("Could not identify the
                    // logged in employee"), which signing in again won't fix.
                    if (response.status === 401 && !errorMessage) {
                        signInAgain(authRef.current);
                    }
                    outcome = {
                        ok: false,
                        status: response.status,
                        result: null,
                        errorMessage
                    };
                }
            } catch {
                // the network failed, or a success body wasn't JSON
                outcome = { ok: false, status: null, result: null, errorMessage: null };
            }

            const superseded = thisRequest !== latestRequest.current;
            if (!superseded) {
                setState({ isLoading: false, ...outcome });
            }
            return { ...outcome, superseded };
        },
        [method]
    );

    const clearData = useCallback(() => {
        // an answer still on its way is no longer wanted
        latestRequest.current += 1;
        setState(idle);
    }, []);

    return { send, ...state, clearData, hasToken };
}

export default useSignedInRequest;
