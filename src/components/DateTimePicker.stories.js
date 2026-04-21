import { fn } from 'storybook/test';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import DateTimePicker from './DateTimePicker';

export default {
    title: 'Components/DateTimePicker',
    component: DateTimePicker,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Story />
            </LocalizationProvider>
        )
    ],
    args: {
        onChange: fn(),
        label: 'Select date and time',
        value: '2025-06-15T14:30:00.000Z',
        disabled: false,
        required: false
    }
};

export const Default = {};

export const WithLabel = {
    name: 'With label',
    args: {
        label: 'Appointment Date & Time',
        value: '2025-09-01T09:00:00.000Z'
    }
};

export const Required = {
    args: {
        label: 'Required Date & Time',
        required: true
    }
};

export const Disabled = {
    args: {
        label: 'Read-only Date & Time',
        disabled: true,
        value: '2024-12-25T12:00:00.000Z'
    }
};
