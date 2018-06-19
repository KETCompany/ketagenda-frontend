import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import ReservationForm from '../components/ReservationForm';
import ReservationsCalendar from '../components/ReservationsCalendar';
import DataForm from '../components/DataForm';
import * as RoomAPI from '../api/RoomAPI';
import EventAPI from '../api/EventAPI';
import _ from 'lodash';

const moment = require('moment');

moment.locale('nl');

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
});

class ReservationContainer extends Component {
  constructor() {
    super();
    this.state = {
      agendaItems: [],
      dataLoaded: false,
      booking: {
        name: '',
        description: '',
        owner: '',
        groups: [],
        room: '',
        bookings: []
      },
      formInputs: {
        owner: {
          type: 'select',
          options: [],
        },
        groups: {
          type: 'multiSelect',
          options: [],
        },
        room: {
          type: 'select',
          options: [],
        },
      },
      activeStep: 0,
    };
    this.loadData();
  }

  loadData = async () => {
    const { formInputs } = this.state;

    const a = await EventAPI.initForm();

    const populatedFormInputs = this.populateFormInputs(formInputs, a);
    this.setState({ dataLoaded: true, formInputs: populatedFormInputs });
  }

  populateFormInputs = (formInputs, entry) => {
    Object.entries(entry).forEach(([key, values]) => {
      if (_.isArray(values)) {
        if (formInputs[key]) {
          formInputs[key].options = values;
        } else {
          formInputs[key] = {
            options: values,
            type: 'select',
          }
        }
      } else {
        formInputs[key] = values;
      }
    })

    return formInputs;
  }

  validateDate = () => true;

  checkTimeDiff = (start, end) => moment(end).isAfter(start);

  handleChange = (e) => {
    this.setState({ booking: { ...this.state
      .booking, [e.target.name]: e.target.value } });
  }
  
  handleNameChange = (event) => {
    this.setState({ booking: { ...this.state.booking, name: event.target.value } });
  }
  
  handleSelectEvent = (slotInfo) => {
    this.setState({
      booking: {
        ...this.state.booking,
        bookings:
        [
          ...this.state.booking.bookings, {
          start: moment(slotInfo.start).unix(),
          end: moment(slotInfo.end).unix(),
          room: this.state.booking.room,
        }]
      }
    });
  }

  handleSlotSelect = event => {
    this.setState({
      booking: {
        ...this.state.booking,
        bookings:
        [
          ...this.state.booking.bookings.filter(booking => booking.start !== moment(event.start).unix() && booking.end !== moment(event.end).unix())
        ]
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    return new Promise((resolve) => {
      resolve(this.validateDate());
    })
      .then(() => EventAPI.post(this.state.booking)).catch(error => {
        (error['data'] ? alert(error['data']) : console.log(error))
      });
  }

  render() {
    const { classes } = this.props;
    const {
      booking, formInputs, bookings
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
          dataLoaded={this.state.dataLoaded}
          data={this.state.booking}
          formInputs={formInputs}
          handleChange={this.handleChange}
          handleSave={this.handleSubmit}
          kind={'event'}
        />
        <ReservationsCalendar
          agendaItems={booking.bookings.map(evt => { return { start: new Date(evt.start*1000), end: new Date(evt.end*1000) } } )}
          handleSlotSelect={this.handleSlotSelect}
          handleSelectEvent={this.handleSelectEvent}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ReservationContainer);
