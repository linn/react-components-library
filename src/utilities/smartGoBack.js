const smartgoBack = (previousPaths, applicationBackOperation) => {
    // if the last component rendered by the router was the oidc callback
    if (previousPaths?.[previousPaths.length - 1]?.includes('signin-oidc')) {
        global.window.history.go(-3); // go back to the page before the oidc page
    } else if (previousPaths?.length) {
        // if there is somewhere to go back to inside this application
        applicationBackOperation(); // use the applications back operation
    } else {
        global.window.history.back(); // else use the browsers back operation
    }
};

export default smartgoBack;
