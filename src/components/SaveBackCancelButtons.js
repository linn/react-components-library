import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const styles = () => ({
    pullRight: {
        float: 'right'
    }
});

const SaveBackCancelButtons = ({ saveClick, cancelClick, classes, saveDisabled, backClick }) => {
    const handleClick = () => {
        if (saveDisabled) {
            backClick();
        } else {
            cancelClick();
        }
    };

    return (
        <div className={classes.pullRight}>
            <Button id="cancel-button" onClick={() => handleClick()}>
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
};

SaveBackCancelButtons.propTypes = {
    classes: PropTypes.shape({}),
    saveClick: PropTypes.func.isRequired,
    cancelClick: PropTypes.func.isRequired,
    backClick: PropTypes.func.isRequired,
    saveDisabled: PropTypes.bool
};

SaveBackCancelButtons.defaultProps = {
    classes: {},
    saveDisabled: false
};

export default withStyles(styles)(SaveBackCancelButtons);