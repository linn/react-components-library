import React from 'react';
import { storiesOf } from '@storybook/react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';
import NotFound from '../components/NotFound';

storiesOf('NotFound', module)
    .addDecorator(story => (
        <ThemeProvider theme={linnTheme}>
            <div>{story()}</div>
        </ThemeProvider>
    ))
    .add('default', () => <NotFound />);
