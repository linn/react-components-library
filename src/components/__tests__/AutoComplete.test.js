import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, screen, cleanup } from '@testing-library/react';
import render from '../../test-utils';
import AutoComplete from '../AutoComplete';

afterEach(cleanup);

describe('AutoComplete', () => {
    const options = [
        { code: 10, name: 'Alpha' },
        { code: 20, name: 'Beta' },
        { code: 30, name: 'Gamma' }
    ];

    describe('id/label convenience mode', () => {
        test('shows the labelField text for the plain id value', () => {
            render(
                <AutoComplete
                    label="Thing"
                    options={options}
                    idField="code"
                    labelField="name"
                    value={20}
                    onChange={() => {}}
                />
            );

            expect(screen.getByRole('combobox')).toHaveValue('Beta');
        });

        test('emits the id (not the option object) on change', () => {
            const onChange = jest.fn();
            render(
                <AutoComplete
                    label="Thing"
                    options={options}
                    idField="code"
                    labelField="name"
                    value={20}
                    onChange={onChange}
                />
            );

            const input = screen.getByRole('combobox');
            fireEvent.change(input, { target: { value: 'Gamma' } });
            fireEvent.blur(input);

            expect(onChange).toHaveBeenCalledWith(30);
        });
    });

    describe('object mode (unchanged)', () => {
        test('emits the whole option object on change', () => {
            const onChange = jest.fn();
            render(
                <AutoComplete
                    label="Thing"
                    options={options}
                    value={options[1]}
                    onChange={onChange}
                    getOptionLabel={o => o.name}
                    isOptionEqualToValue={(o, v) => o.code === v.code}
                />
            );

            const input = screen.getByRole('combobox');
            fireEvent.change(input, { target: { value: 'Alpha' } });
            fireEvent.blur(input);

            expect(onChange).toHaveBeenCalledWith(options[0]);
        });
    });
});
