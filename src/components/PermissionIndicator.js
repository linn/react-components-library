import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import EditOffIcon from '@mui/icons-material/EditOff';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PropTypes from 'prop-types';

function PermissionIndicator({ hasPermission, hasPermissionMessage, noPermissionMessage }) {
    const pullRightStyle = { float: 'right' };

    return hasPermission ? (
        <Tooltip title={hasPermissionMessage}>
            <ModeEditIcon color="primary" sx={pullRightStyle} />
        </Tooltip>
    ) : (
        <Tooltip title={noPermissionMessage}>
            <EditOffIcon color="secondary" sx={pullRightStyle} />
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
