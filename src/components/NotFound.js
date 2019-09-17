import React from 'react';
import Grid from '@material-ui/core/Grid';
import Title from './Title';

function NotFound() {
    return (
        <Grid container alignItems="flex-start" styles={{ alignItems: 'flex-start' }}>
            <Title text="Page not found" />
        </Grid>
    );
}

export default NotFound;
