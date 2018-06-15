import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Button from './CustomButtons/Button.jsx';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import TextField from 'material-ui/TextField';

import {
  Delete,
  Brush
} from '@material-ui/icons';

import _ from 'lodash';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  formControl: {
    minWidth: 185,
  },
});

class DataForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, data, formInputs, handleChange, handleSave, dataLoaded } = this.props;

    if (dataLoaded === true) {
      return (
        <div className={classes.root}>
            {Object.keys(formInputs).map(key => {
              if(_.get(formInputs[key], 'type') == 'select'){
                return (
                  <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">{_.capitalize(key)}</InputLabel>
                    <Select
                      value={data[key]}
                      name={key}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {formInputs[key]['options'].map(role => (
                        <MenuItem
                          key={role}
                          value={role}
                        >
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  </div>
                );
              } else if (_.get(formInputs[key], 'type') == 'multiSelect') {
                return (
                  <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-simple">{_.capitalize(key)}</InputLabel>
                      <Select
                        multiple
                        value={data[key].map((v) => _.isObject(v) ? v['_id'] : v) || []}
                        name={key}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {formInputs[key]['options'].map(({ name, _id }) => (
                          <MenuItem
                            key={_id}
                            value={_id}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                );
              } else {
                return (
                  <div>
                    <TextField
                      defaultValue={data[key]}
                      name={key}
                      label={_.capitalize(key)}
                      className={classes.textField}
                      margin="normal"
                      onChange={handleChange}
                    />
                  </div>
                );
              }
            })}
            <Button size="small" onClick={handleSave} color="secondary">
              Submit
            </Button>
        </div>
      );
    } else {
      return (
        <div>{'No data found'}</div>
      )
    }
  }
}

DataForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataForm);