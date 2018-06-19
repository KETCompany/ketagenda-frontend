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

class EventDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageLoaded: false,
      event: null,
      agendaItems: [],
      value: 0,
    };
    this.getEvent(this.props.match.params.id)
      .then(() => this.setState({ pageLoaded: true }));
  }

  getEvent = async (id) => {
    const event = await EventAPI.get(id, true);
    if (event) {
      let eventBookings = [];
      if (event.bookings) {
        eventBookings = event.bookings.map(booking => ({
          ...booking,
          start: new Date(booking.start),
          end: new Date(booking.end),
          eventId: id,
        }));
      }
      this.setState({ event: { ...event, bookings: eventBookings } });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleJoin = (e) => {
    EventAPI.subscribe(this.state.event._id, true)
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
      <ReservationsCalendar
        agendaItems={[...event.bookings, ...agendaItems]}
      />
    </ItemGrid>
    );
  }
  
  handleBack = () => this.props.history.goBack();

  render() {
    const { event, value, pageLoaded } = this.state;
    const { classes } = this.props;
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
          cardTitle={(<div>Event: {event.name} <Button onClick={this.handleBack} className={classes.buttonRight}>Back</Button></div>)}
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
