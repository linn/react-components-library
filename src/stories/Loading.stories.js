/* eslint-disable react/jsx-props-no-spreading */

import ThemeProvider from '@mui/styles/ThemeProvider';
import linnTheme from '../themes/linnTheme';
import Loading from '../components/Loading';

export default {
    title: 'Components/Loading',
    decorators: [
        story => (
            <ThemeProvider theme={linnTheme}>
                <div>{story()}</div>
            </ThemeProvider>
        )
    ],
    component: Loading
};

export const Default = args => <Loading {...args} />;

Default.story = {
    name: 'default'
};
