import React from 'react';
import { Grid } from 'material-ui';
import { AddAlert } from '@material-ui/icons';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import QRCode from 'qrcode.react';

import * as RoomAPI from '../api/RoomAPI';

import ReservationsCalendar from '../components/ReservationsCalendar';
import ReservationForm from '../components/ReservationForm';

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

class RoomDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agendaItems: [],
      room: null,
      value: 0,
      reservation: {
        name: '',
        description: '',
        owner: '5b1dc950ce0c3b20c5f9d005',
        subscribers: [],
        start: moment().toDate(),
        end: moment().toDate(),
      },
    };
    this.getRoom(props.match.params.id);
  }

  async getRoom(id) {
    const room = await RoomAPI.get(id, true);
    if (room && room.bookings) {
      const roomBookings = room.bookings.map(booking => ({
        ...booking,
        start: new Date(booking.start),
        end: new Date(booking.end),
        roomId: id,
      }));
      this.setState({ room: { ...room, bookings: roomBookings } });
    } else {
      this.getRoom(id);
    }
  }

  validateDate = () => true;

  checkTimeDiff = (start, end) => moment(end).isAfter(start);

  handleNameChange = (event) => {
    this.setState({ reservation: { ...this.state.reservation, name: event.target.value } });
  }

  handleDescChange = (event) => {
    this.setState({ reservation: { ...this.state.reservation, description: event.target.value } });
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

    RoomAPI.post(reservation).then((res) => {
      alert("success");
      this.setState({
        agendaItems: [],
      });
      this.getRoom(this.state.room.id);
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderDetails() {
    const { room } = this.state;
    return (
      <ItemGrid xs={12} sm={12} md={12}>Item One
        <QRCode
        value={room._id}
        size='128'
      />
      </ItemGrid>
    );
  }

  renderReservation() {
    const { room, agendaItems } = this.state;

    return (
    <ItemGrid xs={12} sm={12} md={12}>
      <h1>Bookings</h1>
      <br />
      <ReservationForm
        onSubmit={this.handleSubmit}
        handleNameChange={this.handleNameChange}
        handleDescChange={this.handleDescChange}
        handleDateChange={this.handleDateChange}
        handleStartTimeChange={this.handleStartTimeChange}
        handleEndTimeChange={this.handleEndTimeChange}
        booking={this.state.reservation}
        officeHours={officeHours}
      />
      <ReservationsCalendar
      agendaItems={[...room.bookings, ...agendaItems]}
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
    const { room, value } = this.state;
    if (room === null) {
      return (<div>Room not found</div>);
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
          cardTitle={`Room: ${room.name}`}
          cardSubtitle={
            <P>
              {room.type}
            </P>
          }
          content={
            <div>
              <Grid container>
                {value === 0 && this.renderDetails()}
                {value === 1 && this.renderReservation()}
                {value === 2 && <ItemGrid xs={12} sm={12} md={12}>Item Three</ItemGrid>}
                <ItemGrid xs={12} sm={12} md={6}>
                </ItemGrid>
              </Grid>
              <br />
              <br />
              <Grid container justify="center">
                <ItemGrid xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
                </ItemGrid>
              </Grid>
              <Grid container justify="center">
                <ItemGrid xs={12} sm={12} md={10} lg={8}>
                  <Grid container>
                  </Grid>
                </ItemGrid>
              </Grid>
              <Grid container justify={"center"}>
                <ItemGrid xs={12} sm={12} md={10} lg={8}>
                  <Grid container>
                  </Grid>
                </ItemGrid>
              </Grid>
            </div>
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(RoomDetailContainer);
