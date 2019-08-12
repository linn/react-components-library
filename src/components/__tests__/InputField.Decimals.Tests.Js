import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup } from '@testing-library/react';
import render from '../../test-utils';
import InputField from '../InputField';

afterEach(cleanup);

const changeMock = jest.fn();

const defaultProps = {
    label: 'Cost',
    type: 'number',
    maxLength: 14,
    propertyName: 'cost',
    editStatus: 'edit',
    value: 0
};
describe('When Editing', () => {
    test('should change input to 5 decimal places from 6', () => {
        const { getByDisplayValue } = render(
            <InputField {...defaultProps} decimalPlaces={5} onChange={changeMock} />
        );

        const input = getByDisplayValue('0');

        fireEvent.change(input, {
            target: { value: '1234.123451' }
        });

        expect(changeMock).toHaveBeenCalledWith('cost', 1234.12345);
    });

    test('should change input to 2 decimal places from 3', () => {
        const { getByDisplayValue } = render(
            <InputField {...defaultProps} decimalPlaces={2} onChange={changeMock} />
        );

        const input = getByDisplayValue('0');

        fireEvent.change(input, {
            target: { value: '1234.123' }
        });

        expect(changeMock).toHaveBeenCalledWith('cost', 1234.12);
    });

    test('should change input to 2 decimal places from 6', () => {
        const { getByDisplayValue } = render(
            <InputField {...defaultProps} decimalPlaces={2} onChange={changeMock} />
        );

        const input = getByDisplayValue('0');

        fireEvent.change(input, {
            target: { value: '1234567.123446' }
        });

        expect(changeMock).toHaveBeenCalledWith('cost', 1234567.12);
    });
    test('should remain the same with no decimal places specified', () => {
        const { getByDisplayValue } = render(
            <InputField {...defaultProps} onChange={changeMock} />
        );

        const input = getByDisplayValue('0');

        fireEvent.change(input, {
            target: { value: '1234567.123446' }
        });

        expect(changeMock).toHaveBeenCalledWith('cost', 1234567.123446);
    });

    test('should should do nothing when number with no decimals entered', () => {
        const { getByDisplayValue } = render(
            <InputField {...defaultProps} decimalPlaces={2} onChange={changeMock} />
        );

        const input = getByDisplayValue('0');

        fireEvent.change(input, {
            target: { value: '1234567' }
        });

        expect(changeMock).toHaveBeenCalledWith('cost', 1234567);
    });
});
