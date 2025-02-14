/* eslint-disable react/jsx-props-no-spreading */

import ErrorCard from '../components/ErrorCard';

export default {
    title: 'Components/ErrorCard',
    decorators: [story => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>],
    component: ErrorCard
};

export const Default = args => <ErrorCard {...args} />;
export const WithDetails = () => (
    <ErrorCard
        errorMessage="This error has the following details: "
        detailLines={[
            { descriptor: 'Detail 1', message: 'Message 1' },
            { descriptor: 'Detail 2', message: 'Message 2' }
        ]}
    />
);

Default.story = {
    name: 'default '
};

Default.args = {
    errorMessage: 'Error Message'
};
