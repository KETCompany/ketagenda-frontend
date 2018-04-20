import React from 'react';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Switch from 'material-ui/Switch';

const SwitchFilters = ({ text, filters, filtersDisabled = filters, handleChange }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{text}</FormLabel>
      <FormGroup>
        {Object.keys(filters).map(filter => (
          <FormControlLabel
            key={filter}
            control={
              <Switch
                checked={filters[filter]}
                onChange={handleChange(filter)}
                value={filter}
                disabled={Object.keys(filtersDisabled).indexOf(filter) < 0}
              />
            }
            label={filter}
          />
        ))}
      </FormGroup>
      <FormHelperText></FormHelperText>
    </FormControl>
  );
};

export default SwitchFilters;
