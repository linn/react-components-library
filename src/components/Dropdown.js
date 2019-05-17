import { TextField } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const hasValue = val => val || val === 0;

const getValue = val => (hasValue(val) ? val : '');

const hasDisplayText = items => items.some(item => item.displayText);

const includesValue = (value, items) => {
    if (hasDisplayText(items)) {
        return items.some(item => item.id === value);
    }

    return items.includes(value);
};

class Dropdown extends Component {
    change(e) {
        const { onChange, propertyName, type } = this.props;
        const { value } = e.target;

        let val;

        if (type === 'number') {
            val = hasValue(value) ? parseFloat(value) : null;
        } else {
            val = hasValue(value) ? value : '';
        }

        onChange(propertyName, val);
    }

    render() {
        const {
            disabled,
            label,
            items = [],
            value,
            helpText,
            fullWidth,
            adornment,
            type,
            error
        } = this.props;

        return (
            <TextField
                error
                id="outlined-select-currency-native"
                type={type}
                select
                adornment={adornment}
                disabled={disabled}
                fullWidth={fullWidth}
                InputLabelProps={{ shrink: true }}
                label={label}
                value={getValue(value)}
                onChange={e => this.change(e)}
                SelectProps={{
                    native: true
                }}
                helperText={helpText}
                margin="normal"
                variant="outlined"
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
        );
    }
}

Dropdown.propTypes = {
    adornment: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    helpText: PropTypes.string,
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
    value: props => {
        const { items, value } = props;
        if (!includesValue(value, items)) {
            return new Error('Please provide a value that is in the items list');
        }

        return null;
    },
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool
};

Dropdown.defaultProps = {
    adornment: '',
    disabled: false,
    fullWidth: false,
    items: [],
    helpText: '',
    type: 'text',
    value: '',
    error: false
};

export default Dropdown;
