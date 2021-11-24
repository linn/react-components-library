/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ThemeProvider from '@mui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';
import Loading from '../components/Loading';

export default {
    title: 'Components/Loading',
    decorators: [
        story => (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={linnTheme}>
                    <div>{story()}</div>
                </ThemeProvider>
            </StyledEngineProvider>
        )
    ],
    component: Loading
};

export const Default = args => <Loading {...args} />;

Default.story = {
    name: 'default'
};
