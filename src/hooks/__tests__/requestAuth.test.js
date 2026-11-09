import React, { useEffect } from 'react';
import { act, render, renderHook, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from 'react-oidc-context';
import { RequestAuthProvider } from '../requestAuth.js';
import useSignedInGet from '../useSignedInGet.js';
import useGet from '../useGet.js';
import useInitialise from '../useInitialise.js';
import usePut from '../usePut.js';
import usePost from '../usePost.js';
import useDelete from '../useDelete.js';

// An app that signs in some other way than react-oidc-context's AuthProvider (redux-oidc, say) gives
// the request hooks its user through a RequestAuthProvider. These tests have no AuthProvider;
// react-oidc-context's useAuth is mocked only to check it isn't called.
jest.mock('react-oidc-context', () => ({ useAuth: jest.fn() }));
jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn() }));

const signIn = jest.fn();

// A page that loads /things/1 as soon as there's a token, and shows what it got.
function Page() {
    const { send, hasToken, result } = useSignedInGet();
    useEffect(() => {
        if (hasToken) {
            send('/things/1');
        }
    }, [hasToken, send]);
    return (
        <>
            <p>{hasToken ? 'has a token' : 'no token yet'}</p>
            <p>{result ? `thing ${result.id}` : 'nothing loaded'}</p>
            <button type="button" onClick={() => send('/things/2')}>
                Load thing 2
            </button>
        </>
    );
}

// The app's sign-in, holding the user the way redux-oidc's store does, with a button standing in
// for the store being given a renewed user.
function App({ firstUser }) {
    const [user, setUser] = React.useState(firstUser);
    return (
        <RequestAuthProvider user={user} signIn={signIn}>
            <button
                type="button"
                onClick={() => setUser({ access_token: 'a-renewed-token', expired: false })}
            >
                Renew the token
            </button>
            <Page />
        </RequestAuthProvider>
    );
}

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

const authorizationOfRequest = index => fetch.mock.calls[index][1].headers.Authorization;

// renderHook inside a RequestAuthProvider giving this user
const withUser = user =>
    function Wrapper({ children }) {
        return (
            <RequestAuthProvider user={user} signIn={signIn}>
                {children}
            </RequestAuthProvider>
        );
    };

beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    global.fetch = jest.fn(url => respond(200, { id: Number(url.split('/').pop()) }));
});

