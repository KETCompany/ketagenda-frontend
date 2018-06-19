import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Button from './CustomButtons/Button.jsx';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import TextField from 'material-ui/TextField';

// import {
//   Delete,
//   Brush
// } from '@material-ui/icons';

import _ from 'lodash';

import ReservationsCalendar from './ReservationsCalendar';

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
    const { classes, kind, data, formInputs, handleChange, handleSave, dataLoaded } = this.props;
    
    if (dataLoaded === true) {
      return (
        <div className={classes.root}>
            {Object.keys(formInputs).map(key => {
              if(_.get(formInputs[key], 'type') === 'select'){
                const Value = data[key] ? (_.isObject(data[key]) ? _.get(data[key], '_id') : _.isArray(data[key]) ? _.get(_.first(data[key]), '_id') : '') : '';
                console.log(Value);
                return (
                  <div key={key}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor={`a${key}`}>{_.capitalize(key)}</InputLabel>
                    <Select
                      value={Value}
                      name={key}
                      onChange={handleChange}
                      input={<Input id={`a${key}`} />}
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
                  <div key={key}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor={`b${key}`}>{_.capitalize(key)}</InputLabel>
                      <Select
                        multiple
                        value={data[key] ? data[key].map((v) => _.isObject(v) ? v['_id'] : v) : []}
                        name={key}
                        onChange={handleChange}
                        renderValue={selected => (<div>None</div>)}
                        input={<Input id={`b${key}`} />}
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
                        const userid = _.isObject(v) ? v['_id'] : v;
                        const selectedUsers = formInputs[key]['options'].filter(i => i._id === userid )
                        return (<div>
                          {selectedUsers[0].name}
                        </div>)
                      }) : <div></div>}
                    </div>
                  </div>
                );
              } else if (_.get(formInputs[key], 'type') === 'calendar') {
                return (
                  <div key={key}>
                  <ReservationsCalendar
                    agendaItems={data[key] ? data[key].map(a => ({...a, start: new Date(a.start), end: new Date(a.end)})) : []}
                    handleSlotSelect={formInputs[key]['handleSlotSelect']}
                    handleSelectEvent={formInputs[key]['handleSelectEvent']}
                    />
                  </div>
                )
              } else {
                return (
                  <div key={key}>
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
            <Button size="small" onClick={handleSave} color="info">
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