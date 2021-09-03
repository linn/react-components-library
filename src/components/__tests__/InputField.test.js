import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import render from '../../test-utils';

import InputField from '../InputField';

describe('<InputField />', () => {
    let props;

    beforeEach(() => {
        props = {
            label: 'some label',
            propertyName: 'thePropertyName',
            value: 'value',
            onChange: () => {}
        };
    });

    describe('when rendering input field', () => {
        it('should render text field', () => {
            const { getByLabelText } = render(<InputField {...props} />);

            expect(getByLabelText('some label')).toBeInTheDocument();
        });
    });
});
