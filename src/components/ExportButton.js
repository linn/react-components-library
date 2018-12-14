import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import SvgIcon from '@material-ui/core/SvgIcon';
const styles = theme => ({

});

class ExportButton extends Component {
    render() {
        const { classes, href } = this.props;

        return (
            <div className={classes.pullLeft}>
             <Tooltip title="Download report as CSV file" placement="top-end">
                <Button variant="contained" href={href}>
                    Export  
                    <SvgIcon>
                      <path xmlns="http://www.w3.org/2000/svg" d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>
                    </SvgIcon>
                </Button>
              </Tooltip>
            </div>
        );
    }
}

export default withStyles(styles)(ExportButton);
