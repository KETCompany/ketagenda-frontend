import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from 'material-ui/Dialog';
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';

import classNames from 'classnames';


import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import EventBusyIcon from 'material-ui-icons/EventBusy';
import EventAvailableIcon from 'material-ui-icons/EventAvailable';
import ArrowForwardIcon from 'material-ui-icons/ArrowForward';

import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  search: {
    width: '100%',
  },
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width:600,
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
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
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

});

class Index extends React.Component {
  state = {
    open: false,
    search: '',
    rooms: [],
    floor: '',
    location: '',
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  onSearch = (e) => {
    e.preventDefault();
    const { search, floor, location } = this.state;

    let searchQuery = `?name=${search}`;

    if(floor) {
      searchQuery += `&floor=${floor}`
    }

    if(location) {
      searchQuery += `&location=${location}`
    }

    this.api(searchQuery)
    .then(resp => resp.json())
    .then(rooms => {
      console.log(rooms);
      this.setState({
        rooms
      });
    });
  }

  api = (query) => {
    return fetch(`http://localhost:8080/api/rooms${query}`)
  }

  onSearchChange = (e) => {
    const { value } = e.target;

    this.setState({
      search: value,
    })
  }

  onFloorChange = (e) => {
    const { value } = e.target;

    this.setState({
      floor: value,
    })
  }

  onLocationChange = (e) => {
    const { value } = e.target;

    this.setState({
      location: value,
    })
  }

  renderRooms = () => {
    const { classes } = this.props;
    const rooms = this.state.rooms;
    if (rooms.length > 0) {
      return (
        <Paper className={classes.paper} elevation={4}>
          <List>
            {rooms.map((room, i) => {
              return (
                <div>
                  <ListItem>
                    <Avatar>
                      {i % 2 === 0 ? <EventBusyIcon color="primary" /> : <EventAvailableIcon color="secondary" />}
                    </Avatar>
                    <ListItemText primary={room.name} secondary={room.type} />
                    <Avatar>
                      <ArrowForwardIcon color={i % 2 === 0 ? 'primary' : 'secondary'}/> 
                    </Avatar>
                  </ListItem>
                  <Divider inset component="li" />
                </div>
              )
            })}
          </List>
        </Paper>
      )
    }
  }




  render() {
    const { classes } = this.props;
    const { open, search, floor, location } = this.state;

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="display1" gutterBottom>
          KET-Agenda
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Key for electronic technolgies in agenda's
        </Typography>
        
        <Paper className={classes.paper} elevation={4}>
          <form onSubmit={this.onSearch}>
            <Toolbar>
              <Input
                defaultValue=""
                className={classes.search}
                value={search}
                onChange={this.onSearchChange}
              />
            </Toolbar>
          </form>
        </Paper>
        <ExpansionPanel className={classes.paper} defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}></Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Select more filters</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column} />
            <div className={classes.column}>
              <Input
                placeholder='Location'
                defaultValue=""
                value={location}
                onChange={this.onLocationChange}
              />

              <Input
                placeholder='Floor'
                defaultValue=""
                value={floor}
                onChange={this.onFloorChange}
              />
            </div>
            <div className={classNames(classes.column, classes.helper)}>
              <Typography variant="caption">
                Select your destination of choice<br />
                <a href="#sub-labels-and-columns" className={classes.link}>
                  Learn more
              </a>
              </Typography>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small">Cancel</Button>
            <Button size="small" onClick={this.onSearch} color="primary">
              Search
          </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
        {this.renderRooms()}


      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
