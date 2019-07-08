import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

export const linnTheme = createMuiTheme({
    palette: {
        primary: {
            50: '#e0f7fa',
            100: '#b2ebf2',
            200: '#80deea',
            300: '#4dd0e1',
            400: '#26c6da',
            500: '#00bcd4',
            600: '#00acc1',
            700: '#0097a7',
            800: '#00838f',
            900: '#006064',
            A100: '#84ffff',
            A200: '#18ffff',
            A400: '#00e5ff',
            A700: '#00b8d4',
            contrastText: 'rgba(0, 0, 0, 0.87)',
            dark: '#0097a7',
            light: '#4dd0e1',
            main: '#00acc1'
        },
        secondary: pink
    }
});
