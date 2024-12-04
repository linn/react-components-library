import React from 'react';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom';

import Breadcrumbs from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
    const mockPush = jest.fn();

    describe('when path does not end in report', () => {
        beforeEach(() => {
            const history = {
                location: { pathname: '/a/test/path' },
                push: mockPush
            };

            render(<Breadcrumbs history={history} />);
        });

        it('should render the correct number of breadcrumbs with correct text', () => {
            expect(screen.getByText('HOME')).toBeInTheDocument();
            expect(screen.getByText('a')).toBeInTheDocument();
            expect(screen.getByText('test')).toBeInTheDocument();
            expect(screen.getByText('path')).toBeInTheDocument();
        });

        it('renders link to correct url', () => {
            expect(screen.getByText('test')).toHaveAttribute('to', '/a/test');
        });
    });
});
