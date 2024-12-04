import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import render from '../../test-utils';
import ErrorCard from '../ErrorCard';

describe('<ErrorCard />', () => {
    beforeEach(() => {
        render(
            <ErrorCard
                errorMessage="there is an error"
                detailLines={[
                    { descriptor: 'Detail 1', message: 'Message 1' },
                    { descriptor: 'Detail 2', message: 'Message 2' }
                ]}
            />
        );
    });

    it('should render error message and details', () => {
        expect(screen.getByText('there is an error')).toBeInTheDocument();
        expect(screen.getByText('Detail 1 - Message 1')).toBeInTheDocument();
        expect(screen.getByText('Detail 2 - Message 2')).toBeInTheDocument();
    });
});
