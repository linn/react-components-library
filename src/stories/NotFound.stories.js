import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';
import NotFound from '../components/NotFound';

export default {
    title: 'NotFound',

    decorators: [
        story => (
            <ThemeProvider theme={linnTheme}>
                <div>{story()}</div>
            </ThemeProvider>
        )
    ]
};

export const Default = () => <NotFound />;

Default.story = {
    name: 'default'
};