describe('useSignedInRequest given the user by a RequestAuthProvider', () => {
    test("sends the provider's user's token", async () => {
        render(<App firstUser={{ access_token: 'a-token', expired: false }} />);

        expect(await screen.findByText('thing 1')).toBeInTheDocument();
        expect(authorizationOfRequest(0)).toBe('Bearer a-token');
    });

    test('waits while the provider has no user', () => {
        render(<App firstUser={null} />);

        expect(screen.getByText('no token yet')).toBeInTheDocument();
        expect(fetch).not.toHaveBeenCalled();
    });

    test("waits while the provider's user's token has expired", () => {
        render(<App firstUser={{ access_token: 'an-old-token', expired: true }} />);

        expect(screen.getByText('no token yet')).toBeInTheDocument();
        expect(fetch).not.toHaveBeenCalled();
    });

    test('loads once the provider is given a user with a token', async () => {
        render(<App firstUser={{ access_token: 'an-old-token', expired: true }} />);

        fireEvent.click(screen.getByRole('button', { name: 'Renew the token' }));

        expect(await screen.findByText('thing 1')).toBeInTheDocument();
        expect(authorizationOfRequest(0)).toBe('Bearer a-renewed-token');
    });

    test('a token renewed by the provider is used by the next request', async () => {
        render(<App firstUser={{ access_token: 'a-token', expired: false }} />);
        await screen.findByText('thing 1');

        fireEvent.click(screen.getByRole('button', { name: 'Renew the token' }));
        fireEvent.click(screen.getByRole('button', { name: 'Load thing 2' }));

        expect(await screen.findByText('thing 2')).toBeInTheDocument();
        expect(authorizationOfRequest(1)).toBe('Bearer a-renewed-token');
    });

    test('a token renewed by the provider does not load the page again', async () => {
        render(<App firstUser={{ access_token: 'a-token', expired: false }} />);
        await screen.findByText('thing 1');

        fireEvent.click(screen.getByRole('button', { name: 'Renew the token' }));
        await act(() => new Promise(resolve => setTimeout(resolve, 50)));

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("a rejected token (the bearer challenge) calls the provider's signIn", async () => {
        fetch.mockReturnValueOnce(respond(401, undefined, bearerChallenge));

        render(<App firstUser={{ access_token: 'a-token', expired: false }} />);

        await waitFor(() => expect(signIn).toHaveBeenCalledTimes(1));
    });

    test('a 401 with no bearer challenge (a refused permission) does not call signIn', async () => {
        fetch.mockReturnValueOnce(respond(401));

        render(<App firstUser={{ access_token: 'a-token', expired: false }} />);

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        await act(() => new Promise(resolve => setTimeout(resolve, 50)));
        expect(signIn).not.toHaveBeenCalled();
    });

    test("does not use react-oidc-context's useAuth", async () => {
        render(<App firstUser={{ access_token: 'a-token', expired: false }} />);

        await screen.findByText('thing 1');
        expect(useAuth).not.toHaveBeenCalled();
    });
});

describe('useSignedInRequest with no RequestAuthProvider', () => {
    test("uses react-oidc-context's signed-in user", async () => {
        useAuth.mockReturnValue({
            user: { access_token: 'an-oidc-context-token', expired: false },
            signinRedirect: jest.fn()
        });

        render(<Page />);

        expect(await screen.findByText('thing 1')).toBeInTheDocument();
        expect(authorizationOfRequest(0)).toBe('Bearer an-oidc-context-token');
    });

    test("a rejected token (the bearer challenge) calls react-oidc-context's signinRedirect", async () => {
        const signinRedirect = jest.fn();
        useAuth.mockReturnValue({
            user: { access_token: 'an-oidc-context-token', expired: false },
            signinRedirect
        });
        fetch.mockReturnValueOnce(respond(401, undefined, bearerChallenge));

        render(<Page />);

        await waitFor(() => expect(signinRedirect).toHaveBeenCalledTimes(1));
    });

    test('signing in again remembers the page to come back to, where the callback looks for it', async () => {
        useAuth.mockReturnValue({
            user: { access_token: 'an-oidc-context-token', expired: false },
            signinRedirect: jest.fn()
        });
        fetch.mockReturnValueOnce(respond(401, undefined, bearerChallenge));

        render(<Page />);

        await waitFor(() =>
            expect(sessionStorage.getItem('auth:redirect')).toBe(window.location.pathname)
        );
    });

    test('signing in again comes back with the query string too', async () => {
        useAuth.mockReturnValue({
            user: { access_token: 'an-oidc-context-token', expired: false },
            signinRedirect: jest.fn()
        });
        fetch.mockReturnValueOnce(
            respond(401, undefined, { 'WWW-Authenticate': 'Bearer error="invalid_token"' })
        );
        window.history.pushState({}, '', '/a-report?part=ABC');

        render(<Page />);

        await waitFor(() =>
            expect(sessionStorage.getItem('auth:redirect')).toBe('/a-report?part=ABC')
        );
        window.history.pushState({}, '', '/');
    });

    test('with no AuthProvider either, waits rather than failing', () => {
        useAuth.mockReturnValue(undefined);

        render(<Page />);

        expect(screen.getByText('no token yet')).toBeInTheDocument();
        expect(fetch).not.toHaveBeenCalled();
    });
});

describe('useGet given the user by a RequestAuthProvider', () => {
    test("with requiresAuth, sends the provider's user's token", async () => {
        const { result } = renderHook(() => useGet('/things', true), {
            wrapper: withUser({ access_token: 'a-provider-token', expired: false })
        });

        await act(async () => {
            await result.current.send(1);
        });

        expect(authorizationOfRequest(0)).toBe('Bearer a-provider-token');
    });

    test('does not use react-oidc-context', async () => {
        const { result } = renderHook(() => useGet('/things', true), {
            wrapper: withUser({ access_token: 'a-provider-token', expired: false })
        });

        await act(async () => {
            await result.current.send(1);
        });

        expect(useAuth).not.toHaveBeenCalled();
    });
});

describe('useGet with neither a RequestAuthProvider nor an AuthProvider', () => {
    test('sends without a token rather than failing', async () => {
        useAuth.mockReturnValue(undefined);
        const { result } = renderHook(() => useGet('/things'));

        await act(async () => {
            await result.current.send(1);
        });

        expect(result.current.result).toEqual({ id: 1 });
        expect(authorizationOfRequest(0)).toBeUndefined();
    });
});

describe('useInitialise given the user by a RequestAuthProvider', () => {
    test("with requiresAuth, sends the provider's user's token", () => {
        renderHook(() => useInitialise('/things', 1, null, true), {
            wrapper: withUser({ access_token: 'a-provider-token', expired: false })
        });

        expect(authorizationOfRequest(0)).toBe('Bearer a-provider-token');
    });

    test("with requiresAuth, waits while the provider's user's token has expired", () => {
        renderHook(() => useInitialise('/things', 1, null, true), {
            wrapper: withUser({ access_token: 'an-old-token', expired: true })
        });

        expect(fetch).not.toHaveBeenCalled();
    });
});

describe('usePut given the user by a RequestAuthProvider', () => {
    test("with requiresAuth, sends the provider's user's token", async () => {
        const { result } = renderHook(() => usePut('/things', true), {
            wrapper: withUser({ access_token: 'a-provider-token', expired: false })
        });

        await act(async () => {
            await result.current.send(1, { name: 'x' });
        });

        expect(authorizationOfRequest(0)).toBe('Bearer a-provider-token');
    });
});

describe('usePost given the user by a RequestAuthProvider', () => {
    test("with requiresAuth, sends the provider's user's token", async () => {
        const { result } = renderHook(() => usePost('/things', true), {
            wrapper: withUser({ access_token: 'a-provider-token', expired: false })
        });

        await act(async () => {
            await result.current.send(null, { name: 'x' });
        });

        expect(authorizationOfRequest(0)).toBe('Bearer a-provider-token');
    });
});

describe('useDelete given the user by a RequestAuthProvider', () => {
    test("with requiresAuth, sends the provider's user's token", async () => {
        const { result } = renderHook(() => useDelete('/things', true), {
            wrapper: withUser({ access_token: 'a-provider-token', expired: false })
        });

        await act(async () => {
            await result.current.send(1);
        });

        expect(authorizationOfRequest(0)).toBe('Bearer a-provider-token');
    });
});
