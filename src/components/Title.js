import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
});

class Title extends Component {
    render() {
        const { text } = this.props;

        return (
            <Typography variant="h4" gutterBottom>{text}</Typography>
        );
    }
}

export default withStyles(styles)(Title);
