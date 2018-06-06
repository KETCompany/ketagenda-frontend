import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import _ from 'lodash';

import ReservationForm from '../components/ReservationForm';
import ReservationsCalendar from '../components/ReservationsCalendar';

import * as RoomAPI from '../api/RoomAPI';

const moment = require('moment');

moment.locale('nl');

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 15,
  },
});


const officeHours = [{from: '9:00', to: '12:00'}, {from: '13:00', to: '17:00'}]

class ReservationContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      roomId: '5afc2c4f0a876e4deb9656c6',
      booking: {
        name: '',
        group: '',
        tutor: '',
        start: moment(),
        end: moment(),
      },
    };
  }

  validateDate = () => true;

  checkTimeDiff = (start, end) => moment(end).isAfter(start);

  handleNameChange = (event) => {
    this.setState({ booking: { ...this.state.booking, name: event.target.value } });
  }

  handleDateChange = (date) => {
    this.setState({
      booking: {
        ...this.state.booking,
        start: moment(this.state.booking.start).date(date.getDate()).month(date.getMonth()),
        end: moment(this.state.booking.end).date(date.getDate()).month(date.getMonth()),
      },
    });
  }

  handleStartTimeChange = (time) => {
    if (this.checkTimeDiff(time, this.state.booking.end)) {
      this.handleEndTimeChange(time);
    }
    this.setState({ booking: { ...this.state.booking, start: moment(this.state.booking.start).minute(time.getMinutes()).hour(time.getHours()) } });
  }

  handleEndTimeChange = (time) => {
    if (this.checkTimeDiff(this.state.booking.start, time)) {
      console.log();
      this.handleStartTimeChange(time);
    }
    this.setState({ booking: { ...this.state.booking, end: moment(this.state.booking.end).minute(time.getMinutes()).hour(time.getHours()) } });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(
      { booking: { ...this.state.booking, start: Date(this.state.start), end: Date(this.state.end) } },
      () => (this.validateDate() ? RoomAPI.post(this.state) : ''),
    );
  }

  render() {
    const { classes } = this.props;
    const {
      search, filters, filtersDisabled, rooms, noRooms, loading,
      type, selectedDate, selectedTime, qrDialogOpen, qrCodeValue,
    } = this.state;

    return (
      <div className={classes.root}>
        <ReservationForm
          onSubmit={this.handleSubmit}
          handleNameChange={this.handleNameChange}
          handleDateChange={this.handleDateChange}
          handleStartTimeChange={this.handleStartTimeChange}
          handleEndTimeChange={this.handleEndTimeChange}
          booking={this.state.booking}
          officeHours={officeHours}
        />
        <ReservationsCalendar />
      </div>
    );
  }
}

export default withStyles(styles)(ReservationContainer);
