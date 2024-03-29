import React from 'react';
import { screen } from '@testing-library/react';
import Title from '../Title';
import render from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<Title />', () => {
    beforeEach(() => {
        render(<Title text="Title Text" />);
    });

    it('should render title', () => {
        expect(screen.getByText('Title Text')).toBeInTheDocument();
    });
});
