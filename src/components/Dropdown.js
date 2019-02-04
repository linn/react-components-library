import { TextField } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const hasValue = val => val || val === 0;
const getValue = val => (hasValue(val) ? val : '');

class Dropdown extends Component {
    change(e) {
        const { onChange, propertyName, type } = this.props;
        const { value } = e.target;

        let val = value;

        if (type === 'number') {
            val = hasValue(value) ? parseFloat(value) : null;
        }
        val = hasValue(value) ? value : '';

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
            type
        } = this.props;
        return (
            <TextField
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
                {items.map(item => (
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
    items: PropTypes.arrayOf(PropTypes.string),
    propertyName: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

Dropdown.defaultProps = {
    adornment: '',
    disabled: false,
    fullWidth: false,
    propertyName: '',
    items: [],
    helpText: '',
    type: 'text',
    value: ''
};

export default Dropdown;
