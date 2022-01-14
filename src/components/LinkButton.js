import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import makeStyles from '@mui/styles/makeStyles';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(3)
    },
    a: {
        textDecoration: 'none'
    }
}));

function LinkButton({ to, external, newTab, tooltip, text, disabled }) {
    const classes = useStyles();

    const button = () =>
        tooltip ? (
            <Tooltip title={tooltip}>
                <div>
                    <Button
                        color="primary"
                        aria-label="Search"
                        variant="outlined"
                        className={classes.button}
                        disabled={disabled}
                    >
                        {text}
                    </Button>
                </div>
            </Tooltip>
        ) : (
            <Button
                color="primary"
                aria-label="Search"
                variant="outlined"
                className={classes.button}
                disabled={disabled}
            >
                {text}
            </Button>
        );
    if (disabled) {
        return button();
    }
    return (
        <div>
            {external ? (
                <a className={classes.a} href={to} target={newTab ? '_blank' : ''} rel="noreferrer">
                    {button()}
                </a>
            ) : (
                <Link className={classes.a} to={to}>
                    {button()}
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
