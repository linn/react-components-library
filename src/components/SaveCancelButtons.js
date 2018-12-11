import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    pullRight: {
        float: 'right'
    }
});

class SaveCancelButtons extends Component {

    render() {
        const { saveClick, cancelClick, classes, disabled } = this.props;

        return (
            <div className={classes.pullRight}>
                <Button id="cancel-button"
                    onClick={() => cancelClick()}
                    disabled={disabled}
                    >
                    Cancel
                </Button>

                <Button id="save-button"
                    variant="outlined"
                    variant="contained"
                    color="primary"
                    onClick={() => saveClick()}
                    disabled={disabled}
                    >
                    Save
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(SaveCancelButtons);