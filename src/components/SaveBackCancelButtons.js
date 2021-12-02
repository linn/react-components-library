import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function SaveBackCancelButtons({ saveClick, cancelClick, saveDisabled, backClick }) {
    const useStyles = makeStyles((theme) => ({
        pullRight: {
            float: 'right'
        },
        cancel: {
            marginRight: theme.spacing(1)
        }
    }));
    const classes = useStyles();

    const handleClick = () => {
        if (saveDisabled) {
            backClick();
        } else {
            cancelClick();
        }
    };

    return (
        <div className={classes.pullRight}>
            <Button
                id="cancel-button"
                onClick={() => handleClick()}
                variant="outlined"
                className={classes.cancel}
            >
                {saveDisabled ? 'Back' : 'Cancel'}
            </Button>

            <Button
                id="save-button"
                variant="contained"
                color="primary"
                onClick={() => saveClick()}
                disabled={saveDisabled}
            >
                Save
            </Button>
        </div>
    );
}

SaveBackCancelButtons.propTypes = {
    saveClick: PropTypes.func.isRequired,
    cancelClick: PropTypes.func.isRequired,
    backClick: PropTypes.func.isRequired,
    saveDisabled: PropTypes.bool
};

SaveBackCancelButtons.defaultProps = {
    saveDisabled: false
};

export default SaveBackCancelButtons;
