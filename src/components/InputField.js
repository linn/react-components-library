import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

const styles = () => ({});

function InputField(props) {
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
        value,
        onChange
    } = props;

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
            value={type === 'date' ? moment(value).format('YYYY-MM-DD') : value}
            onChange={onChange}
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
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

InputField.defaultProps = {
    adornment: '',
    disabled: false,
    error: false,
    fullWidth: false,
    helperText: '',
    margin: 'normal',
    multiline: false,
    placeholder: '',
    type: 'text'
};

export default withStyles(styles)(InputField);
