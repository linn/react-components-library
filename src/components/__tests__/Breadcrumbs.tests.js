import React, { Component } from 'react';
import Breadcrumbs from '../Breadcrumbs'
import { createShallow } from '@material-ui/core/test-utils';

describe('<Breadcrumbs />', () => {

    let props;
    let mountedBreadcrumbs;
    const mockHistory = { push: jest.fn() };
    const mockedEvent = { target: {}, preventDefault: jest.fn() }
    const shallow = createShallow({ dive: false });

    const breadcrumbs = () => {
        if (!mountedBreadcrumbs) {
            mountedBreadcrumbs = shallow(
                <Breadcrumbs {...props} />
            );
        }
        return mountedBreadcrumbs;
    }

    describe('when path does not end in report', () => {
        beforeEach(() => {
            props = {
                location: { pathname: "/a/test/path" },
                history: mockHistory
            };
            mountedBreadcrumbs = undefined;
        });

        it('renders correct number of breadcrumbs', () => {
            expect(breadcrumbs().children().length).toBe(4); // home/a/test/path
        });

        it('renders link to correct url', () => {
            expect(breadcrumbs().find('Link').at(3).props().to).toEqual('/a/test/path');

            // the browser should handle clicks on the first breadcrumb, i.e. the home path
            // i.e. there should not be a call to history.push if the 0th node is clicked
            breadcrumbs().childAt(0).simulate('click', mockedEvent);
            expect(mockHistory.push.mock.calls.length).toBe(0);
        });
    });

    describe('When path ends in /report', () => {
        beforeEach(() => {
            props = {
                location: { pathname: "/a/test/report" }
            }
            mountedBreadcrumbs = undefined;
        });

        it('removes report from path before rendering breadcrumbs', () => {
            expect(breadcrumbs().children().length).toBe(3); // should remove report from path: home/a/test/path
        });
    });
});