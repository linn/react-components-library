import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { linnTheme } from '../../themes';
import InputField from '../InputField';

describe('<InputField />', () => {
    let wrapper;
    let props;
    const getTextField = () => wrapper.find('WithStyles(ForwardRef(TextField))');
    const mount = createMount();

    beforeEach(() => {
        props = {
            label: 'label',
            value: 'value',
            onChange: () => {}
        };

        const ComponentWithTheme = () => (
            <MuiThemeProvider theme={linnTheme}>
                <InputField {...props} />
            </MuiThemeProvider>
        );

        wrapper = mount(<ComponentWithTheme {...props} />);
    });

    describe('when rendering input field', () => {
        it('should render text field', () => {
            expect(getTextField()).toHaveLength(1);
        });
    });
});
