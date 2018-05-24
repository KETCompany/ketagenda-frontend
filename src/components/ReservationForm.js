import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { DatePicker, TimePicker, DateTimePicker } from 'material-ui-pickers';
import TextField from 'material-ui/TextField';

import EventBusyIcon from 'material-ui-icons/EventBusy';
import EventAvailableIcon from 'material-ui-icons/EventAvailable';
import ArrowForwardIcon from 'material-ui-icons/ArrowForward';

import withRoot from '../withRoot';

import * as RoomAPI from '../api/RoomAPI';

import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

import DateTimeCombiner from '../utils/dateTimeCombine';

import RoomsContainer from '../containers/RoomsContainer';

import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Input from 'material-ui/Input';

const moment = require('moment');
moment.locale('nl');

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 15,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  column: {
    flexBasis: '33.33%',
    textAlign: 'center',
  },
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: 600,
    margin: '0 auto',
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ReservationForm extends React.Component {
  constructor() {
    super();

    this.state = {
      roomId: '5add925ac6ab909351e04d69',
      booking: {
        name: '',
        group: '',
        tutor: '',
        start: moment(),
        end: moment(),
      },
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateDates = () => {
    return true;
  }

  // handleChange = (event) => {
  //   this.setState({ value: event.target.value });
  // }

  handleNameChange = (event) => {
    this.setState({ booking: { name: event.target.value } });
  }

  handleStartDateChange = (date) => {
    this.setState({ booking: { start: moment(date) } });
  }

  handleEndDateChange = (date) => {
    this.setState({ booking: { end: moment(date) } });
  }

  // DateTimeCombine = (date, time) => date.set({
  //   'hour': time.get('hour'),
  //   'minute': time.get('minute'),
  //   'second': time.get('second'),
  // });

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    if (this.validateDates()) {
      RoomAPI.post(this.state);
    }
  }

  // onSubmitReservation = async (e) => {
  //   e.preventDefault();
  //   this.setState({ expanded: [] });
  //   this.onSearch();
  // }

  // renderRooms = () => {
  //   const { classes } = this.props;
  //   const { rooms, loading, noRooms } = this.state;

  //   if (rooms.length > 0) {
  //     return (
  //       <Paper className={classes.paper} elevation={4}>
  //         <List>
  //           {rooms.map((room, i) => (
  //               <div key={room._id}>
  //                 <ListItem>
  //                   <Avatar>
  //                     {i % 2 === 0 ? <EventBusyIcon color="primary" /> : <EventAvailableIcon color="secondary" />}
  //                   </Avatar>
  //                   <ListItemText primary={room.name} secondary={room.type} />
  //                   <Avatar>
  //                     <ArrowForwardIcon color={i % 2 === 0 ? 'primary' : 'secondary'} />
  //                   </Avatar>
  //                 </ListItem>
  //                 <Divider inset component="li" />
  //               </div>
  //           ))}
  //         </List>
  //       </Paper>
  //     );
  //   } else if (noRooms) {
  //     return (
  //         <Paper className={classes.paper} elevation={4}>
  //           <Typography variant="subheading" gutterBottom>
  //             Sorry no rooms have been found
  //           </Typography>
  //         </Paper>
  //     );
  //   }
  // }

  render() {
    const { props } = this;
    const {
      name,
      start,
      end,
    } = this.state.booking;

    return (
      <div className={props.classes.root}>
        <Typography variant="display1" gutterBottom>
          KET-Agenda
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Key for electronic technolgies in agenda's
        </Typography>
        
        <Paper className={props.classes.paper} elevation={4}>
          <form onSubmit={props.onSubmitSearch}>
          <Toolbar>
            <div className={props.classes.column}>
              <TextField
                id="search"
                label="Reservation name"
                className={props.classes.textField}
                margin="normal"
                onChange={this.handleNameChange}
              />
            </div>
            </Toolbar>
            <Toolbar>
            <div className={props.classes.column}>
              <DateTimePicker
                keyboard
                ampm={false}
                disablePast={true}
                showTabs={false}
                value={start}
                format="DD-MM-YYYY HH:mm"
                animateYearScrolling={false}
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]}
                onChange={this.handleStartDateChange}
              />
            </div>
            </Toolbar>
            <Toolbar>
            <div className={props.classes.column}>
              <DateTimePicker
                  keyboard
                  openTo="hour"
                  ampm={false}
                  disablePast={true}
                  value={end}
                  minDate={start}
                  format="DD-MM-YYYY HH:mm"
                  animateYearScrolling={false}
                  mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]}
                  onChange={this.handleEndDateChange}
                />
              </div>
            </Toolbar>
            <Button size="small" onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

ReservationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ReservationForm));
