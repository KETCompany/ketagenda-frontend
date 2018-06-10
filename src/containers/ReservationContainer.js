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
    // paddingTop: theme.spacing.unit * 15,
  },
});


const officeHours = [{from: '9:00', to: '12:00'}, {from: '13:00', to: '17:00'}]

class ReservationContainer extends Component {
  constructor() {
    super();
    this.state = {
      agendaItems: [],
      booking: {
        name: '',
        group: '',
        tutor: '',
        start: moment().toDate(),
        end: moment().toDate(),
        booking: true,
      },
      activeStep: 0,
      roomId: '5afc2c4f0a876e4deb9656c6',
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
        start: moment(this.state.booking.start).date(date.getDate()).month(date.getMonth()).toDate(),
        end: moment(this.state.booking.end).date(date.getDate()).month(date.getMonth()).toDate(),
      },
    });
  }

  handleStartTimeChange = (time) => {
    // if (this.checkTimeDiff(time, this.state.booking.end)) {
    //   this.handleEndTimeChange(time);
    // }
    this.setState({ booking: { ...this.state.booking, start: moment(this.state.booking.start).minute(time.getMinutes()).hour(time.getHours()).toDate() } });
  }

  handleEndTimeChange = (time) => {
    // if (this.checkTimeDiff(this.state.booking.start, time)) {
    //   console.log();
    //   this.handleStartTimeChange(time);
    // }
    this.setState({ booking: { ...this.state.booking, end: moment(this.state.booking.end).minute(time.getMinutes()).hour(time.getHours()).toDate() } });
  }

  handleSelectEvent = (slotInfo) => {
    this.handleDateChange(slotInfo.start);
    this.handleStartTimeChange(slotInfo.start);
    this.handleEndTimeChange(slotInfo.end);
    this.setState({
      agendaItems: [...this.state.agendaItems.filter(item => item.booking === false), this.state.booking],
    });
    // alert(
    //   `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
    //     `\nend: ${slotInfo.end.toLocaleString()}` +
    //     `\naction: ${slotInfo.action}`
    // )
  }

  handleSlotSelect = event => alert(event.title)

  handleSubmit = (event) => {
    event.preventDefault();
    return new Promise((resolve, reject) => {
      this.validateDate();
    }).then(() => RoomAPI.post(this.state)).catch(error => console.log);
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
        <ReservationsCalendar
          agendaItems={this.state.agendaItems}
          handleSlotSelect={this.handleSlotSelect}
          handleSelectEvent={this.handleSelectEvent}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ReservationContainer);
