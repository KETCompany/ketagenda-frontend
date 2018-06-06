import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import _ from 'lodash';

import ReservationForm from '../components/ReservationForm';

import * as RoomAPI from '../api/RoomAPI';

const moment = require('moment');

moment.locale('nl');

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 15,
  },
});

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

  validateDates = () => {
    return true;
  }

  checkTimeDiff = (start, end) => moment(start).isBefore(end);

  // handleChange = (event) => {
  //   this.setState({ value: event.target.value });
  // }

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
    if (!this.checkTimeDiff(time, this.state.end)) {
      console.log(typeof time);
    }
    this.setState({ booking: { ...this.state.booking, start: moment(this.state.booking.start).minute(time.getMinutes()).hour(time.getHours()) } });
  }

  handleEndTimeChange = (time) => {
    if (!this.checkTimeDiff(this.state.start, time)) {
      console.log(time);
    }
    this.setState({ booking: { ...this.state.booking, end: moment(this.state.booking.end).minute(time.getMinutes()).hour(time.getHours()) } });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(
      { booking: { ...this.state.booking, start: Date(this.state.start), end: Date(this.state.end) } },
      () => {
        if (this.validateDates()) {
          RoomAPI.post(this.state);
        }
      },
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
        <Typography variant="display1" gutterBottom>
          KET-Agenda
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Key for electronic technolgies in agenda's
        </Typography>
        <ReservationForm
          onSubmit={this.handleSubmit}
          handleNameChange={this.handleNameChange}
          handleDateChange={this.handleDateChange}
          handleStartTimeChange={this.handleStartTimeChange}
          handleEndTimeChange={this.handleEndTimeChange}
          booking={this.state.booking}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ReservationContainer);
