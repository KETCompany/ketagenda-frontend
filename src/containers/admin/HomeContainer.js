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
import * as GroupAPI from '../../api/GroupAPI';

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

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      users: [],
      groups: [],
      rooms: [],
      columns: {
        usersTable: [
          'name',
          'short',
          'email',
          'role',
        ],
        groupsTable: [
          'name',
          'description',
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

  handleDelete = (kind, id) => {
    this.setState({ [kind]: this.state[kind].filter(item => item._id !== id) });
  }

  loadData = async (kind, api) => {
    const data = await api.list('')
      .catch(err => console.error(err));

    this.setState({ [kind]: data });
  }

  renderUsersTable() {
    const { users, columns: { usersTable } } = this.state;
    const kind = 'users';
    if (users.length === 0) {
      this.loadData(kind, UserAPI);
    }
  
    return (
      <div>
        {<DataTable
          data={users}
          kind={kind}
          rowsPerPage={15}
          columns={usersTable}
          isEditable={true}
          editLink={'/admin/edit/user/'}
          createLink={'/admin/create/user/'}
          handleDelete={this.handleDelete}
          isDeletable={true}
        />}
      </div>
    );
  }

  renderGroupsTable() {
    const { groups, columns: { groupsTable } } = this.state;
    const kind = 'groups';
    if (groups.length === 0) {
      this.loadData(kind, GroupAPI);
    }
  
    return (
      <div>
        {<DataTable
          data={groups}
          kind={kind}
          rowsPerPage={15}
          columns={groupsTable}
          isEditable={true}
          editLink={'/admin/edit/group/'}
          createLink={'/admin/create/group/'}
          handleDelete={this.handleDelete}
          isDeletable={true}
        />}
      </div>
    );
  }

  renderRoomsTable() {
    const { rooms, columns: { roomsTable } } = this.state;
    const kind = 'rooms';
    if (rooms.length === 0) {
      this.loadData(kind, RoomAPI);
    }

    return (
      <div>
        <DataTable
          data={rooms}
          kind={kind}
          rowsPerPage={15}
          columns={roomsTable}
          isEditable={true}
          editLink={'/admin/edit/room/'}
          createLink={'/admin/create/room/'}
          handleDelete={this.handleDelete}
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
              <Tab label="Groups" />
              <Tab label="Rooms" />
            </Tabs>
          </AppBar>
          <div>
            {value === 0 && this.renderUsersTable()}
            {value === 1 && this.renderGroupsTable()}
            {value === 2 && this.renderRoomsTable()}
          </div>
      </div>
    )
  }
}

export default withStyles(styles)(HomeContainer);
