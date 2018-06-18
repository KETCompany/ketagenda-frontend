import React from 'react';
import { Grid } from 'material-ui';
import Card from '@material-ui/core/Card';
import { withStyles } from 'material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import QRCode from 'qrcode.react';

import * as RoomAPI from '../api/RoomAPI';
import * as EventAPI from '../api/EventAPI';

import ReservationsCalendar from '../components/ReservationsCalendar';
import ReservationForm from '../components/ReservationForm';

import _ from 'lodash';

import {
  RegularCard,
  A,
  P,
  Small,
  Button,
  SnackbarContent,
  Snackbar,
  ItemGrid
} from '../components';

const moment = require('moment');

const officeHours = [{ from: '9:00', to: '12:00' }, { from: '13:00', to: '17:00' }];

const styles = theme => ({

});

const Event = ({ event: booking }) => {
  const { event } = booking;
  if (event && event.name) {
    return (
      <span>
        <strong>{event.name}</strong>
        {event.desc && ':  ' + event.desc}
      </span>
    )
  } else {
    return (<span></span>);
  }
}

const eventPropGetter = (event) => {
  if(event._id) {
    return { style: {
      background: '#333',
    }
  }
  }

  return {};
}

const EventAgenda = ({ event }) => {
  return (
    <span>
      <em style={{ color: 'red' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  )
}

class EventDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageLoaded: false,
      event: null,
      agendaItems: [],
      value: 0,
      reservation: {
        name: '',
        description: '',
        subscribers: [],
        start: moment().toDate(),
        end: moment().toDate(),
      },
    };
    this.getEvent(this.props.match.params.id)
      .then(() => this.setState({ pageLoaded: true }));
  }

  getEvent = async (id) => {
    const event = await EventAPI.get(id, true);
    if (event && event.bookings) {
      const eventBookings = event.bookings.map(booking => ({
        ...booking,
        start: new Date(booking.start),
        end: new Date(booking.end),
        eventId: id,
      }));
      this.setState({ event: { ...event, bookings: eventBookings } });
      console.log(event);
    }
  }

  checkTimeDiff = (start, end) => moment(end).isAfter(start);

  handleFormFieldChange = (event) => {
    this.setState({ reservation: { ...this.state.reservation, [event.target.name]: event.target.value } });
  }

  handleDateChange = (date) => {
    this.setState({
      reservation: {
        ...this.state.reservation,
        start: moment(this.state.reservation.start).date(date.getDate()).month(date.getMonth()).toDate(),
        end: moment(this.state.reservation.end).date(date.getDate()).month(date.getMonth()).toDate(),
      },
    });
  }

  handleStartTimeChange = (time) => {
    this.setState({ reservation: { ...this.state.reservation, start: moment(this.state.reservation.start).minute(time.getMinutes()).hour(time.getHours()).toDate() } });
  }

  handleEndTimeChange = (time) => {
    this.setState({ reservation: { ...this.state.reservation, end: moment(this.state.reservation.end).minute(time.getMinutes()).hour(time.getHours()).toDate() } });
  }

  handleSelectEvent = (slotInfo) => {
    this.handleDateChange(slotInfo.start);
    this.handleStartTimeChange(slotInfo.start);
    this.handleEndTimeChange(slotInfo.end);
    this.setState({
      agendaItems: [...this.state.agendaItems.filter(item => item.reservation === false), this.state.reservation],
    });
  }

  handleSlotSelect = event => alert(event.title)

  handleSubmit = (event) => {
    event.preventDefault();

    const reservation = {
      ...this.state.reservation,
      bookings: [{
        start: moment(this.state.reservation.start).unix(),
        end: moment(this.state.reservation.end).unix(),
        room: this.state.room.id,
      }],
    };

    EventAPI.post(reservation).then((res) => {
      this.setState({
        agendaItems: [],
      });
      this.getEvent(this.state.event._id);
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleJoin = (e) => {
    EventAPI.subscribe(this.state.event._id)
      .then(res => console.log(res));
  }

  renderLoad = () => (
    <div style={{position: 'relative'}}>     
      <CircularProgress
        size={40}
        left={-20}
        top={10}
        status={'loading'}
        style={{marginLeft: '50%'}}
        color="secondary" />
    </div>
  )

  renderDetails() {
    return (
      <div>
        <Button onClick={this.handleJoin}>Join</Button>
      </div>
    );
  }

  renderReservation() {
    const { event, agendaItems } = this.state;

    return (
    <ItemGrid xs={12} sm={12} md={12}>
      <h1>Bookings</h1>
      <br />
      <ReservationForm
        onSubmit={this.handleSubmit}
        handleNameChange={this.handleFormFieldChange}
        handleDescChange={this.handleFormFieldChange}
        handleDateChange={this.handleDateChange}
        handleStartTimeChange={this.handleStartTimeChange}
        handleEndTimeChange={this.handleEndTimeChange}
        booking={this.state.reservation}
        officeHours={officeHours}
      />
      <ReservationsCalendar
        agendaItems={[...event.bookings, ...agendaItems]}
        handleSlotSelect={this.handleSlotSelect}
        handleSelectEvent={this.handleSelectEvent}
        eventPropGetter={this.eventPropGetter}
        Event={Event}
        EventAgenda={EventAgenda}
      />
    </ItemGrid>
    );
  }

  render() {
    const { event, value, pageLoaded } = this.state;
    if (pageLoaded === false) {
      this.renderLoad();
    }

    if (event === null) {
      return (
        <Card>
          No Event found
        </Card>
      );
    }

    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Details" />
            <Tab label="Reservations" />
          </Tabs>
        </AppBar>
        <RegularCard
          headerColor="orange"
          cardTitle={`Event: ${event.name}`}
          cardSubtitle={
            <P>
              {event.type}
            </P>
          }
          content={
            <div>
              <Grid container>
                {value === 0 && this.renderDetails()}
                {value === 1 && this.renderReservation()}
              </Grid>
            </div>
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(EventDetailContainer);
