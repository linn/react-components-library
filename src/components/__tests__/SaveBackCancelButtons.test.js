import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { linnTheme } from '../../themes';
import SaveBackCancelButtons from '../SaveBackCancelButtons';

describe('<SaveBackCancelButtons />', () => {
    let wrapper;
    let props;
    const getButtons = () => wrapper.find('ForwardRef(Button)');

    const mount = createMount();

    const cancelClick = jest.fn();
    const backClick = jest.fn();
    const saveClick = jest.fn();

    beforeEach(() => {
        const ComponentWithTheme = () => (
            <MuiThemeProvider theme={linnTheme}>
                <Router>
                    <SaveBackCancelButtons
                        cancelClick={cancelClick}
                        backClick={backClick}
                        saveClick={saveClick}
                    />
                </Router>
            </MuiThemeProvider>
        );

        wrapper = mount(<ComponentWithTheme {...props} />);
    });

    it('should render without throwing an error', () => {
        expect(getButtons()).toHaveLength(2);
    });
});
