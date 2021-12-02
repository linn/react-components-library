import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
    outer: {
        textAlign: 'center',
        margin: theme.spacing(4),
        height: '40px'
    }
}));

export default function Loading() {
    const classes = useStyles();

    return (
        <div className={classes.outer}>
            <CircularProgress />
        </div>
    );
}
