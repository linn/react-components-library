import { fn } from 'storybook/test';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import LinnWeekPicker from './LinnWeekPicker';

export default {
    title: 'Components/LinnWeekPicker',
    component: LinnWeekPicker,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Story />
            </LocalizationProvider>
        )
    ],
    args: {
        setWeekStartDate: fn(),
        propertyName: 'weekStart',
        label: 'Select Week',
        selectedDate: new Date('2025-06-09'),
        disabled: false,
        required: false
    }
};

export const Default = {};

export const WithLabel = {
    name: 'With label',
    args: {
        label: 'Production Week'
    }
};

export const Required = {
    args: {
        label: 'Required Week',
        required: true
    }
};

export const Disabled = {
    args: {
        label: 'Locked Week',
        disabled: true
    }
};

export const NoLabel = {
    name: 'No label',
    args: {
        label: ''
    }
};
