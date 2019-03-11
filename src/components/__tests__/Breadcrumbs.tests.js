import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Breadcrumbs from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
    let props;
    const mockPush = jest.fn();
    let mountedBreadcrumbs;
    const mockedEvent = { target: {}, preventDefault: jest.fn() };
    const shallow = createShallow({ dive: true });

    const breadcrumbs = () => {
        if (!mountedBreadcrumbs) {
            mountedBreadcrumbs = shallow(<Breadcrumbs {...props} />);
        }
        return mountedBreadcrumbs;
    };

    describe('when path does not end in report', () => {
        beforeEach(() => {
            props = {
                history: {
                    location: { pathname: '/a/test/path' },
                    push: mockPush
                }
            };
            mountedBreadcrumbs = undefined;
        });

        it('renders correct number of Breadcrumbs', () => {
            expect(breadcrumbs().find('span').length).toBe(4); // home/a/test/path, but path isn't a link it's the current page
        });

        it('renders correct number of Links', () => {
            expect(breadcrumbs().find('NavLink').length).toBe(3); // last breadcrumb isn't a link
        });

        it('renders correct number of Slashes', () => {
            expect(breadcrumbs().find('Slash').length).toBe(3); // last breadcrumb doesn't have a trailing slash
        });

        it('renders link to correct url', () => {
            expect(
                breadcrumbs()
                    .find('NavLink')
                    .at(2)
                    .props().to
            ).toEqual('/a/test');

            // the browser should handle clicks on the first breadcrumb, i.e. the home path
            // i.e. there should not be a call to history.push if the 0th node is clicked
            breadcrumbs()
                .childAt(0)
                .simulate('click', mockedEvent);
            expect(mockPush.mock.calls.length).toBe(0);
        });
    });

    describe('When path ends in /report', () => {
        beforeEach(() => {
            props = {
                history: {
                    location: { pathname: '/a/test/path/report' }
                }
            };
            mountedBreadcrumbs = undefined;
        });

        it('removes report from path before rendering breadcrumbs', () => {
            expect(breadcrumbs().find('span').length).toBe(4); // should remove report from path: home/a/test/path
        });
    });
});
