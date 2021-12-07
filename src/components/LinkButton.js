import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
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

function LinkButton({ to, external, tooltip, text, disabled }) {
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
                <a className={classes.a} href={to}>
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
    disabled: PropTypes.bool
};

LinkButton.defaultProps = {
    external: false,
    disabled: false,
    tooltip: null
};

export default LinkButton;
