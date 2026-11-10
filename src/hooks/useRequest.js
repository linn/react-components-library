import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useRequestAuth } from './requestAuth.js';

// The shared core of useGet, usePut, usePost and useDelete (not exported): sends a request as the
// signed-in user and gives back its outcome. Each hook keeps its own signature and state on top.
//
// request(url, { body, signal }) returns a promise of
// { ok, status, result, errorMessage, apiMessage, tokenRejected, superseded }:
// - result is the parsed JSON of a successful answer; null for a 204 or an empty body;
// - errorMessage is what the hooks have always given: a refusal's body as it came, or the hook's
//   own text for a network failure (see networkFailureMessage);
// - apiMessage is only the API's own refusal message: a 4xx whose body is a JSON string (how
//   Linn.Common.Service writes a BadRequestResult), otherwise null. Never a stack trace or an
//   HTML page, so it's safe to show as it is;
// - tokenRejected is true when the API rejected the token the request carried (see isTokenRejected).
//   The hooks don't sign in again by themselves: a page with unsaved edits would lose them. The page
//   decides, with signInAgain (which each hook returns);
// - superseded is true when a later request (or forgetEarlierRequests) on the same hook has
//   happened since: the hook doesn't keep it, and the page should ignore it.

const signInAgainKey = 'auth:signedInAgainAt';
const oneMinute = 60 * 1000;

const apiMessageOf = (status, text) => {
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

// A success with nothing to parse: a 204, or an empty body (Content-Length: 0). An answer with no
// headers at all (a test's fake fetch, say) is parsed with json(), as the hooks always have.
const hasNoBody = response =>
    response.status === 204 || response.headers?.get?.('Content-Length') === '0';

// A token the API rejects (expired, say) gets the bearer challenge from the API's sign-in
// middleware: a 401 with WWW-Authenticate: Bearer error="invalid_token". Any other 401 is the app's
// own refusal (often "you don't have permission"), which signing in again won't fix, whatever its
// body.
// So the API must call Linn.Common.Authentication.Host's app.UseBearerTokenAuthentication() (5.0.0
// on); referencing the package isn't enough (finance has it, but uses plain UseAuthentication(), so a
// rejected token is treated as no sign-in at all). And for a page on another origin (a dev server
// calling the API on another port) the API's CORS settings must expose WWW-Authenticate, or the
// browser hides it. Without either, a rejected token is just a failed request.
const isTokenRejected = response =>
    response.status === 401 &&
    (response.headers?.get?.('WWW-Authenticate') ?? '').toLowerCase().startsWith('bearer');

// A page that signs in again by itself whenever a token is rejected would, with a token the server
// keeps refusing, send the browser round the sign-in loop for ever, so this signs in again at most
// once a minute. force skips that limit, for the user's own click (a Sign in button), which can't
// loop.
const signInAtMostOnceAMinute = (signIn, force) => {
    try {
        const last = Number(sessionStorage.getItem(signInAgainKey) ?? 0);
        if (!force && Date.now() - last < oneMinute) {
            return;
        }
        sessionStorage.setItem(signInAgainKey, String(Date.now()));
    } catch {
        // with no sessionStorage there's no telling how recently it last signed in again
        if (!force) {
            return;
        }
    }
    Promise.resolve()
        .then(() => signIn?.())
        .catch(() => {});
};

function useRequest(method, requiresAuth, networkFailureMessage) {
    const { user, signIn } = useRequestAuth();
    const token = user?.access_token;
    // A stored token that has expired when the page opens is being renewed (or the app is signing
    // in again), so a page can wait rather than send it and be refused. Once a token has arrived,
    // though, hasToken stays true while it expires and is renewed (a laptop waking from sleep, say),
    // so a page loading on hasToken doesn't load again and throw away the user's edits; a request
    // sent meanwhile is refused (tokenRejected). It's false again only when there's no token.
    const freshToken = !!token && !user?.expired;
    const [hadToken, setHadToken] = useState(freshToken);
    if (freshToken && !hadToken) {
        setHadToken(true);
    } else if (!token && hadToken) {
        setHadToken(false);
    }
    const hasToken = freshToken || (hadToken && !!token);

    // Kept in refs so that request (and each hook's send) keeps its identity when the token is
    // renewed (react-oidc-context renews it silently in the background): a page that loads in an
    // effect depending on send would otherwise load again, and throw away the user's unsaved edits.
    // A layout effect, so they're up to date before any component's ordinary effects run: a child
    // that sends as soon as hasToken turns true would otherwise send without the token.
    const signInRef = useRef(signIn);
    const tokenRef = useRef(token);
    useLayoutEffect(() => {
        signInRef.current = signIn;
        tokenRef.current = token;
    }, [signIn, token]);

    const latestRequest = useRef(0);
    const isLatest = useCallback(thisRequest => thisRequest === latestRequest.current, []);

    // an answer still on its way is no longer wanted
    const forgetEarlierRequests = useCallback(() => {
        latestRequest.current += 1;
    }, []);

    const request = useCallback(
        async (url, { body, signal } = {}) => {
            latestRequest.current += 1;
            const thisRequest = latestRequest.current;

            const headers = { accept: 'application/json' };
            if (body !== undefined || method !== 'GET') {
                headers['Content-Type'] = 'application/json';
            }
            // with no token yet, the request goes without one (as not signed in) rather than
            // with "Bearer undefined", which the API would reject
            if (requiresAuth && tokenRef.current) {
                headers.Authorization = `Bearer ${tokenRef.current}`;
            }

            let outcome;
            try {
                const response = await fetch(url, {
                    method,
                    headers,
                    body: body === undefined ? undefined : JSON.stringify(body),
                    signal
                });
                if (response.ok) {
                    outcome = {
                        ok: true,
                        status: response.status,
                        result: hasNoBody(response) ? null : await response.json(),
                        errorMessage: null,
                        apiMessage: null,
                        tokenRejected: false
                    };
                } else {
                    const text = await response.text();
                    outcome = {
                        ok: false,
                        status: response.status,
                        result: null,
                        errorMessage: text,
                        apiMessage: apiMessageOf(response.status, text),
                        // only a token that was sent can have been rejected: a request sent before
                        // there was one gets the same challenge, and the app's own sign-in deals
                        // with that
                        tokenRejected: !!headers.Authorization && isTokenRejected(response)
                    };
                }
            } catch (error) {
                // the network failed, or a success body wasn't JSON
                outcome = {
                    ok: false,
                    status: null,
                    result: null,
                    errorMessage: networkFailureMessage(error),
                    apiMessage: null,
                    tokenRejected: false
                };
            }

            return { ...outcome, superseded: !isLatest(thisRequest) };
        },
        // hasToken: a page that sends in an effect on send, without waiting for the token, loads
        // again once there is one (as these hooks always have); a renewed token doesn't
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [method, requiresAuth, networkFailureMessage, isLatest, hasToken]
    );

    // signs in again, for a page to call when a request's token was rejected (tokenRejected): at most
    // once a minute, coming back to this page; signInAgain({ force: true }) for the user's own click
    const signInAgain = useCallback(
        ({ force = false } = {}) => signInAtMostOnceAMinute(signInRef.current, force),
        []
    );

    return { request, forgetEarlierRequests, hasToken, signInAgain };
}

export default useRequest;
