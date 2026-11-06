import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom';

import Breadcrumbs from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
    const mockPush = jest.fn();

    describe('when path does not end in report', () => {
        beforeEach(() => {
            render(<Breadcrumbs location={{ pathname: '/a/test/path' }} navigate={mockPush} />);
        });

        it('should render the correct number of breadcrumbs with correct text', () => {
            expect(screen.getByText('HOME')).toBeInTheDocument();
            expect(screen.getByText('a')).toBeInTheDocument();
            expect(screen.getByText('test')).toBeInTheDocument();
            expect(screen.getByText('path')).toBeInTheDocument();
        });

        it('renders link to correct url', () => {
            expect(screen.getByText('test')).toHaveAttribute('href', '/a/test');
        });
    });

    describe('when a path segment is URL-encoded', () => {
        beforeEach(() => {
            render(
                <Breadcrumbs
                    location={{ pathname: '/a/MADE%20CABLE/MAJIK%20CD' }}
                    navigate={mockPush}
                />
            );
        });

        it('shows it decoded, with the link still encoded', () => {
            expect(screen.getByText('MAJIK CD')).toBeInTheDocument();
            expect(screen.getByText('MADE CABLE')).toHaveAttribute('href', '/a/MADE%20CABLE');
        });
    });

    describe('when a path segment is not valid encoding', () => {
        it('shows it as it is', () => {
            render(<Breadcrumbs location={{ pathname: '/a/100%' }} navigate={mockPush} />);
            expect(screen.getByText('100%')).toBeInTheDocument();
        });
    });
});
