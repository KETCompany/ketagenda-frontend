import React from 'react';
import { Grid } from 'material-ui';
import { AddAlert } from '@material-ui/icons';
import List, { ListItem, ListItemText } from 'material-ui/List';

import * as RoomAPI from '../api/RoomAPI';

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

class RoomDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      room: null,
    };

    this.getRoom(props.match.params.id);
  }


  async getRoom(id) {
    const room = await RoomAPI.get(id, true);
    this.setState({ room });
  }


  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    setTimeout(
      function () {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }


  render() {
    const { room } = this.state;
    if (room === null) {
      return (<div>Room not found</div>);
    }

    return (
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
              <ItemGrid xs={12} sm={12} md={6}>
                <h5>Bookings</h5>
                <br />
                <List>
                  {room.bookings.map(booking => (
                    <ListItem key={booking._id}>
                      <ListItemText primary={booking.event.name} secondary={booking.event.description} />
                    </ListItem>
                  ))}
                </List>
              </ItemGrid>
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
    );
  }
}

export default RoomDetailContainer;
