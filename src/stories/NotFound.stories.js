import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { linnTheme } from '../themes/linnTheme';
import NotFound from '../components/NotFound';

const store = createStore(() => {});

storiesOf('NotFound', module)
    .addDecorator(story => (
        <Provider store={store}>
            <ThemeProvider theme={linnTheme}>
                <div>{story()}</div>
            </ThemeProvider>
        </Provider>
    ))
    .addDecorator(StoryRouter())
    .add('default', () => <NotFound />);
