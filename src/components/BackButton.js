import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    pullLeft: {
        float: 'left'
    }
}));

const BackButton = ({ backClick, text }) => {
    const classes = useStyles();
    return (
        <div className={classes.pullLeft}>
            <Button id="back-button" onClick={() => backClick()}>
                {text || 'Back'}
            </Button>
        </div>
    );
};

BackButton.propTypes = {
    backClick: PropTypes.func.isRequired,
    text: PropTypes.string
};

BackButton.defaultProps = {
    text: null
};

export default BackButton;
