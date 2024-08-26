import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import EditOffIcon from '@mui/icons-material/EditOff';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { makeStyles } from '@mui/styles';

import PropTypes from 'prop-types';

function PermissionIndicator({ hasPermission, hasPermissionMessage, noPermissionMessage }) {
    const useStyles = makeStyles(() => ({
        pullRight: {
            float: 'right'
        }
    }));
    const classes = useStyles();

    return hasPermission ? (
        <Tooltip title={hasPermissionMessage}>
            <ModeEditIcon color="primary" className={classes.pullRight} />
        </Tooltip>
    ) : (
        <Tooltip title={noPermissionMessage}>
            <EditOffIcon color="secondary" className={classes.pullRight} />
        </Tooltip>
    );
}

PermissionIndicator.propTypes = {
    hasPermission: PropTypes.bool,
    hasPermissionMessage: PropTypes.string,
    noPermissionMessage: PropTypes.string
};

PermissionIndicator.defaultProps = {
    hasPermission: false,
    hasPermissionMessage: 'You have permission for this page',
    noPermissionMessage: 'You do not have permission for this page'
};

export default PermissionIndicator;
