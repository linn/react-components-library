import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';

function LinkButton({ to, external, newTab, tooltip, text, disabled }) {
    const button = (
        <Button
            color="primary"
            aria-label="Search"
            variant="outlined"
            sx={{
                marginLeft: 1,
                marginTop: 3
            }}
            disabled={disabled}
        >
            {text}
        </Button>
    );

    const wrappedButton = tooltip ? (
        <Tooltip title={tooltip}>
            <div>{button}</div>
        </Tooltip>
    ) : (
        button
    );

    if (disabled) {
        return wrappedButton;
    }

    return (
        <div>
            {external ? (
                <a
                    href={to}
                    target={newTab ? '_blank' : '_self'}
                    rel="noreferrer"
                    style={{
                        textDecoration: 'none'
                    }}
                >
                    {wrappedButton}
                </a>
            ) : (
                <Link
                    to={to}
                    style={{
                        textDecoration: 'none'
                    }}
                >
                    {wrappedButton}
                </Link>
            )}
        </div>
    );
}

LinkButton.propTypes = {
    text: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    to: PropTypes.string.isRequired,
    external: PropTypes.bool,
    disabled: PropTypes.bool,
    newTab: PropTypes.bool
};

LinkButton.defaultProps = {
    external: false,
    disabled: false,
    tooltip: null,
    newTab: false
};

export default LinkButton;
