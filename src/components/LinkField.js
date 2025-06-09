import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function LinkField({
    value = '',
    openLinksInNewTabs = false,
    to,
    external = true,
    disabled = false,
    label = '',
    shouldRender = true
}) {
    if (!shouldRender) {
        return '';
    }

    if (disabled) {
        return <Typography color="textDisabled">{value}</Typography>;
    }

    return (
        <>
            {label && (
                <InputLabel
                    sx={{
                        fontSize: theme => theme.typography.fontSize
                    }}
                >
                    {label}
                </InputLabel>
            )}
            {external ? (
                <Link
                    target={openLinksInNewTabs ? '_blank' : ''}
                    rel={openLinksInNewTabs ? 'noopener noreferrer' : ''}
                    variant="body1"
                    underline="hover"
                    href={to}
                    color="secondary"
                >
                    {value}
                </Link>
            ) : (
                <Link
                    target={openLinksInNewTabs ? '_blank' : ''}
                    rel={openLinksInNewTabs ? 'noopener noreferrer' : ''}
                    component={RouterLink}
                    variant="body1"
                    color="secondary"
                    underline="hover"
                    to={to}
                >
                    {value}
                </Link>
            )}
        </>
    );
}

export default LinkField;
