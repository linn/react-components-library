export default {
    getName: state => state.oidc?.user?.profile?.name,
    getUserNumber: state => state.oidc?.user?.profile?.employee?.split('/employees/')?.[1]
};
