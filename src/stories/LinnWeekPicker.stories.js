/* eslint-disable react/jsx-props-no-spreading */

import ThemeProvider from '@mui/styles/ThemeProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { action } from '@storybook/addon-actions';
import LinnWeekPicker from '../components/LinnWeekPicker';
import linnTheme from '../themes/linnTheme';

const actions = {
    onChange: action('date changed'),
    setWeekStartDate: action('set week start date')
};

export default {
    title: 'Components/LinnWeekPicker',
    decorators: [
        story => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <ThemeProvider theme={linnTheme}>
                    <div>{story()}</div>
                </ThemeProvider>
            </LocalizationProvider>
        )
    ],
    component: LinnWeekPicker
};

export const Default = args => <LinnWeekPicker {...args} {...actions} />;

Default.story = {
    name: 'default '
};

Default.args = {
    value: new Date('04/12/2024'),
    disabled: false,
    label: 'Your Label'
};
