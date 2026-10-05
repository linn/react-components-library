import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const LinkValue = React.forwardRef(function LinkValue(
    {
        value,
        disabled,
        external,
        to,
        openLinksInNewTabs,
        label,
        toolTip,
        className,
        id,
        onFocus,
        onBlur
    },
    ref
) {
    const sx = { display: 'block', font: 'inherit', lineHeight: 'inherit' };

    if (disabled) {
        return (
            <Typography ref={ref} component="span" className={className} id={id} sx={sx}>
                {value}
            </Typography>
        );
    }

    const Icon = openLinksInNewTabs ? OpenInNewIcon : LinkIcon;

    return (
        <Tooltip
            title={toolTip ?? `Open ${label || 'link'}${openLinksInNewTabs ? ' in a new tab' : ''}`}
            describeChild
        >
            <Link
                ref={ref}
                className={className}
                id={id}
                onFocus={onFocus}
                onBlur={onBlur}
                target={openLinksInNewTabs ? '_blank' : ''}
                rel={openLinksInNewTabs ? 'noopener noreferrer' : ''}
                variant="body1"
                underline="none"
                color="inherit"
                sx={{ ...sx, position: 'relative', cursor: 'pointer' }}
                {...(external ? { href: to } : { component: RouterLink, to })}
            >
                {value}
                <Icon
                    sx={{
                        position: 'absolute',
                        right: 14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: 18,
                        color: 'action.active',
                        pointerEvents: 'none'
                    }}
                />
            </Link>
        </Tooltip>
    );
});

function LinkField({
    value = '',
    openLinksInNewTabs = false,
    to,
    external = true,
    disabled = false,
    label = '',
    toolTip = null,
    shouldRender = true
}) {
    if (!shouldRender) {
        return '';
    }

    return (
        <>
            {label && (
                <InputLabel
                    sx={{
                        fontSize: theme => theme.typography.fontSize,
                        color: 'inherit'
                    }}
                >
                    {label}
                </InputLabel>
            )}
            <OutlinedInput
                sx={{
                    paddingTop: 0,
                    color: 'text.disabled',
                    marginTop: theme => theme.spacing(1),
                    '& .MuiInputBase-input': {
                        paddingRight: disabled ? undefined : 5
                    },
                    '&:not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: 2
                    },
                    '&:not(.Mui-disabled):focus-within .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: 2
                    }
                }}
                fullWidth
                size="small"
                margin="dense"
                disabled={disabled}
                readOnly
                value={value ?? ''}
                inputComponent={LinkValue}
                slotProps={{ input: { external, to, openLinksInNewTabs, label, toolTip } }}
            />
        </>
    );
}

export default LinkField;
