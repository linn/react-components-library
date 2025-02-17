
import { ThemeProvider, createTheme } from '@mui/material/styles';
import moment from 'moment';
import { action } from '@storybook/addon-actions';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DatePicker from '../components/DatePicker';
import DatePickerDocs from './DatePickerDocs.mdx';

const actions = {
    onChange: action('date changed')
};

export default {
    title: 'Components/DatePicker',
    decorators: [
        story => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <ThemeProvider theme={createTheme()}>
                    <div>{story()}</div>
                </ThemeProvider>
            </LocalizationProvider>
        )
    ],
    component: DatePicker,
    parameters: {
        docs: {
            page: DatePickerDocs
        }
    }
};

export const Default = args => <DatePicker {...args} {...actions} />;

Default.story = {
    name: 'default '
};

Default.args = {
    value: new Date().toISOString(),
    disabled: false,
    label: 'Your Label'
};

export const WithLimits = args => <DatePicker {...args} {...actions} />;

WithLimits.story = {
    name: 'with limits'
};

WithLimits.args = {
    value: new Date().toISOString(),
    maxDate: moment(),
    minDate: moment().subtract(1, 'months'),
    disabled: false,
    label: 'Your Label'
};
