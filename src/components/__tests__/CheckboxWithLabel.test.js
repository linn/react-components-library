import React from 'react';
import CheckboxWithLabel from '../CheckboxWithLabel';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<CheckboxWithLabel />', () => {
    beforeEach(() => {
        render(<CheckboxWithLabel label={'checkbox label'}    onChange={() => {}} />);
    });

    it('should render label', () => {
        expect(screen.getByLabelText('checkbox label')).toBeInTheDocument();
    });
});
