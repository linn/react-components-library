import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

export const errorTheme = createTheme(adaptV4Theme({
    palette: {
        background: {
            paper: red[100]
        }
    }
}));
