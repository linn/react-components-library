import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import SmartLink from '../SmartLink';

describe('<SmartLink />', () => {
    let wrapper;
    let props;
    const getLink = () => wrapper.find('Link');
    const getAnchor = () => wrapper.find('a');
    const shallow = createShallow({ dive: false });
    const Component = () => <span> link </span>;
    const LinkedComponent = SmartLink(Component);

    const appRoutes = ['/products/maint'];

    describe('when href starts with app route', () => {
        beforeEach(() => {
            props = {
                appRoutes,
                to: '/products/maint/sa-core-types'
            };
            wrapper = shallow(<LinkedComponent {...props} />);
        });

        it('should render React Router Link, not html anchor', () => {
            expect(getLink().length).toEqual(1);
            expect(getAnchor().length).toEqual(0);
        });
    });

    describe('when href does not start with app route', () => {
        beforeEach(() => {
            props = {
                appRoutes,
                to: '/products/243'
            };
            wrapper = shallow(<LinkedComponent {...props} />);
        });

        it('should render html anchor, not React Router Link', () => {
            expect(getAnchor().length).toEqual(1);
            expect(getLink().length).toEqual(0);
        });
    });
});
