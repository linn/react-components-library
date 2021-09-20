import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import render from '../../test-utils';
import Dropdown from '../Dropdown';

afterEach(() => cleanup());

describe('When rendering Dropdown...', () => {
    test('should render text field', () => {
        const props = {
            items: ['one', 'two', 'three'],
            value: 'two',
            label: 'dropdown label',
            onChange: jest.fn(),
            allowNoValue: false,
            propertyName: 'dropdownProperty'
        };
        //eslint-disable-next-line react/jsx-props-no-spreading
        const { getByLabelText } = render(<Dropdown {...props} />);

        expect(getByLabelText('dropdown label')).toBeInTheDocument();
    });
});

describe('when items exist', () => {
    beforeEach(() => {
        const props = {
            items: ['one', 'two', 'three'],
            value: 'two',
            label: 'dropdown label',
            onChange: jest.fn(),
            allowNoValue: false,
            propertyName: 'dropdownProperty'
        };
        //eslint-disable-next-line react/jsx-props-no-spreading
        render(<Dropdown {...props} />);
    });

    test('should render menu items', () => {
        expect(screen.getAllByRole('option')).toHaveLength(3);

        expect(screen.getAllByRole('option')).toHaveLength(3);
        expect(screen.getByText('one')).toBeInTheDocument();
        expect(screen.getByText('two')).toBeInTheDocument();
        expect(screen.getByText('three')).toBeInTheDocument();
    });
});

describe('when item objects exist...', () => {
    beforeEach(() => {
        const props = {
            items: [
                { id: 1, displayText: 'one' },
                { id: 2, displayText: 'two' },
                { id: 3, displayText: 'three' }
            ],
            value: 2,
            label: 'dropdown label',
            onChange: jest.fn(),
            propertyName: 'dropdownProperty',
            allowNoValue: false
        };
        //eslint-disable-next-line react/jsx-props-no-spreading
        render(<Dropdown {...props} />);
    });
    test('should render menu items', () => {
        expect(screen.getAllByRole('option')).toHaveLength(3);
        expect(screen.getByText('one')).toBeInTheDocument();
        expect(screen.getByText('two')).toBeInTheDocument();
        expect(screen.getByText('three')).toBeInTheDocument();
    });
});
