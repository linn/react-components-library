import React from 'react';
import ThemeProvider from '@mui/styles/ThemeProvider';
import linnTheme from '../themes/linnTheme';
import NotFound from '../components/NotFound';

export default {
    title: 'Components/NotFound',
    decorators: [
        story => (
            <ThemeProvider theme={linnTheme}>
                <div>{story()}</div>
            </ThemeProvider>
        )
    ],
    component: NotFound
};

export const Default = () => <NotFound />;

Default.story = {
    name: 'default'
};
