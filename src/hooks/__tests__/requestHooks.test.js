import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { useAuth } from 'react-oidc-context';
import useGet from '../useGet.js';
import useInitialise from '../useInitialise.js';
import usePut from '../usePut.js';
import usePost from '../usePost.js';
import useDelete from '../useDelete.js';

jest.mock('react-oidc-context', () => ({ useAuth: jest.fn() }));
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }));

const json = body => Promise.resolve({ ok: true, json: () => Promise.resolve(body) });

beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({ user: { access_token: 'a-token' } });
    global.fetch = jest.fn(() => json({ id: 1 }));
});

describe('useGet', () => {
    test('keeps the latest request’s answer when an earlier one arrives after it', async () => {
        let answerFirst;
        fetch
            .mockReturnValueOnce(new Promise(resolve => (answerFirst = resolve)))
            .mockReturnValueOnce(json({ page: 2 }));
        const { result } = renderHook(() => useGet('/things'));

        await act(async () => {
            result.current.send(null, '?page=1');
            await result.current.send(null, '?page=2');
        });
        await act(async () => {
            answerFirst(await json({ page: 1 }));
        });

        expect(result.current.result).toEqual({ page: 2 });
        expect(result.current.isLoading).toBe(false);
    });

    test('clearData drops an answer still on its way', async () => {
        let answer;
        fetch.mockReturnValueOnce(new Promise(resolve => (answer = resolve)));
        const { result } = renderHook(() => useGet('/things'));

        act(() => {
            result.current.send(9);
        });
        act(() => result.current.clearData());
        await act(async () => {
            answer(await json({ id: 9 }));
        });

        expect(result.current.result).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });
});

describe('useInitialise', () => {
    test('with requiresAuth, waits for the token before sending', () => {
        useAuth.mockReturnValue({ user: null });
        const { rerender } = renderHook(() => useInitialise('/things', 1, null, true));
        expect(fetch).not.toHaveBeenCalled();

        useAuth.mockReturnValue({ user: { access_token: 'a-token' } });
        rerender();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer a-token');
    });

    test('with requiresAuth, waits while the stored token has expired', () => {
        useAuth.mockReturnValue({ user: { access_token: 'old', expired: true } });

        renderHook(() => useInitialise('/things', 1, null, true));

        expect(fetch).not.toHaveBeenCalled();
    });

    test('with requiresAuth, is loading while it waits for the token', () => {
        useAuth.mockReturnValue({ user: null });

        const { result } = renderHook(() => useInitialise('/things', 1, null, true));

        expect(result.current.isLoading).toBe(true);
    });

    test('without requiresAuth, sends straight away', () => {
        useAuth.mockReturnValue({ user: null });
        renderHook(() => useInitialise('/things', 1));

        expect(fetch).toHaveBeenCalledTimes(1);
    });
});

describe('usePut', () => {
    test('a network failure stops loading and says an error occurred', async () => {
        fetch.mockReturnValueOnce(Promise.reject(new TypeError('Failed to fetch')));
        const { result } = renderHook(() => usePut('/things', true));

        await act(async () => {
            await result.current.send(1, { name: 'x' });
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.errorMessage).toBe('An error occurred.');
    });

    test('a 204 (no body) is a success', async () => {
        fetch.mockReturnValueOnce(Promise.resolve({ ok: true, status: 204 }));
        const { result } = renderHook(() => usePut('/things', true));

        await act(async () => {
            await result.current.send(1, { name: 'x' });
        });

        expect(result.current.errorMessage).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    test('a 200 with an empty body (Content-Length: 0) is a success', async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({
                ok: true,
                status: 200,
                headers: new Headers({ 'Content-Length': '0' }),
                json: () => Promise.reject(new SyntaxError('Unexpected end of JSON input'))
            })
        );
        const { result } = renderHook(() => usePut('/things', true));

        await act(async () => {
            await result.current.send(1, { name: 'x' });
        });

        expect(result.current.errorMessage).toBeNull();
        expect(result.current.putResult).toBeNull();
    });

    test('keeps the parsed result of a successful answer', async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ id: 1 }) })
        );
        const { result } = renderHook(() => usePut('/things', true));

        await act(async () => {
            await result.current.send(1, { name: 'x' });
        });

        expect(result.current.putResult).toEqual({ id: 1 });
    });
});

describe('usePost', () => {
    test('a 204 (no body) is a success', async () => {
        fetch.mockReturnValueOnce(Promise.resolve({ ok: true, status: 204 }));
        const { result } = renderHook(() => usePost('/things', true));

        await act(async () => {
            await result.current.send(null, { name: 'x' });
        });

        expect(result.current.errorMessage).toBeNull();
        expect(result.current.postResult).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    test('a 200 with an empty body (Content-Length: 0) is a success', async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({
                ok: true,
                status: 200,
                headers: new Headers({ 'Content-Length': '0' }),
                json: () => Promise.reject(new SyntaxError('Unexpected end of JSON input'))
            })
        );
        const { result } = renderHook(() => usePost('/things', true));

        await act(async () => {
            await result.current.send(null, { name: 'x' });
        });

        expect(result.current.errorMessage).toBeNull();
        expect(result.current.postResult).toBeNull();
    });

    test('a 204 with redirectOnSuccess stays put', async () => {
        fetch.mockReturnValueOnce(Promise.resolve({ ok: true, status: 204 }));
        const { result } = renderHook(() => usePost('/things', true, true));

        await act(async () => {
            await result.current.send(null, { name: 'x' });
        });

        expect(mockNavigate).not.toHaveBeenCalled();
        expect(result.current.errorMessage).toBeNull();
    });
});

