import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';

class OnOffSwitch extends React.Component {
    change() {
        const { onChange, propertyName, value } = this.props;
        onChange(propertyName, !value);
    }

    render() {
        const { value, label, disabled } = this.props;
        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={value}
                        onChange={() => this.change()}
                        value={value}
                        color="primary"
                        disabled={disabled}
                    />
                }
                label={label}
            />
        );
    }
}

export default OnOffSwitch;
