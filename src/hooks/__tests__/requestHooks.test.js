import { act, renderHook } from '@testing-library/react';
import { useAuth } from 'react-oidc-context';
import useGet from '../useGet.js';
import useInitialise from '../useInitialise.js';
import usePut from '../usePut.js';
import usePost from '../usePost.js';

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
