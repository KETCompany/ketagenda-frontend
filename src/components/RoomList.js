import React from 'react';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';

import { withStyles } from 'material-ui/styles';

import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import EventBusyIcon from 'material-ui-icons/EventBusy';
import EventAvailableIcon from 'material-ui-icons/EventAvailable';
import Typography from 'material-ui/Typography';

import ArrowForwardIcon from 'material-ui-icons/ArrowForward';
import PermDeviceInformationIcon from 'material-ui-icons/PermDeviceInformation';

import { format } from 'date-fns';


const styles = theme => ({
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: 600,
    margin: '0 auto',
  },
  center: {
    textAlign: 'left',
  },
});

const Transition = props => (<Slide direction="up" {...props} />);


const RoomList = (props) => {
  const { rooms, noRooms, classes, onQRClickOpen } = props;
  if (rooms.length > 0) {
    return (
      <div>
        <Paper className={classes.paper} elevation={4}>
          <List>
            {rooms.map((room, i) => (
                <div key={room._id}>
                  <ListItem>
                    <Avatar>
                      {i % 2 === 0 ? <EventBusyIcon color="primary" /> : <EventAvailableIcon color="secondary" />}
                    </Avatar>
                    <ListItemText primary={room.name} secondary={room.type} />
                    {
                      room.booked && room.booked.length === 1 ?
                      (<ListItemText
                        className={classes.center}
                        secondary={`${format(room.booked[0].start, 'HH:mm')} - ${format(room.booked[0].end, 'HH:mm')}`}
                        primary={`Booked by ${(room.booked[0].tutor)}`} />) :
                        (<div></div>)
                    }
                    
                    <ListItemSecondaryAction>
                      <IconButton onClick={onQRClickOpen(room._id)} aria-label="Delete">
                        <PermDeviceInformationIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                    {/* <Avatar>
                      <ArrowForwardIcon color={i % 2 === 0 ? 'primary' : 'secondary'} />
                    </Avatar> */}
                  </ListItem>
                  <Divider inset component="li" />
                </div>
              ))}
          </List>
        </Paper>
      </div>
    );
  } else if (noRooms) {
    return (
      <Paper className={classes.paper} elevation={4}>
        <Typography variant="subheading" gutterBottom>
          Sorry no rooms have been found
            </Typography>
      </Paper>
    );
  }

  return (<div></div>);
};

export default withStyles(styles)(RoomList);
