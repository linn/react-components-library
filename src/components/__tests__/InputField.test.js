import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup } from '@testing-library/react';
import render from '../../test-utils';
import InputField from '../InputField';

afterEach(cleanup);

const changeMock = jest.fn();

const onErrorStateChange = jest.fn();

const defaultProps = {
    label: 'Cost',
    type: 'number',
    maxLength: 14,
    propertyName: 'cost',
    editStatus: 'edit',
    value: 0
};

describe('When Editing', () => {
    test('should not change input if decimal places max overrun', () => {
        const { getByDisplayValue } = render(
            <InputField {...defaultProps} decimalPlaces={5} onChange={changeMock} />
        );

        const input = getByDisplayValue('0');

        fireEvent.change(input, {
            target: { value: '1234.123451' }
        });

        expect(changeMock).not.toHaveBeenCalled();
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

describe('When Max Length Exceeded', () => {
    test('should show error', () => {
        const { getByText, getByDisplayValue } = render(
            <InputField propertyName="test" maxLength={3} onChange={changeMock} value="ok" />
        );
        const input = getByDisplayValue('ok');

        fireEvent.change(input, {
            target: { value: 'not ok - longer than 3' }
        });

        expect(getByText('MAX LENGTH (3) EXCEEDED')).toBeInTheDocument();
    });
});

describe('When onErrorStateChange function supplied', () => {
    test('should call function with true param when max length exceeded', () => {
        const { getByDisplayValue } = render(
            <InputField
                propertyName="test"
                maxLength={3}
                onChange={changeMock}
                value="ok"
                onErrorStateChange={onErrorStateChange}
            />
        );
        const input = getByDisplayValue('ok');

        fireEvent.change(input, {
            target: { value: 'not ok - longer than 3' }
        });

        expect(onErrorStateChange).toHaveBeenCalledWith(true);
    });

    test('should call function with false param when max length not exceeded', () => {
        const { getByDisplayValue } = render(
            <InputField
                propertyName="test"
                maxLength={3}
                onChange={changeMock}
                value="ok"
                onErrorStateChange={onErrorStateChange}
            />
        );
        const input = getByDisplayValue('ok');

        fireEvent.change(input, {
            target: { value: '123' }
        });

        expect(onErrorStateChange).toHaveBeenCalledWith(false);
    });
});
