import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { DatePicker, TimePicker } from 'material-ui-pickers';

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

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 15,
  },
  search: {
    width: '100%',
  },
  column: {
    flexBasis: '33.33%',
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
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  expansionPanelRoot: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
  expandeds: false,
});

class ReservationForm extends React.Component {
  constructor() {
    super();

    this.state = {
      group: String,
      name: String,
      tutor: String,
      start: Date,
      startDate: Date,
      startTime: '',
      end: Date,
      endDate: Date,
      endTime: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleNameChange = (Name) => {
    this.setState({ name: Name });
  }

  handleStartDateChange = (date) => {
    this.setState({ startDate: date });
  }
  handleStartTimeChange = (time) => {
    this.setState({ startTime: time });
  }

  handleEndDateChange = (date) => {
    this.setState({ endDate: date });
  }
  handleEndTimeChange = (time) => {
    this.setState({ endTime: time });
  }

  DateTimeCombine = (date, time) => new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':00')

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.DateTimeCombine(this.state.startDate, this.state.startTime));
    this.setState({ 
      start: this.DateTimeCombine(this.state.startDate, this.state.startTime),
      end: this.DateTimeCombine(this.state.endDate, this.state.endTime),
    });
    RoomAPI.post(this.state);
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
      group,
      name,
      tutor,
      startDate,
      startTime,
      endDate,
      endTime,
    } = this.state;

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

            <div className={props.classes.column}>
              <Input
                defaultValue=""
                placeholder="Reservation name"
                className={props.classes.search}
                // value={name}
                onChange={this.handleNameChange}
              />
            </div>
            <Toolbar>
            <div className={props.classes.column}>
              <DatePicker
                keyboard
                format="DD/MM/YYYY"
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                placeholder="11/11/2018"
                max={endDate}
                value={startDate}
                onChange={this.handleStartDateChange}
                animateYearScrolling={false}
                invalidDateMessage={'Select a start date'}
              />
            </div>
            <div className={props.classes.column}>
              <TimePicker
                keyboard
                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                ampm={false}
                max={endTime}
                value={startTime}
                onChange={this.handleStartTimeChange}
                placeholder="13:37"
                invalidDateMessage={'Select a time'}
              />
            </div>
            </Toolbar>
            <Toolbar>
            <div className={props.classes.column}>
              <DatePicker
                keyboard
                format="DD/MM/YYYY"
                min={startDate}
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                placeholder="11/11/2018"
                value={endDate}
                onChange={this.handleEndDateChange}
                animateYearScrolling={false}
                invalidDateMessage={'Select a start date'}
              />
            </div>
            <div className={props.classes.column}>
              <TimePicker
                keyboard
                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                ampm={false}
                min={startTime}
                value={endTime} 
                onChange={this.handleEndTimeChange}
                placeholder="13:37"
                invalidDateMessage={'Select a time'}
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
