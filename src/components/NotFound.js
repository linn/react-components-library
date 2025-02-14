import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';

function NotFound() {
    return (
        <Grid container alignItems="flex-start" styles={{ alignItems: 'flex-start' }}>
            <Typography variant="h4">Page Not Found</Typography>
        </Grid>
    );
}

export default NotFound;
