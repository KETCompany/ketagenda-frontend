import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import EventBusyIcon from 'material-ui-icons/EventBusy';
import EventAvailableIcon from 'material-ui-icons/EventAvailable';
import ArrowForwardIcon from 'material-ui-icons/ArrowForward';

import withRoot from '../withRoot';

import * as RoomAPI from '../api/RoomAPI';

import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';


import RoomsContainer from '../containers/RoomsContainer';


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 15,
  },
  search: {
    width: '100%',
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

class Index extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      search: '',
      rooms: [],
      floor: '',
      location: '',
      noRooms: false,
      filters: {
        locations: [],
        floors: [],
        types: [],
      },
      filtersDisabled: {
        locations: [],
        floors: [],
        types: [],
      },
      type: '',
      filterOpen: true,
    };
  }

  onSubmitSearch = async (e) => {
    e.preventDefault();
    this.setState({ expanded: [] });
    this.onSearch();
  }

  onSearchChange = (e) => {
    const { value } = e.target;

    this.setState({
      search: value,
    });
  }



  renderRooms = () => {
    const { classes } = this.props;
    const { rooms, loading, noRooms } = this.state;

    if (rooms.length > 0) {
      return (
        <Paper className={classes.paper} elevation={4}>
          <List>
            {rooms.map((room, i) => {
              return (
                <div key={room._id}>
                  <ListItem>
                    <Avatar>
                      {i % 2 === 0 ? <EventBusyIcon color="primary" /> : <EventAvailableIcon color="secondary" />}
                    </Avatar>
                    <ListItemText primary={room.name} secondary={room.type} />
                    <Avatar>
                      <ArrowForwardIcon color={i % 2 === 0 ? 'primary' : 'secondary'} />
                    </Avatar>
                  </ListItem>
                  <Divider inset component="li" />
                </div>
              )
            })}
          </List>
        </Paper>
      )
    } else {
      if (noRooms) {
        return (
          <Paper className={classes.paper} elevation={4}>
            <Typography variant="subheading" gutterBottom>
              Sorry no rooms have been found
            </Typography>
          </Paper>
        )
      }
    }
  }




  render() {
    const { classes } = this.props;
    const { open, 
      search, 
      floor, 
      location, 
      filters, 
      type, 
      filterOpen, 
      selectedDate, 
      selectedTime, 
      expanded, 
      filtersDisabled } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="display1" gutterBottom>
          KET-Agenda
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Key for electronic technolgies in agenda's
        </Typography>

        <RoomsContainer />

        {this.renderRooms()}
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
