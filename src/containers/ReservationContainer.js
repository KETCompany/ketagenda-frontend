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

  // handleChange = (event) => {
  //   this.setState({ value: event.target.value });
  // }

  handleNameChange = (event) => {
    this.setState({ booking: { ...this.state.booking, name: event.target.value } });
  }

  handleStartDateChange = (date) => {
    this.setState({ booking: { ...this.state.booking, start: moment(date) } });
  }

  handleEndDateChange = (date) => {
    this.setState({ booking: { ...this.state.booking, end: moment(date) } });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(
      { booking: { ...this.state.booking, start: moment(this.state.start).toDate(), end: moment(this.state.end).toDate() } },
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
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
          booking={this.state.booking}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ReservationContainer);
