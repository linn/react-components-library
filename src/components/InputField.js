import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

const styles = () => ({});

const hasValue = val => val || val === 0;
const getValue = val => (hasValue(val) ? val : '');

class InputField extends Component {
    change(e) {
        const { onChange, propertyName, type } = this.props;
        const { value } = e.target;

        let val = value;

        if (type === 'date') {
            val = value
                ? moment(value)
                      .utc()
                      .format()
                : '';
        }

        if (type === 'number') {
            val = hasValue(value) ? parseFloat(value) : null;
        }

        onChange(propertyName, val);
    }

    render() {
        const {
            adornment,
            classes,
            disabled,
            error,
            fullWidth,
            helperText,
            label,
            margin,
            maxLength,
            rows,
            name,
            placeholder,
            type,
            value
        } = this.props;

        return (
            <TextField
                className={classes.root}
                disabled={disabled}
                error={error}
                fullWidth={fullWidth}
                helperText={helperText}
                label={label}
                margin={margin}
                multiline={rows > 0}
                name={name}
                placeholder={placeholder}
                rows={rows}
                type={type}
                value={type === 'date' ? moment(value).format('YYYY-MM-DD') : getValue(value)}
                onChange={e => this.change(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    startAdornment: adornment ? (
                        <InputAdornment position="start">{adornment}</InputAdornment>
                    ) : null,
                    inputProps: {
                        maxLength
                    }
                }}
                onInput={e => {
                    if (type === 'number' && maxLength) {
                        e.target.value = Math.max(0, parseInt(e.target.value, 10))
                            .toString()
                            .slice(0, maxLength);
                    }
                }}
                variant="outlined"
            />
        );
    }
}

InputField.propTypes = {
    adornment: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    classes: PropTypes.shape({}).isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    fullWidth: PropTypes.bool,
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    margin: PropTypes.string,
    maxLength: PropTypes.number,
    rows: PropTypes.number,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    propertyName: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    onChange: PropTypes.func
};

InputField.defaultProps = {
    adornment: '',
    disabled: false,
    error: false,
    fullWidth: false,
    helperText: '',
    margin: 'normal',
    maxLength: null,
    rows: null,
    name: '',
    placeholder: '',
    propertyName: '',
    type: 'text',
    value: '',
    onChange: null
};

export default withStyles(styles)(InputField);
