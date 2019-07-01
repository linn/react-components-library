const getUsername = state => {
    const { oidc } = state;
    return oidc.user ? oidc.user.profile.preferred_username : null;
};

export default getUsername;
