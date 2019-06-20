import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles, Typography, TextField, MenuItem, Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    input: {
        display: 'flex',
        padding: 8
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden'
    },
    noOptionsMessage: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
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
        zIndex: 200,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0
    },
    divider: {
        height: theme.spacing(2)
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
    const { selectProps, innerRef, children, innerProps, error } = props;
    return (
        <TextField
            error={error}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label={selectProps.label}
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
    const { innerRef, isFocused, innerProps, children } = props;
    return (
        <MenuItem buttonRef={innerRef} selected={isFocused} component="div" {...innerProps}>
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

class AutoComplete extends React.PureComponent {
    state = {
        single: null
    };

    handleChange = name => value => {
        const { propertyName, onChange } = this.props;
        this.setState({
            [name]: value
        });
        onChange(propertyName, value);
    };

    render() {
        const {
            classes,
            theme,
            suggestions,
            disabled,
            label,
            onInputChange,
            isLoading
        } = this.props;

        const { single } = this.state;

        if (suggestions.length === 1) {
            this.setState({
                single: suggestions[0]
            });
        }

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
                    label={label}
                    components={components}
                    placeholder=""
                    onInputChange={onInputChange}
                    value={suggestions.length === 1 ? suggestions[0] : single}
                    onChange={this.handleChange('single')}
                    isClearable
                    isLoading={isLoading}
                />
            </div>
        );
    }
}

AutoComplete.defaultProps = {
    disabled: false,
    onInputChange: undefined,
    isLoading: false
};

AutoComplete.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    theme: PropTypes.shape({}).isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.shape).isRequired,
    propertyName: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onInputChange: PropTypes.func,
    isLoading: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(AutoComplete);
