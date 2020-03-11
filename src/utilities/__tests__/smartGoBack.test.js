import smartGoBack from '../smartGoBack';

const browsersGo = jest.fn();
const browserBack = jest.fn();
const applicationBack = jest.fn();
global.window.history.go = browsersGo;
global.window.history.back = browserBack;

describe('when previous path was oidc callback', () => {
    const previousPaths = ['.../signin-oidc/...'];
    test('should go back three places in browser history', () => {
        smartGoBack(previousPaths, applicationBack);
        expect(browsersGo).toHaveBeenLastCalledWith(-3);
    });
});

describe('when previous path was not oidc callback and was inside this app', () => {
    const previousPaths = ['/something'];
    test('should call applications back method', () => {
        smartGoBack(previousPaths, applicationBack);
        expect(applicationBack).toHaveBeenCalledTimes(1);
    });
});

describe('when previous path was not oidc callback and was otuside this app', () => {
    const previousPaths = null;
    test('should call browsers back method', () => {
        smartGoBack(previousPaths, applicationBack);
        expect(browserBack).toHaveBeenCalledTimes(1);
    });
});
