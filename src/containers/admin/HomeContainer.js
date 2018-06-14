import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import { Grid } from 'material-ui';
import { AddAlert } from '@material-ui/icons';
import List, { ListItem, ListItemText } from 'material-ui/List';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Switch, Route, Redirect } from 'react-router-dom';

import _ from 'lodash';

import DataTable from '../../components/DataTable';

import * as UserAPI from '../../api/UserAPI';
import * as RoomAPI from '../../api/RoomAPI';

import {
  RegularCard,
  A,
  P,
  Small,
  Button,
  SnackbarContent,
  Snackbar,
  ItemGrid
} from '../../components';

const moment = require('moment');

const styles = theme => ({

});


const Child = ({ match }) => (
  <div>
    <h3>URL ID parameter: {match.params.id}</h3>
  </div>
);


class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      users: [],
      rooms: [],
      columns: {
        usersTable: [
          'name',
          'short',
          'email',
          'role',
        ],
        roomsTable: [
          'location',
          'name',
          'floor',
          'number',
          'type',
        ],
      }
    }
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  loadUsers = async () => {
    const Users = await UserAPI.list(``)
      .catch(err => console.error(err));

    this.setState({ users: Users });
  }

  renderUsersTable() {
    const { users, columns: { usersTable } } = this.state;
    if (users.length === 0) {
      this.loadUsers();
    }
  
    return (
      <div>
        {<DataTable
          data={users}
          rowsPerPage={15}
          columns={usersTable}
          isEditable={true}
          editLink={'/admin/edit/user/'}
          isDeletable={true}
        />}
      </div>
    );
  }

  loadRooms = async () => {
    const Rooms = await RoomAPI.list(``)
      .catch(err => console.error(err));

    this.setState({ rooms: Rooms });
  }

  renderRoomsTable() {
    const { rooms, columns: { roomsTable } } = this.state;
    if (rooms.length === 0) {
      this.loadRooms();
    }

    return (
      <div>
        <DataTable
          data={rooms}
          rowsPerPage={15}
          columns={roomsTable}
          isEditable={true}
          editLink={'/admin/edit/room/'}
          isDeletable={false}
        />
      </div>
    )
  }


  render() {
    const { value } = this.state;

    return (
      <div>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Users" />
              <Tab label="Rooms" />
              <Tab label="Reservations" />
            </Tabs>
          </AppBar>
          <RegularCard 
          content={
            <div>
              {value === 0 && this.renderUsersTable()}
              {value === 1 && this.renderRoomsTable()}
              {value === 2 && <ItemGrid xs={12} sm={12} md={12}>Reservations</ItemGrid>}
            </div>
          }
        />
      </div>
    )
  }
}

export default withStyles(styles)(HomeContainer);
