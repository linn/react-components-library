import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export const errorTheme = createMuiTheme({
    palette: {
        background: {
            paper: red[100]
        },        
    },
    typography: {
        useNextVariants: true
    }
});