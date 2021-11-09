import React from 'react';
import ErrorCard from '../ErrorCard';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<ErrorCard />', () => {
    let wrapper;
    let props;
  
    beforeEach(() => {
        render(<ErrorCard errorMessage={'there is an error'} />);
    });

    // it('should render error icon', () => {
    //     expect(getIcon()).toHaveLength(1);
    // });

    it('should render error message', () => {
        expect(screen.getByText('there is an error'));
    });
});
