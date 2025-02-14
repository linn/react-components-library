import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
    return (
        <Box
            sx={{
                textAlign: 'center',
                margin: theme => theme.spacing(4),
                height: '40px'
            }}
        >
            <CircularProgress />
        </Box>
    );
}
