import { fn } from 'storybook/test';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import DatePicker from './DatePicker';

export default {
    title: 'Components/DatePicker',
    component: DatePicker,
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
        label: 'Select date',
        value: '2025-06-15T00:00:00.000Z',
        disabled: false,
        required: false,
        minDate: null,
        maxDate: null
    }
};

export const Default = {};

export const WithLabel = {
    name: 'With label',
    args: {
        label: 'Date of Birth',
        value: '1990-03-22T00:00:00.000Z'
    }
};

export const Required = {
    args: {
        label: 'Required Date',
        required: true
    }
};

export const Disabled = {
    args: {
        label: 'Read-only Date',
        disabled: true,
        value: '2024-01-01T00:00:00.000Z'
    }
};

export const WithMinMaxDate = {
    name: 'With min/max date',
    args: {
        label: 'Restricted Date',
        minDate: '2025-01-01T00:00:00.000Z',
        maxDate: '2025-12-31T00:00:00.000Z',
        value: '2025-06-15T00:00:00.000Z'
    }
};
