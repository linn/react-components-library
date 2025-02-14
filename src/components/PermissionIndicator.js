import Tooltip from '@mui/material/Tooltip';
import EditOffIcon from '@mui/icons-material/EditOff';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function PermissionIndicator({
    hasPermission = false,
    hasPermissionMessage = 'You have permission for this page',
    noPermissionMessage = 'You do not have permission for this page'
}) {
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

export default PermissionIndicator;
