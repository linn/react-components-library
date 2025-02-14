import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function OnOffSwitch({ onChange, propertyName, value = false, label, disabled }) {
    const change = () => {
        onChange(propertyName, !value);
    };

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={value}
                    onChange={change}
                    value={value}
                    color="primary"
                    disabled={disabled}
                />
            }
            label={label}
        />
    );
}

export default OnOffSwitch;
