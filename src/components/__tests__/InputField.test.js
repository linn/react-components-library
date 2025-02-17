import '@testing-library/jest-dom';
import { fireEvent, cleanup } from '@testing-library/react';
import render from '../../test-utils';
import InputField from '../InputField';

afterEach(cleanup);

const changeMock = jest.fn();

const onErrorStateChange = jest.fn();

describe('When Max Length Exceeded', () => {
    test('should show error', () => {
        const { getByText, getByDisplayValue } = render(
            <InputField propertyName="test" maxLength={3} onChange={changeMock} value="ok" />
        );
        const input = getByDisplayValue('ok');

        fireEvent.change(input, { target: { value: 'not ok - longer than 3' } });

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

        fireEvent.change(input, { target: { value: 'not ok - longer than 3' } });

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

        fireEvent.change(input, { target: { value: '123' } });

        expect(onErrorStateChange).toHaveBeenCalledWith(false);
    });
});
