import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import PropTypes from 'prop-types';

function PrevNextButtons({ goPrev, goNext, nextResult, prevResult, disabled }) {
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
