import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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

OnOffSwitch.propTypes = {
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    propertyName: PropTypes.string.isRequired
};

OnOffSwitch.defaultProps = {
    value: false,
    disabled: false,
    label: ''
};

export default OnOffSwitch;
