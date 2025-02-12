import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Now fully stable in MUI v6
import Breadcrumbs from './Breadcrumbs';

const pageWidth = {
    xs: 4,
    s: 6,
    m: 8,
    l: 10,
    xl: 12
};

const columnWidth = {
    xs: 4,
    s: 3,
    m: 2,
    l: 1,
    xl: 0
};

function Page({
    children,
    navigate,
    location,
    width,
    requestErrors,
    showRequestErrors,
    homeUrl,
    showBreadcrumbs,
    title,
    defaultAppTitle
}) {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (requestErrors && showRequestErrors) {
            requestErrors.forEach(t => {
                enqueueSnackbar(`${t.message} - ${t.type}`, {
                    variant: 'error',
                    preventDuplicate: true
                });
            });
        }
    }, [requestErrors, enqueueSnackbar]);

    useEffect(() => {
        if (title) {
            document.title = title;
        }
        return () => {
            if (defaultAppTitle) {
                document.title = defaultAppTitle;
            }
        };
    }, [title, defaultAppTitle]);

    return (
        <Grid container spacing={3}>
            <Grid xs={12}>
                <Typography variant="h6">{title}</Typography>
            </Grid>
            
            <Grid xs={12}>
                {showBreadcrumbs && (
                    <Breadcrumbs navigate={navigate} homeUrl={homeUrl} location={location} />
                )}
            </Grid>

            <Grid xs={columnWidth[width]} />

            <Grid xs={pageWidth[width]}>
                <Paper sx={{ padding: 4 }} square>
                    {children}
                </Paper>
            </Grid>

            <Grid xs={columnWidth[width]} />
        </Grid>
    );
}

export default Page;
