import React from 'react';
import { storiesOf } from '@storybook/react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';
import Loading from '../components/Loading';

storiesOf('Loading', module)
    .addDecorator(story => (
        <ThemeProvider theme={linnTheme}>
            <div>{story()}</div>
        </ThemeProvider>
    ))
    .add('default', () => <Loading />);
