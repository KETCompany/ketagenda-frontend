import React from 'react';
import { Grid } from 'material-ui';
import Card from '@material-ui/core/Card';
import { withStyles } from 'material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import QRCode from 'qrcode.react';

import * as GroupAPI from '../api/GroupAPI';

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

class GroupDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageLoaded: false,
      group: null,
      agendaItems: [],
      value: 0
    };
    this.getGroup(this.props.match.params.id)
      .then(() => this.setState({ pageLoaded: true }));
  }

  getGroup = async (id) => {
    const group = await GroupAPI.get(id, true);
    if (group) {
      let groupBookings = [];
      if (group.bookings) {
        groupBookings = group.bookings.map(booking => ({
          ...booking,
          start: new Date(booking.start),
          end: new Date(booking.end),
          groupId: id,
        }));
      }
      console.log(group);
      this.setState({ group: { ...group, bookings: groupBookings } });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSlotSelect = booking =>
    this.props.history.push(`/event/${booking.event._id}`)

  handleJoin = (e) => {
    GroupAPI.subscribe(this.state.group._id, true)
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
    const { group, agendaItems } = this.state;

    return (
    <ItemGrid xs={12} sm={12} md={12}>
      <h1>Bookings</h1>
      <br />
      <ReservationsCalendar
        agendaItems={[...group.bookings, ...agendaItems]}
        handleSlotSelect={this.handleSlotSelect}
        eventPropGetter={this.eventPropGetter}
        Event={Event}
      />
    </ItemGrid>
    );
  }

  render() {
    const { group, value, pageLoaded } = this.state;
    if (pageLoaded === false) {
      this.renderLoad();
    }

    if (group === null) {
      return (
        <Card>
          No Group found
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
          cardTitle={`Group: ${group.name}`}
          cardSubtitle={
            <P>
              {group.type}
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

export default withStyles(styles)(GroupDetailContainer);