// These hooks keep the signatures and state they've always had: what follows checks the parts
// existing pages rely on, and the additions.

describe('useGet, as it always has', () => {
    test('sends to url/id plus the query string', async () => {
        const { result } = renderHook(() => useGet('/things', true));

        await act(async () => {
            await result.current.send(7, '?full=true');
        });

        expect(fetch.mock.calls[0][0]).toBe('/things/7?full=true');
    });

    test("puts a refusal's body in errorMessage as it came", async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({ ok: false, status: 500, text: () => Promise.resolve('Oops') })
        );
        const { result } = renderHook(() => useGet('/things', true));

        await act(async () => {
            await result.current.send(1);
        });

        expect(result.current.errorMessage).toBe('Oops');
    });

    test("puts a network failure's own message in errorMessage", async () => {
        fetch.mockReturnValueOnce(Promise.reject(new TypeError('Failed to fetch')));
        const { result } = renderHook(() => useGet('/things', true));

        await act(async () => {
            await result.current.send(1);
        });

        expect(result.current.errorMessage).toBe('Failed to fetch');
    });

    test('a page that sends in an effect on send, without waiting, loads again once there is a token', () => {
        useAuth.mockReturnValue({ user: null });
        const { rerender } = renderHook(() => {
            const { send } = useGet('/things', true);
            React.useEffect(() => {
                send(1);
            }, [send]);
        });

        useAuth.mockReturnValue({ user: { access_token: 'a-token', expired: false } });
        rerender();

        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch.mock.calls[1][1].headers.Authorization).toBe('Bearer a-token');
    });

    test('a renewed token does not change send', () => {
        useAuth.mockReturnValue({ user: { access_token: 'a-token', expired: false } });
        const { result, rerender } = renderHook(() => useGet('/things', true));
        const { send } = result.current;

        useAuth.mockReturnValue({ user: { access_token: 'a-renewed-token', expired: false } });
        rerender();

        expect(result.current.send).toBe(send);
    });

    test('with requiresAuth but no token yet, sends no Authorization header rather than "Bearer undefined"', async () => {
        useAuth.mockReturnValue({ user: null });
        const { result } = renderHook(() => useGet('/things', true));

        await act(async () => {
            await result.current.send(1);
        });

        expect(fetch.mock.calls[0][1].headers.Authorization).toBeUndefined();
    });

    test('without requiresAuth, sends no Authorization header even with a token', async () => {
        const { result } = renderHook(() => useGet('/things'));

        await act(async () => {
            await result.current.send(1);
        });

        expect(fetch.mock.calls[0][1].headers.Authorization).toBeUndefined();
    });
});

describe('useGet, new', () => {
    test('reports the status of the latest answer', async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({ ok: false, status: 404, text: () => Promise.resolve('') })
        );
        const { result } = renderHook(() => useGet('/things', true));

        await act(async () => {
            await result.current.send(1);
        });

        expect(result.current.status).toBe(404);
    });

    test('with no url, send takes the whole URL', async () => {
        const { result } = renderHook(() => useGet(null, true));

        await act(async () => {
            await result.current.send('/somewhere/else?q=1');
        });

        expect(fetch.mock.calls[0][0]).toBe('/somewhere/else?q=1');
    });
});

describe('useInitialise, in StrictMode', () => {
    test('sends once, though React runs its effects twice', () => {
        renderHook(() => useInitialise('/things', 1, null, true), { wrapper: React.StrictMode });

        expect(fetch).toHaveBeenCalledTimes(1);
    });
});

describe('usePost, as it always has', () => {
    test('cancelRequest stops loading and ignores the answer', async () => {
        let answer;
        fetch.mockReturnValueOnce(new Promise(resolve => (answer = resolve)));
        const { result } = renderHook(() => usePost('/things', true));

        act(() => {
            result.current.send(null, { name: 'x' });
        });
        act(() => result.current.cancelRequest());
        await act(async () => {
            answer(await json({ id: 9 }));
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.postResult).toBeNull();
        expect(result.current.errorMessage).toBeNull();
    });

    test('with redirectOnSuccess, goes to the created thing', async () => {
        fetch.mockReturnValueOnce(json({ id: 3, links: [{ rel: 'self', href: '/things/3' }] }));
        const { result } = renderHook(() => usePost('/things', true, true));

        await act(async () => {
            await result.current.send(null, { name: 'x' });
        });

        expect(mockNavigate).toHaveBeenCalledWith('/things/3');
    });
});

describe('useDelete', () => {
    test('sends DELETE to url/id', async () => {
        const { result } = renderHook(() => useDelete('/things', true));

        await act(async () => {
            await result.current.send(4);
        });

        expect(fetch.mock.calls[0][0]).toBe('/things/4');
        expect(fetch.mock.calls[0][1].method).toBe('DELETE');
    });

    test('a network failure stops loading and says an error occurred', async () => {
        fetch.mockReturnValueOnce(Promise.reject(new TypeError('Failed to fetch')));
        const { result } = renderHook(() => useDelete('/things', true));

        await act(async () => {
            await result.current.send(4);
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.errorMessage).toBe('An error occurred.');
    });

    test('a 204 (no body) is a success', async () => {
        fetch.mockReturnValueOnce(Promise.resolve({ ok: true, status: 204 }));
        const { result } = renderHook(() => useDelete('/things', true));

        await act(async () => {
            await result.current.send(4);
        });

        expect(result.current.errorMessage).toBeNull();
        expect(result.current.deleteResult).toBeNull();
    });
});
