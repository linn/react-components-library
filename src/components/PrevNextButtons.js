import React from 'react';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function PrevNextButtons({
    goPrev = null,
    goNext = null,
    nextResult = '',
    prevResult = '',
    disabled = false
}) {
    return (
        <>
            {goPrev ? (
                <Grid xs={2}>
                    <Button disabled={disabled} startIcon={<ArrowLeftIcon />} onClick={goPrev}>
                        {prevResult}
                    </Button>
                </Grid>
            ) : (
                <Grid xs={2} />
            )}
            <Grid xs={8} />
            {goNext ? (
                <Grid xs={2}>
                    <Button disabled={disabled} endIcon={<ArrowRightIcon />} onClick={goNext}>
                        {nextResult}
                    </Button>
                </Grid>
            ) : (
                <Grid xs={2} />
            )}
        </>
    );
}

export default PrevNextButtons;
