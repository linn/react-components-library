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

        it('renders correct number of breadcrumbs', () => {
            expect(breadcrumbs().find('NavLink').length).toBe(4); // home/a/test/path
        });

        it('renders link to correct url', () => {
            expect(
                breadcrumbs()
                    .find('NavLink')
                    .at(3)
                    .props().to
            ).toEqual('/a/test/path');

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
            expect(breadcrumbs().find('NavLink').length).toBe(4); // should remove report from path: home/a/test/path
        });
    });
});
