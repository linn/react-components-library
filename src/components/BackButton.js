import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const styles = () => ({
    pullLeft: {
        float: 'left'
    }
});

const BackButton = ({ backClick, classes }) => (
    <div className={classes.pullLeft}>
        <Button id="back-button" onClick={() => backClick()}>
            Back
        </Button>
    </div>
);

BackButton.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    backClick: PropTypes.func.isRequired
};

export default withStyles(styles)(BackButton);
