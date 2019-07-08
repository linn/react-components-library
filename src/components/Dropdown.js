import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import makeStyles from '@material-ui/styles/makeStyles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 0,
        marginTop: theme.spacing(1)
    },
    disabled: {
        background: theme.palette.grey[100],
        color: theme.palette.text.secondary
    },
    label: {
        fontSize: theme.typography.fontSize
    },
    helperText: {
        color: theme.palette.error.main
    },
    labelAsterisk: {
        color: theme.palette.error.main
    },
    required: {
        color: theme.palette.error.main
    },
    error: {
        color: theme.palette.error.main
    }
}));

const hasValue = val => val || val === 0;

const getValue = val => (hasValue(val) ? val : '');

const hasDisplayText = items => items.some(item => item.displayText);

const includesValue = (value, items) => {
    if (hasDisplayText(items)) {
        return items.some(item => item.id === value);
    }

    return items.includes(value);
};

function Dropdown({
    onChange,
    propertyName,
    required,
    disabled,
    label,
    items = [],
    value,
    helperText,
    fullWidth,
    adornment,
    type,
    error,
    margin
}) {
    const classes = useStyles();

    const change = e => {
        const newValue = e.target.value;

        let val;

        if (type === 'number') {
            val = hasValue(newValue) ? parseFloat(newValue) : null;
        } else {
            val = hasValue(newValue) ? newValue : '';
        }

        onChange(propertyName, val);
    };

    return (
        <React.Fragment>
            <InputLabel
                classes={{ root: classes.label, asterisk: classes.labelAsterisk }}
                required={required}
                error={error}
            >
                {label}
            </InputLabel>
            <TextField
                classes={{
                    root: classes.root
                }}
                error={error}
                id="outlined-select-currency-native"
                type={type}
                select
                adornment={adornment}
                disabled={disabled}
                fullWidth={fullWidth}
                value={getValue(value)}
                onChange={e => change(e)}
                SelectProps={{
                    native: true
                }}
                helperText={helperText}
                margin={margin}
                variant="outlined"
                required={required}
                InputProps={{
                    classes: {
                        disabled: classes.disabled
                    }
                }}
                FormHelperTextProps={{
                    classes: {
                        required: classes.required,
                        error: classes.error
                    }
                }}
            >
                {hasDisplayText(items)
                    ? items.map(item => (
                          <option key={item.id} value={item.id}>
                              {item.displayText}
                          </option>
                      ))
                    : items.map(item => (
                          <option key={item} value={item}>
                              {item}
                          </option>
                      ))}
            </TextField>
        </React.Fragment>
    );
}

Dropdown.propTypes = {
    adornment: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    items: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.PropTypes.string, PropTypes.PropTypes.number]),
                displayText: PropTypes.string
            })
        )
    ]),
    propertyName: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: props => {
        const { items, value } = props;
        if (!includesValue(value, items)) {
            return new Error('Please provide a value that is in the items list');
        }

        return null;
    },
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    margin: PropTypes.string
};

Dropdown.defaultProps = {
    adornment: '',
    disabled: false,
    fullWidth: false,
    items: [],
    helperText: '',
    type: 'text',
    required: false,
    value: '',
    error: false,
    margin: 'dense'
};

export default Dropdown;
