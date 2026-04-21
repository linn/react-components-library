import ErrorCard from './ErrorCard';

export default {
    title: 'Components/ErrorCard',
    component: ErrorCard,
    tags: ['autodocs'],
    args: {
        errorMessage: 'Something went wrong',
        detailLines: []
    }
};

export const Default = {};

export const WithDetailLines = {
    name: 'With detail lines',
    args: {
        errorMessage: 'Failed to save record',
        detailLines: [
            { descriptor: 'Field: name', message: 'Name is required' },
            { descriptor: 'Field: email', message: 'Invalid email format' }
        ]
    }
};

export const NetworkError = {
    name: 'Network error',
    args: {
        errorMessage: 'Unable to connect to the server',
        detailLines: [{ descriptor: 'Status', message: '503 Service Unavailable' }]
    }
};
