import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';

const styles = {
    textField: {
        width: "100%",
        margin: "0 auto"
    },
    label: {
        fontSize: 16,
        color: "#afaeae"
    },
    input: {
        fontSize: 16,
        fontWeight: "bold"
    },
};

class FormField extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
           
    }

    onChange(e) {
        const { onChange, propertyName } = this.props;

        this.state.value = e.target.value;
        if (onChange) {
            onChange(propertyName, e.target.value);
        }
    }

    render () {
        const { config, value, classes} = this.props;
        return ( 
            <div>
                <TextField
                    label={config.label}
                    id="margin-normal"
                    type={config.type}
                    value={value}
                    disabled={config.disabled}
                    className={classes.textField}
                    InputProps={{
                        className: classes.input,
                        shrink: true
                    }}
                    InputLabelProps={{
                         className: classes.label,
                         shrink: true
                    }}
                    onChange={e => this.onChange(e)}
                    helperText={config.required ? "Required" : ""}
                />
            </div>
        )
    }
}

export default withStyles(styles)(FormField)
