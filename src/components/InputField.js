import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

const styles = () => ({});

class InputField extends Component {
    change(e, type) {
        const { onChange, propertyName } = this.props;
        const { value } = e.target;

        let val = value;

        if (type === 'date') {
            val = moment(value)
                .utc()
                .format();
        }

        if (type === 'number') {
            val = value || value === 0 ? parseFloat(value) : '';
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
            multiline,
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
                multiline={multiline}
                name={name}
                placeholder={placeholder}
                rows={multiline ? 4 : ''}
                type={type}
                value={type === 'date' ? moment(value).format('YYYY-MM-DD') : value || ' '}
                onChange={e => this.change(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={
                    adornment
                        ? {
                              startAdornment: (
                                  <InputAdornment position="start">{adornment}</InputAdornment>
                              )
                          }
                        : {}
                }
                variant="outlined"
            />
        );
    }
}

InputField.propTypes = {
    adornment: PropTypes.string,
    classes: PropTypes.shape({}).isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    fullWidth: PropTypes.bool,
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    margin: PropTypes.string,
    multiline: PropTypes.bool,
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
    multiline: false,
    name: '',
    placeholder: '',
    propertyName: '',
    type: 'text',
    value: '',
    onChange: null
};

export default withStyles(styles)(InputField);
