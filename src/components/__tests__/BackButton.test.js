import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent } from '@testing-library/react';
import render from '../../test-utils';
import BackButton from '../BackButton';

afterEach(() => cleanup());

let props;
const handler = jest.fn();

describe('BackButton', () => {
    beforeEach(() => {
        props = {
            backClick: handler
        };
    });

    test('should call handler onClick', () => {
        const { getByText } = render(<BackButton {...props} />);
        const item = getByText('Back');
        fireEvent.click(item);
        expect(handler).toHaveBeenCalled();
    });

    describe('when no alt text provided', () => {
        test('should default to Back', () => {
            const { queryByText } = render(<BackButton {...props} modal />);
            expect(queryByText('Back')).toBeInTheDocument();
        });
    });

    describe('when alt text provided', () => {
        test('should display text', () => {
            const { queryByText } = render(<BackButton {...props} text="Something" modal />);
            expect(queryByText('Something')).toBeInTheDocument();
        });
    });
});
