import React, { useEffect } from 'react';
import { act, render, renderHook, waitFor } from '@testing-library/react';
import { useAuth } from 'react-oidc-context';
import useGet from '../useGet.js';
import usePut from '../usePut.js';
import usePost from '../usePost.js';

// What useGet, usePut and usePost share (useRequest.js), with no url of their own: each send gives
// the whole URL and returns the outcome.

jest.mock('react-oidc-context', () => ({ useAuth: jest.fn() }));
jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn() }));

const signinRedirect = jest.fn();
const signedIn = (user = { access_token: 'a-token', expired: false }) =>
    useAuth.mockReturnValue({ user, signinRedirect });

const respond = (status, body, headers = {}) =>
    Promise.resolve({
        ok: status >= 200 && status < 300,
        status,
        headers: new Headers(headers),
        text: () => Promise.resolve(body === undefined ? '' : JSON.stringify(body)),
        json: () => Promise.resolve(body)
    });

// What Linn.Common.Authentication.Host's UseBearerTokenAuthentication answers a token it rejects
const bearerChallenge = { 'WWW-Authenticate': 'Bearer error="invalid_token"' };

beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    signedIn();
    global.fetch = jest.fn(() => respond(200, { id: 1 }));
});

describe('useGet, usePut and usePost with no url of their own', () => {
    test("sends the signed-in user's token", async () => {
        const { result } = renderHook(() => useGet(null, true));

        await act(async () => {
            await result.current.send('/things/1');
        });

        expect(fetch).toHaveBeenCalledWith('/things/1', {
            method: 'GET',
            headers: { accept: 'application/json', Authorization: 'Bearer a-token' },
            body: undefined,
            signal: undefined
        });
    });

    test('gives the parsed result of a successful answer', async () => {
        const { result } = renderHook(() => useGet(null, true));

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things/1');
        });

        expect(outcome).toEqual({
            ok: true,
            status: 200,
            result: { id: 1 },
            errorMessage: null,
            apiMessage: null,
            tokenRejected: false,
            superseded: false
        });
    });

    test('keeps the result of a successful answer as state', async () => {
        const { result } = renderHook(() => useGet(null, true));

        await act(async () => {
            await result.current.send('/things/1');
        });

        expect(result.current.result).toEqual({ id: 1 });
        expect(result.current.isLoading).toBe(false);
    });

    test('sends a body as JSON', async () => {
        const { result } = renderHook(() => usePut(null, true));

        await act(async () => {
            await result.current.send('/things/1', { name: 'x' });
        });

        expect(fetch.mock.calls[0][1]).toMatchObject({
            method: 'PUT',
            body: '{"name":"x"}',
            headers: { 'Content-Type': 'application/json' }
        });
    });

    test('has no token while there is no signed-in user', () => {
        useAuth.mockReturnValue({ user: null, signinRedirect });

        const { result } = renderHook(() => useGet(null, true));

        expect(result.current.hasToken).toBe(false);
    });

    test('has no token while the stored one has expired', () => {
        useAuth.mockReturnValue({
            user: { access_token: 'old', expired: true },
            signinRedirect
        });

        const { result } = renderHook(() => useGet(null, true));

        expect(result.current.hasToken).toBe(false);
    });

    test('keeps hasToken while a token it already had expires and is renewed', () => {
        const { result, rerender } = renderHook(() => useGet(null, true));

        signedIn({ access_token: 'a-token', expired: true });
        rerender();

        expect(result.current.hasToken).toBe(true);
    });

    test('keeps send while a token it already had expires and is renewed', () => {
        const { result, rerender } = renderHook(() => useGet(null, true));
        const { send } = result.current;

        signedIn({ access_token: 'a-token', expired: true });
        rerender();
        signedIn({ access_token: 'a-renewed-token', expired: false });
        rerender();

        expect(result.current.send).toBe(send);
    });

    test('has no token again once the user is signed out', () => {
        const { result, rerender } = renderHook(() => useGet(null, true));

        useAuth.mockReturnValue({ user: null, signinRedirect });
        rerender();

        expect(result.current.hasToken).toBe(false);
    });

    test('a request sent before there was a token is not tokenRejected when the API challenges it', async () => {
        useAuth.mockReturnValue({ user: null, signinRedirect });
        fetch.mockReturnValueOnce(respond(401, undefined, { 'WWW-Authenticate': 'Bearer' }));
        const { result } = renderHook(() => useGet(null, true));

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things/1');
        });

        expect(outcome.tokenRejected).toBe(false);
    });

    test('has a token once the user has one that has not expired', () => {
        useAuth.mockReturnValue({
            user: { access_token: 'a-token', expired: false },
            signinRedirect
        });

        const { result } = renderHook(() => useGet(null, true));

        expect(result.current.hasToken).toBe(true);
    });

    test("gives a 4xx's message as apiMessage when its body is a JSON string", async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({
                ok: false,
                status: 400,
                text: () => Promise.resolve('"Quantity must be a number"')
            })
        );
        const { result } = renderHook(() => usePost(null, true));

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things', {});
        });

        expect(outcome).toMatchObject({
            ok: false,
            status: 400,
            apiMessage: 'Quantity must be a number'
        });
    });

    test("doesn't give a 5xx's body as apiMessage, even when it's a JSON string", async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({
                ok: false,
                status: 500,
                text: () => Promise.resolve('"at Linn.Something.Save()"')
            })
        );
        const { result } = renderHook(() => usePost(null, true));

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things', {});
        });

        expect(outcome).toMatchObject({ ok: false, status: 500, apiMessage: null });
    });

    test("doesn't give a 4xx's body as apiMessage when it isn't a JSON string", async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({
                ok: false,
                status: 400,
                text: () => Promise.resolve('<html><body>Bad Request</body></html>')
            })
        );
        const { result } = renderHook(() => usePost(null, true));

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things', {});
        });

        expect(outcome).toMatchObject({ ok: false, status: 400, apiMessage: null });
    });

    test("errorMessage is a refusal's body as it came, as the hooks have always given", async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({
                ok: false,
                status: 400,
                text: () => Promise.resolve('"Quantity must be a number"')
            })
        );
        const { result } = renderHook(() => usePost(null, true));

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things', {});
        });

        expect(outcome.errorMessage).toBe('"Quantity must be a number"');
        expect(result.current.errorMessage).toBe('"Quantity must be a number"');
    });

    test('a network failure is a failure, not an exception', async () => {
        fetch.mockReturnValueOnce(Promise.reject(new TypeError('Failed to fetch')));
        const { result } = renderHook(() => useGet(null, true));

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things/1');
        });

        expect(outcome).toMatchObject({ ok: false, status: null, apiMessage: null });
        expect(outcome.errorMessage).toBe('Failed to fetch');
        expect(result.current.isLoading).toBe(false);
    });

    test('an answer overtaken by a newer request is marked superseded and not kept', async () => {
        let answerFirst;
        fetch
            .mockReturnValueOnce(new Promise(resolve => (answerFirst = resolve)))
            .mockReturnValueOnce(respond(200, { id: 2 }));
        const { result } = renderHook(() => useGet(null, true));

        let first;
        await act(async () => {
            first = result.current.send('/things/1');
            await result.current.send('/things/2');
        });
        await act(async () => {
            answerFirst(await respond(200, { id: 1 }));
        });

        expect((await first).superseded).toBe(true);
        expect(result.current.result).toEqual({ id: 2 });
    });

    test('a rejected token (the bearer challenge) is reported as tokenRejected', async () => {
        fetch.mockReturnValueOnce(respond(401, undefined, bearerChallenge));
        const { result } = renderHook(() => useGet(null, true));

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things/1');
        });

        expect(outcome.tokenRejected).toBe(true);
        expect(result.current.tokenRejected).toBe(true);
    });

    test('a rejected token does not sign in again by itself (a page with edits would lose them)', async () => {
        fetch.mockReturnValueOnce(respond(401, undefined, bearerChallenge));
        const { result } = renderHook(() => useGet(null, true));

        await act(async () => {
            await result.current.send('/things/1');
        });

        expect(signinRedirect).not.toHaveBeenCalled();
    });

    test('signInAgain signs in', async () => {
        const { result } = renderHook(() => useGet(null, true));

        await act(async () => {
            result.current.signInAgain();
        });

        expect(signinRedirect).toHaveBeenCalledTimes(1);
    });

    test('signInAgain remembers the page to come back to', async () => {
        const { result } = renderHook(() => useGet(null, true));

        await act(async () => {
            result.current.signInAgain();
        });

        expect(sessionStorage.getItem('auth:redirect')).toBe(window.location.pathname);
    });

    test('signInAgain a second time within a minute does not sign in again', async () => {
        const { result } = renderHook(() => useGet(null, true));

        await act(async () => {
            result.current.signInAgain();
        });
        await act(async () => {
            result.current.signInAgain();
        });

        expect(signinRedirect).toHaveBeenCalledTimes(1);
    });

    test("signInAgain with force signs in even within a minute (the user's own click)", async () => {
        const { result } = renderHook(() => useGet(null, true));

        await act(async () => {
            result.current.signInAgain();
        });
        await act(async () => {
            result.current.signInAgain({ force: true });
        });

        expect(signinRedirect).toHaveBeenCalledTimes(2);
    });

    test('signInAgain keeps its identity when the user changes', () => {
        const { result, rerender } = renderHook(() => useGet(null, true));
        const { signInAgain } = result.current;

        signedIn({ access_token: 'another-token', expired: false });
        rerender();

        expect(result.current.signInAgain).toBe(signInAgain);
    });

    test('signInAgain does nothing, rather than failing, when sessionStorage throws', async () => {
        const getItem = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('blocked');
        });
        const { result } = renderHook(() => useGet(null, true));

        await act(async () => {
            result.current.signInAgain();
        });

        expect(signinRedirect).not.toHaveBeenCalled();
        getItem.mockRestore();
    });

    test('signInAgain with force still signs in when sessionStorage throws', async () => {
        const getItem = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('blocked');
        });
        const { result } = renderHook(() => useGet(null, true));

        await act(async () => {
            result.current.signInAgain({ force: true });
        });

        expect(signinRedirect).toHaveBeenCalledTimes(1);
        getItem.mockRestore();
    });

    test('tokenRejected goes back to false when the next send starts', async () => {
        fetch.mockReturnValueOnce(respond(401, undefined, bearerChallenge));
        let answerSecond;
        fetch.mockReturnValueOnce(new Promise(resolve => (answerSecond = resolve)));
        const { result } = renderHook(() => useGet(null, true));
        await act(async () => {
            await result.current.send('/things/1');
        });

        act(() => {
            result.current.send('/things/1');
        });

        expect(result.current.tokenRejected).toBe(false);
        await act(async () => {
            answerSecond(await respond(200, { id: 1 }));
        });
    });

    test('usePut reports a rejected token as tokenRejected', async () => {
        fetch.mockReturnValueOnce(respond(401, undefined, bearerChallenge));
        const { result } = renderHook(() => usePut(null, true));

        await act(async () => {
            await result.current.send('/things/1', { name: 'x' });
        });

        expect(result.current.tokenRejected).toBe(true);
    });

    test('usePost reports a rejected token as tokenRejected', async () => {
        fetch.mockReturnValueOnce(respond(401, undefined, bearerChallenge));
        const { result } = renderHook(() => usePost(null, true));

        await act(async () => {
            await result.current.send('/things', { name: 'x' });
        });

        expect(result.current.tokenRejected).toBe(true);
    });

    test('usePost clearPostResult clears tokenRejected and apiMessage too', async () => {
        fetch.mockReturnValueOnce(respond(401, 'Not allowed', bearerChallenge));
        const { result } = renderHook(() => usePost(null, true));
        await act(async () => {
            await result.current.send('/things', { name: 'x' });
        });

        act(() => result.current.clearPostResult());

        expect(result.current.tokenRejected).toBe(false);
        expect(result.current.apiMessage).toBeNull();
    });

    test('a 401 with no body and no bearer challenge (a refused permission) is not tokenRejected', async () => {
        fetch.mockReturnValueOnce(respond(401));
        const { result } = renderHook(() => useGet(null, true));

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things/1');
        });

        expect(outcome.tokenRejected).toBe(false);
    });

    test('a 401 with a message is shown and is not tokenRejected', async () => {
        fetch.mockReturnValueOnce(respond(401, 'Could not identify the logged in employee'));
        const { result } = renderHook(() => useGet(null, true));

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things/1');
        });

        expect(outcome.apiMessage).toBe('Could not identify the logged in employee');
        expect(outcome.tokenRejected).toBe(false);
    });

    test('clearData empties it and drops an answer still on its way', async () => {
        let answer;
        fetch.mockReturnValueOnce(new Promise(resolve => (answer = resolve)));
        const { result } = renderHook(() => useGet(null, true));

        let pending;
        act(() => {
            pending = result.current.send('/things/1');
        });
        act(() => result.current.clearData());
        await act(async () => {
            answer(await respond(200, { id: 1 }));
        });

        expect((await pending).superseded).toBe(true);
        expect(result.current.result).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    test('send keeps its identity when the token is renewed', () => {
        const { result, rerender } = renderHook(() => useGet(null, true));
        const { send } = result.current;

        signedIn({ access_token: 'renewed', expired: false });
        rerender();

        expect(result.current.send).toBe(send);
    });

    test('a renewed token is used by the next request', async () => {
        const { result, rerender } = renderHook(() => useGet(null, true));
        signedIn({ access_token: 'renewed', expired: false });
        rerender();

        await act(async () => {
            await result.current.send('/things/1');
        });

        await waitFor(() =>
            expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer renewed')
        );
    });

    test('a child that sends as soon as there is a token sends it', () => {
        function Child({ send, hasToken }) {
            useEffect(() => {
                if (hasToken) {
                    send('/things/1');
                }
            }, [hasToken, send]);
            return null;
        }
        function Page() {
            const { send, hasToken } = useGet(null, true);
            return <Child send={send} hasToken={hasToken} />;
        }
        global.fetch = jest.fn(() => new Promise(() => {}));
        useAuth.mockReturnValue({ user: null, signinRedirect });
        const { rerender } = render(<Page />);

        useAuth.mockReturnValue({
            user: { access_token: 'a-token', expired: false },
            signinRedirect
        });
        rerender(<Page />);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer a-token');
    });
});
