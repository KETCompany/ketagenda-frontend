import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { DatePicker, TimePicker, DateTimePicker } from 'material-ui-pickers';
import TextField from 'material-ui/TextField';

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
    // marginTop: theme.spacing.unit * 3,
    // width: 1200,
    margin: '0 auto', 
  },
});

class ReservationForm extends React.Component {
  render() {
    const {
      handleNameChange,
      handleDescChange,
      handleDateChange,
      handleStartTimeChange,
      handleEndTimeChange,
      onHandleNext,
      onSubmit,
      classes,
      officeHours,
      booking: {
        name,
        start,
        end
      }
    } = this.props;

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
            
          <div className={classes.column}>
            <DatePicker
              keyboard
              disablePast={true}
              autoOk={true}
              value={start}
              format="DD-MM-YYYY"
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
              onChange={handleDateChange}
            />
          </div>
          <div className={classes.column}>
            <TimePicker
              keyboard
              ampm={false}
              autoOk={true}
              disablePast={true}
              value={start}
              format="HH:mm"
              mask={[/\d/, /\d/, ':', /\d/, /\d/]}
              onChange={handleStartTimeChange}
              />
              <TimePicker
                keyboard
                ampm={false}
                autoOk={true}
                disablePast={true}
                value={end}
                format="HH:mm"
                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                onChange={handleEndTimeChange}
              />
            </div>
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
