import React from 'react';
import { Grid } from 'material-ui';
import { AddAlert } from '@material-ui/icons';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

const EventAgenda = ({ event }) => {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  )
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

const customDayPropGetter = (date) => {
  if (date.getDate() === 7 || date.getDate() === 15) {
    return {
      className: 'special-day',
      style: {
        border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
      },
    };
  }

  return {};
};

const customSlotPropGetter = (date) => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day',
    }
  else return {}
}

class RoomDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agendaItems: [],
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      room: null,
      value: 0,
      booking: {
        name: '',
        group: '',
        tutor: '',
        start: moment().toDate(),
        end: moment().toDate(),
        booking: true,
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
      }));
      this.setState({ room: { ...room, bookings: roomBookings } });
    } else {
      this.getRoom(id);
    }
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
    this.setState({ booking: { ...this.state.booking, start: moment(this.state.booking.start).minute(time.getMinutes()).hour(time.getHours()).toDate() } });
  }

  handleEndTimeChange = (time) => {
    this.setState({ booking: { ...this.state.booking, end: moment(this.state.booking.end).minute(time.getMinutes()).hour(time.getHours()).toDate() } });
  }

  handleSelectEvent = (slotInfo) => {
    this.handleDateChange(slotInfo.start);
    this.handleStartTimeChange(slotInfo.start);
    this.handleEndTimeChange(slotInfo.end);
    this.setState({
      agendaItems: [...this.state.agendaItems.filter(item => item.booking === false), this.state.booking],
    });
    
  }

  handleSlotSelect = event => alert(event.title)

  handleSubmit = (event) => {
    event.preventDefault();
    RoomAPI.post(this.state);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };


  render() {
    const { room, value, agendaItems } = this.state;
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
          cardTitle={`Room: ${room.name}`}
          cardSubtitle={
            <P>
              {room.type}
            </P>
          }
          content={
            <div>
              <Grid container>
                
              

                {value === 0 && <ItemGrid xs={12} sm={12} md={12}>Item Two</ItemGrid>}
                {value === 1 &&
                  <ItemGrid xs={12} sm={12} md={12}>
                    <h1>Bookings</h1>
                    <br />
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
                    agendaItems={[...room.bookings, ...agendaItems]}
                      handleSlotSelect={this.handleSlotSelect}
                      handleSelectEvent={this.handleSelectEvent}
                      dayPropGetter={customDayPropGetter}
                      slotPropGetter={customSlotPropGetter}
                      eventPropGetter={eventPropGetter}
                      Event={Event}
                      EventAgenda={EventAgenda}
                    />

                  </ItemGrid>
                }
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
