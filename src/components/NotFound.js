import React from 'react';
import Grid from '@material-ui/core/Grid';
import Title from './Title';
import PageContainer from '../containers/PageContainer';

function NotFound() {
    return (
        <PageContainer>
            <Grid container alignItems="flex-start" styles={{ alignItems: 'flex-start' }}>
                <Title text="Page not found" />
            </Grid>
        </PageContainer>
    );
}

export default NotFound;
