import React, { useEffect } from 'react';
import { act, render, renderHook, waitFor } from '@testing-library/react';
import { useAuth } from 'react-oidc-context';
import useSignedInGet from '../useSignedInGet.js';
import useSignedInPut from '../useSignedInPut.js';
import useSignedInPost from '../useSignedInPost.js';

jest.mock('react-oidc-context', () => ({ useAuth: jest.fn() }));

const signinRedirect = jest.fn();
const signedIn = (user = { access_token: 'a-token', expired: false }) =>
    useAuth.mockReturnValue({ user, signinRedirect });

const respond = (status, body, headers = {}) =>
    Promise.resolve({
        ok: status >= 200 && status < 300,
        status,
        headers: new Headers(headers),
        text: () => Promise.resolve(body === undefined ? '' : JSON.stringify(body))
    });

// What Linn.Common.Authentication.Host's UseBearerTokenAuthentication answers a token it rejects
const bearerChallenge = { 'WWW-Authenticate': 'Bearer error="invalid_token"' };

beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    signedIn();
    global.fetch = jest.fn(() => respond(200, { id: 1 }));
});

describe('useSignedInRequest', () => {
    test("sends the signed-in user's token", async () => {
        const { result } = renderHook(() => useSignedInGet());

        await act(async () => {
            await result.current.send('/things/1');
        });

        expect(fetch).toHaveBeenCalledWith('/things/1', {
            method: 'GET',
            headers: { accept: 'application/json', Authorization: 'Bearer a-token' },
            body: undefined
        });
    });

    test('gives the parsed result of a successful answer', async () => {
        const { result } = renderHook(() => useSignedInGet());

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things/1');
        });

        expect(outcome).toEqual({
            ok: true,
            status: 200,
            result: { id: 1 },
            errorMessage: null,
            superseded: false
        });
    });

    test('keeps the result of a successful answer as state', async () => {
        const { result } = renderHook(() => useSignedInGet());

        await act(async () => {
            await result.current.send('/things/1');
        });

        expect(result.current.result).toEqual({ id: 1 });
        expect(result.current.isLoading).toBe(false);
    });

    test('sends a body as JSON', async () => {
        const { result } = renderHook(() => useSignedInPut());

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

        const { result } = renderHook(() => useSignedInGet());

        expect(result.current.hasToken).toBe(false);
    });

    test('has no token while the stored one has expired', () => {
        useAuth.mockReturnValue({
            user: { access_token: 'old', expired: true },
            signinRedirect
        });

        const { result } = renderHook(() => useSignedInGet());

        expect(result.current.hasToken).toBe(false);
    });

    test('has a token once the user has one that has not expired', () => {
        useAuth.mockReturnValue({
            user: { access_token: 'a-token', expired: false },
            signinRedirect
        });

        const { result } = renderHook(() => useSignedInGet());

        expect(result.current.hasToken).toBe(true);
    });

    test("gives a 4xx's message when its body is a JSON string", async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({
                ok: false,
                status: 400,
                text: () => Promise.resolve('"Quantity must be a number"')
            })
        );
        const { result } = renderHook(() => useSignedInPost());

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things', {});
        });

        expect(outcome).toMatchObject({
            ok: false,
            status: 400,
            errorMessage: 'Quantity must be a number'
        });
    });

    test("doesn't give a 5xx's body, even when it's a JSON string", async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({
                ok: false,
                status: 500,
                text: () => Promise.resolve('"at Linn.Something.Save()"')
            })
        );
        const { result } = renderHook(() => useSignedInPost());

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things', {});
        });

        expect(outcome).toMatchObject({ ok: false, status: 500, errorMessage: null });
    });

    test("doesn't give a 4xx's body when it isn't a JSON string", async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({
                ok: false,
                status: 400,
                text: () => Promise.resolve('<html><body>Bad Request</body></html>')
            })
        );
        const { result } = renderHook(() => useSignedInPost());

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things', {});
        });

        expect(outcome).toMatchObject({ ok: false, status: 400, errorMessage: null });
    });

    test('a network failure is a failure, not an exception', async () => {
        fetch.mockReturnValueOnce(Promise.reject(new TypeError('Failed to fetch')));
        const { result } = renderHook(() => useSignedInGet());

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things/1');
        });

        expect(outcome).toMatchObject({ ok: false, status: null, errorMessage: null });
        expect(result.current.isLoading).toBe(false);
    });

    test('an answer overtaken by a newer request is marked superseded and not kept', async () => {
        let answerFirst;
        fetch
            .mockReturnValueOnce(new Promise(resolve => (answerFirst = resolve)))
            .mockReturnValueOnce(respond(200, { id: 2 }));
        const { result } = renderHook(() => useSignedInGet());

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

    test('a rejected token (the bearer challenge) signs in again', async () => {
        fetch.mockReturnValueOnce(respond(401, undefined, bearerChallenge));
        const { result } = renderHook(() => useSignedInGet());

        await act(async () => {
            await result.current.send('/things/1');
        });

        expect(signinRedirect).toHaveBeenCalledTimes(1);
    });

    test('signing in again remembers the page to come back to', async () => {
        fetch.mockReturnValueOnce(respond(401, undefined, bearerChallenge));
        const { result } = renderHook(() => useSignedInGet());

        await act(async () => {
            await result.current.send('/things/1');
        });

        expect(sessionStorage.getItem('auth:redirect')).toBe(window.location.pathname);
    });

    test('a second rejected token within a minute does not sign in again', async () => {
        fetch
            .mockReturnValueOnce(respond(401, undefined, bearerChallenge))
            .mockReturnValueOnce(respond(401, undefined, bearerChallenge));
        const { result } = renderHook(() => useSignedInGet());

        await act(async () => {
            await result.current.send('/things/1');
        });
        await act(async () => {
            await result.current.send('/things/1');
        });

        expect(signinRedirect).toHaveBeenCalledTimes(1);
    });

    test('a 401 with no body and no bearer challenge (a refused permission) does not sign in again', async () => {
        fetch.mockReturnValueOnce(respond(401));
        const { result } = renderHook(() => useSignedInGet());

        await act(async () => {
            await result.current.send('/things/1');
        });

        expect(signinRedirect).not.toHaveBeenCalled();
    });

    test('a 401 with a message is shown and does not sign in again', async () => {
        fetch.mockReturnValueOnce(respond(401, 'Could not identify the logged in employee'));
        const { result } = renderHook(() => useSignedInGet());

        let outcome;
        await act(async () => {
            outcome = await result.current.send('/things/1');
        });

        expect(outcome.errorMessage).toBe('Could not identify the logged in employee');
        expect(signinRedirect).not.toHaveBeenCalled();
    });

    test('clearData empties it and drops an answer still on its way', async () => {
        let answer;
        fetch.mockReturnValueOnce(new Promise(resolve => (answer = resolve)));
        const { result } = renderHook(() => useSignedInGet());

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
        const { result, rerender } = renderHook(() => useSignedInGet());
        const { send } = result.current;

        signedIn({ access_token: 'renewed', expired: false });
        rerender();

        expect(result.current.send).toBe(send);
    });

    test('a renewed token is used by the next request', async () => {
        const { result, rerender } = renderHook(() => useSignedInGet());
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
            const { send, hasToken } = useSignedInGet();
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
