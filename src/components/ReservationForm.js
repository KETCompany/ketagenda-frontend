import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { DatePicker, TimePicker, DateTimePicker } from 'material-ui-pickers';
import TextField from 'material-ui/TextField';

import _ from 'lodash';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';

import withRoot from '../withRoot';

const moment = require('moment');

moment.locale('nl');

const styles = theme => ({
  search: {
    width: '100%',
  },
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    margin: '0 auto',
  },
  formControl: {
    minWidth: 185,
  },
  select: {
    minWidth: 150,
    marginRight: 10,
  },
});

class ReservationForm extends React.Component {
  render(props) {
    const {
      handleNameChange,
      handleDescChange,
      handleDateChange,
      handleChange,
      handleStartTimeChange,
      handleEndTimeChange,
      onHandleNext,
      onSubmit,
      classes,
      officeHours,
      data,
      booking: {
        name,
        start,
        end
      },
      formInputs
    } = this.props;
    const kind = 'event';

    return (
      <div className={classes.root}>        
        <Paper className={classes.paper} elevation={4}>
          <Toolbar>
          <div className={classes.column}>
            <TextField
              id="search"
              label="Name"
              className={classes.textField}
              margin="normal"
              onChange={handleNameChange}
            />
            </div>
            
            {Object.keys(formInputs).map(key => {
              if(_.get(formInputs[key], 'type') === 'select'){
                return (
                  <div key={key}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor={`a${key}`}>{_.capitalize(key)}</InputLabel>
                    <Select
                      value={data[key] ? data[key] : ''}
                      name={key}
                      onChange={handleChange}
                      input={<Input id={`a${key}`} />}
                      className={classes.select}
                    >
                      <MenuItem value="">
                        <em>Select {kind}</em>
                      </MenuItem>
                      {formInputs[key]['options'].map(({ _id, name }) => (
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
              } else if (_.get(formInputs[key], 'type') === 'multiSelect') {
                return (
                  <div key={key} className={classes.root}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor={`b${key}`}>{_.capitalize(key)}</InputLabel>
                      <Select
                        multiple
                        value={data[key] ? data[key].map((v) => _.isObject(v) ? v['_id'] : v) : []}
                        name={key}
                        onChange={handleChange}
                        renderValue={selected => (<div>None</div>)}
                        input={<Input id={`b${key}`} />}
                        className={classes.select}
                      >
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
                    <div>
                      {data[key] ? data[key].map(v => {
                        const Uid = _.isObject(v) ? v['_id'] : v;
                        const selected = formInputs[key]['options'].filter(i => i._id === Uid )
                        return (<div>
                          {selected[0].name}
                        </div>)
                      }) : <div></div>}
                    </div>
                  </div>
                );
              }
            })}
          </Toolbar>
          <Toolbar>
            <TextField
              id="search"
              multiline
              rows="4"
              label="Description"
              className={classes.textField}
              margin="normal"
              onChange={handleDescChange}
            />
          </Toolbar>
          <Button size="small" onClick={onSubmit} color="primary">
            Submit
          </Button>
        </Paper>
      </div>
    );
  }
}

ReservationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ReservationForm));
