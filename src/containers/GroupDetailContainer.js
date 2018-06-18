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
      value: 0,
      reservation: {
        name: '',
        description: '',
        subscribers: [],
        start: moment().toDate(),
        end: moment().toDate(),
      },
    };
    this.getGroup(this.props.match.params.id)
      .then(() => this.setState({ pageLoaded: true }));
  }

  getGroup = async (id) => {
    const group = await GroupAPI.get(id, true);
    if (group && group.bookings) {
      const groupBookings = group.bookings.map(booking => ({
        ...booking,
        start: new Date(booking.start),
        end: new Date(booking.end),
        groupId: id,
      }));
      this.setState({ group: { ...group, bookings: groupBookings } });
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

  handleSelectGroup = (slotInfo) => {
    this.handleDateChange(slotInfo.start);
    this.handleStartTimeChange(slotInfo.start);
    this.handleEndTimeChange(slotInfo.end);
    this.setState({
      agendaItems: [...this.state.agendaItems.filter(item => item.reservation === false), this.state.reservation],
    });
  }

  handleSlotSelect = booking => console.log(booking)

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

    GroupAPI.post(reservation).then((res) => {
      this.setState({
        agendaItems: [],
      });
      this.getGroup(this.state.group._id);
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

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
      <ReservationForm
        onSubmit={this.handleSubmit}
        handleNameChange={this.handleFormFieldChange}
        handleDescChange={this.handleFormFieldChange}
        handleDateChange={this.handleDateChange}
        handleStartTimeChange={this.handleStartTimeChange}
        handleEndTimeChange={this.handleEndTimeChange}
        booking={this.state.reservation}
      />
      <ReservationsCalendar
        agendaItems={[...group.bookings, ...agendaItems]}
        handleSlotSelect={this.handleSlotSelect}
        handleSelectGroup={this.handleSelectGroup}
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
