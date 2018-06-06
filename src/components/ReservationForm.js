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
    marginTop: theme.spacing.unit * 3,
    width: 800,
    margin: '0 auto', 
  },
});

class ReservationForm extends React.Component {
  render() {
    const {
      handleNameChange,
      handleStartDateChange,
      handleEndDateChange,
      onHandleNext,
      onSubmit,
      classes,
      booking
    } = this.props;
    
    const {
      name,
      start,
      end,
    } = booking;

    return (
      <div className={classes.root}>        
        <Paper className={classes.paper} elevation={4}>
          <form onSubmit={onSubmit}>
          <Toolbar>
            <div className={classes.column}>
              <TextField
                id="search"
                label="Reservation name"
                className={classes.textField}
                margin="normal"
                onChange={handleNameChange}
              />
            </div>
            </Toolbar>
            <Toolbar>
            <div className={classes.column}>
              <DateTimePicker
                ampm={false}
                disablePast={true}
                showTabs={false}
                value={start}
                format="DD-MM-YYYY HH:mm"
                animateYearScrolling={false}
                openToYearSelection={false}
                disableYearSelection={true}
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]}
                onChange={handleStartDateChange}
              />
            </div>
            </Toolbar>
            <Toolbar>
            <div className={classes.column}>
              <DateTimePicker
                  openTo="hour"
                  ampm={false}
                  disablePast={true}
                  value={end}
                  minDate={start}
                  format="DD-MM-YYYY HH:mm"
                  animateYearScrolling={false}
                  openToYearSelection={false}
                  disableYearSelection={true}
                  mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]}
                  onChange={handleEndDateChange}
                />
              </div>
            </Toolbar>
            <Button size="small" onClick={onSubmit} color="primary">
              Submit
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

ReservationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ReservationForm));
