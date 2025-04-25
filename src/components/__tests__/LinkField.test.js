import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import LinkField from '../LinkField';

describe('When displaying link', () => {
    test('should show value', () => {
        render(
            <LinkField to="/to" value="Link Value" label="Label1" />
        );

        expect(screen.getByText('Link Value')).toBeInTheDocument();
        expect(screen.getByText('Label1')).toBeInTheDocument();
    });

    test('should link correctly', () => {
        render(
            <LinkField to="/to" value="Link Value" label="Label1" />
        );

        expect(screen.getByText('Link Value')).toHaveAttribute('href', '/to');
    });
});
