import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    pullLeft: {
        float: 'left'
    }
});

class BackButton extends Component {

    render() {
        const { backClick, classes} = this.props;

        return (
            <div className={classes.pullLeft}>
                <Button id="back-button"
                    onClick={() => backClick()}
                    >
                    Back
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(BackButton);
