import { useAuth } from 'react-oidc-context';

function useUserProfile() {
    const auth = useAuth();
    return {
        userNumber: auth?.user?.profile?.employee?.split('/')?.[2],
        userName: auth?.user?.profile?.preferred_username,
        name: auth?.user?.profile?.name
    };
}

export default useUserProfile;
