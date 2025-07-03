import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckboxWithLabel = ({
  checked = false,
  color = 'primary',
  label = '',
  onChange,
  sx = {}
}) => (
  <FormControlLabel
    label={label}
    sx={{
      width: '100%',
      fontSize: 14,
      ...sx
    }}
    control={<Checkbox checked={checked} onChange={onChange} color={color} />}
  />
);

export default CheckboxWithLabel;
