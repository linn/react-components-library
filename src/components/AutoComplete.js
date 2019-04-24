import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250
    },
    input: {
        display: 'flex',
        padding: 0
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden'
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08
        )
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
        fontSize: 16
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

function NoOptionsMessage(props) {
    const { selectProps, innerProps, children } = props;
    return (
        <Typography
            color="textSecondary"
            className={selectProps.classes.noOptionsMessage}
            {...innerProps}
        >
            {children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    const { selectProps, innerRef, children, innerProps } = props;
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: selectProps.classes.input,
                    inputRef: innerRef,
                    children,
                    ...innerProps
                }
            }}
            {...selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    const { innerRef, isFocused, isSelected, innerProps, children } = props;
    return (
        <MenuItem
            buttonRef={innerRef}
            selected={isFocused}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400
            }}
            {...innerProps}
        >
            {children}
        </MenuItem>
    );
}

function Placeholder(props) {
    const { selectProps, innerProps, children } = props;
    return (
        <Typography
            color="textSecondary"
            className={selectProps.classes.placeholder}
            {...innerProps}
        >
            {children}
        </Typography>
    );
}

function SingleValue(props) {
    const { selectProps, innerProps, children } = props;

    return (
        <Typography className={selectProps.classes.singleValue} {...innerProps}>
            {children}
        </Typography>
    );
}

function ValueContainer(props) {
    const { selectProps, children } = props;

    return <div className={selectProps.classes.valueContainer}>{children}</div>;
}

function Menu(props) {
    const { selectProps, innerProps, children } = props;

    return (
        <Paper square className={selectProps.classes.paper} {...innerProps}>
            {children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

function AutoComplete({ classes, theme, suggestions, disabled, placeholder }) {
    const [single, setSingle] = useState(null);

    const handleChange = name => value => {
        setSingle(value);
    };

    const selectStyles = {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit'
            }
        })
    };

    return (
        <div className={classes.root}>
            <Select
                isDisabled={disabled}
                classes={classes}
                styles={selectStyles}
                options={suggestions}
                components={components}
                value={single}
                onChange={handleChange('single')}
                placeholder={placeholder}
                isClearable
            />
        </div>
    );
}

AutoComplete.defaultProps = {
    disabled: false,
    placeholder: ''
};

AutoComplete.propTypes = {
    classes: PropTypes.shape.isRequired,
    theme: PropTypes.shape.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.shape).isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(AutoComplete);
