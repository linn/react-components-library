import React, { createContext, useContext } from 'react';
import { useAuth } from 'react-oidc-context';

// What the request hooks (useGet, useInitialise, usePut, usePost, useDelete and useSignedInRequest)
// need from whatever does the app's sign-in: the signed-in user and a way to sign in again. So they
// work in apps that sign in with react-oidc-context and in those that still use redux-oidc.
const RequestAuthContext = createContext(null);

// For an app that doesn't sign in with react-oidc-context's AuthProvider (redux-oidc, say): wrap the
// app once, inside its sign-in, and the request hooks use what it gives. An app with
// react-oidc-context's AuthProvider needs nothing.
//   user:   the signed-in user, { access_token, expired }, or null while there isn't one
//   signIn: starts a sign-in that comes back to the page the user is on, the app's own way
// For example, with redux-oidc:
//   const user = useSelector(state => state.oidc.user);
//   const signIn = () =>
//       userManager.signinRedirect({
//           data: { redirect: window.location.pathname + window.location.search }
//       });
//   <RequestAuthProvider user={user} signIn={signIn}>
export function RequestAuthProvider({ user, signIn, children }) {
    return (
        <RequestAuthContext.Provider value={{ user, signIn }}>
            {children}
        </RequestAuthContext.Provider>
    );
}

// The signed-in user and signIn, from a RequestAuthProvider if the app has one, otherwise
// from react-oidc-context's AuthProvider.
export function useRequestAuth() {
    const given = useContext(RequestAuthContext);
    if (given) {
        return given;
    }
    // Only without a provider, so an app that has one but no AuthProvider (finance) doesn't get
    // useAuth's "AuthProvider context is undefined" warning on every render. Whether there's a
    // provider never changes while the app runs, so the hooks are called in the same order on
    // every render, as React needs. useAuth (not useContext(AuthContext)) so that a test's mock of
    // react-oidc-context's useAuth still reaches it.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const auth = useAuth();
    const signIn = () => {
        // the page to come back to, where the apps' callbacks look for it (with its query string,
        // so a report comes back with its options)
        sessionStorage.setItem('auth:redirect', window.location.pathname + window.location.search);
        return auth?.signinRedirect?.();
    };
    return { user: auth?.user ?? null, signIn };
}
