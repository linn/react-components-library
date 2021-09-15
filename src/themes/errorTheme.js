import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export const errorTheme = createTheme({
    palette: {
        background: {
            paper: red[100]
        }
    }
});
