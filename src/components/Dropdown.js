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

const hasDisplayText = items => items.some(item => item.displayText || item.displayText === '');

const includesValue = (value, items) => {
    if (hasDisplayText(items)) {
        return items.some(item => item.id === value);
    }

    return items.includes(value);
};

const getOptions = (items, allowNoValue, optionsLoading = false) => {
    if (optionsLoading) return ['loading...'];
    const options = items ? [...items] : [];
    if (allowNoValue) {
        if (hasDisplayText(items)) {
            options.push({ id: '', displayText: '' });
        } else {
            options.push('');
        }
    }
    return options;
};

function Dropdown({
    onChange,
    optionsLoading,
    propertyName,
    required,
    disabled,
    label,
    items,
    allowNoValue,
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
                    ? getOptions(items, allowNoValue, optionsLoading).map(item => (
                          <option key={item.id} value={item.id}>
                              {item.displayText}
                          </option>
                      ))
                    : getOptions(items, allowNoValue, optionsLoading).map(item => (
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
        const { items, value, allowNoValue, optionsLoading } = props;

        if (value === null) {
            return new Error('Please provide a value that is not null');
        }
        if (!optionsLoading && !includesValue(value, getOptions(items, allowNoValue))) {
            return new Error('Please provide a value that is in the items list');
        }

        return null;
    },
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    margin: PropTypes.string,
    allowNoValue: PropTypes.bool,
    optionsLoading: PropTypes.bool
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
    margin: 'dense',
    allowNoValue: true,
    optionsLoading: false
};

export default Dropdown;
