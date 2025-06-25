import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
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
    navigate = null,
    location = null,
    width = 'l',
    requestErrors = [],
    showRequestErrors = false,
    homeUrl = null,
    showBreadcrumbs = true,
    title = null,
    defaultAppTitle = null
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
    }, [requestErrors, enqueueSnackbar, showRequestErrors]);

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
            <Grid size={12}>
                {showBreadcrumbs && (
                    <Breadcrumbs navigate={navigate} homeUrl={homeUrl} location={location} />
                )}
            </Grid>
            <Grid size={columnWidth[width]} />
            <Grid size={pageWidth[width]}>
                <Paper sx={{ padding: 4 }} square>
                    {children}
                </Paper>
            </Grid>

            <Grid size={columnWidth[width]} />
        </Grid>
    );
}

export default Page;
