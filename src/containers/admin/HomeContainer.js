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
import * as EventAPI from '../../api/EventAPI';

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
      events: [],
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
        eventsTable: [
          'name',
          { name: 'owner', select: 'owner.short'},
          'description',
        ],
      }
    }
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleDelete = (api) => (kind, id) => {
    api.deleteById(id)
      .then(() => {
        this.setState({ [kind]: this.state[kind].filter(item => item._id !== id) });
      }).catch(err => console.log(err));
    
  }

  loadData = async (kind, api) => {
    const data = await api.list('', [], true)
    
    if (data) {
      this.setState({ [kind]: data });
    }
  }

  handleFilterChange = (kind) => (e) => {
    const { value } = e.target;

    this.setState({
      filter: {
        ...this.state.filter,
        [kind]: value
      },
    });
  }

  renderUsersTable() {
    const { users, columns: { usersTable }, filter} = this.state;
    const kind = 'users';
    if (users.length === 0) {
      this.loadData(kind, UserAPI);
    }
  
    return (
      <div>
        {<DataTable
          data={users}
          kind={kind}
          filter={filter}
          handleFilterChange={this.handleFilterChange}
          rowsPerPage={15}
          columns={usersTable}
          isEditable={true}
          editLink={'/admin/edit/user/'}
          createLink={'/admin/create/user/'}
          handleDelete={this.handleDelete(UserAPI)}
          isDeletable={true}
        />}
      </div>
    );
  }

  renderGroupsTable() {
    const { groups, columns: { groupsTable }, filter } = this.state;
    const kind = 'groups';
    if (groups.length === 0) {
      this.loadData(kind, GroupAPI);
    }
  
    return (
      <div>
        {<DataTable
          data={groups}
          kind={kind}
          filter={filter}
          handleFilterChange={this.handleFilterChange}
          rowsPerPage={15}
          columns={groupsTable}
          isEditable={true}
          editLink={'/admin/edit/group/'}
          createLink={'/admin/create/group/'}
          handleDelete={this.handleDelete(GroupAPI)}
          isDeletable={true}
        />}
      </div>
    );
  }

  renderRoomsTable() {
    const { rooms, columns: { roomsTable }, filter } = this.state;
    const kind = 'rooms';
    if (rooms.length === 0) {
      this.loadData(kind, RoomAPI);
    }

    return (
      <div>
        <DataTable
          data={rooms}
          kind={kind}
          filter={filter}
          handleFilterChange={this.handleFilterChange}
          rowsPerPage={15}
          columns={roomsTable}
          isEditable={true}
          editLink={'/admin/edit/room/'}
          createLink={'/admin/create/room/'}
          handleDelete={this.handleDelete(RoomAPI)}
          isDeletable={false}
        />
      </div>
    )
  }

  renderEventsTable() {
    const { events, columns: { eventsTable }, filter } = this.state;
    const kind = 'events';
    if (events.length === 0) {
      this.loadData(kind, EventAPI);
    }

    return (
      <div>
        <DataTable
          data={events}
          kind={kind}
          filter={filter}
          handleFilterChange={this.handleFilterChange}
          rowsPerPage={15}
          columns={eventsTable}
          isEditable={true}
          editLink={'/admin/edit/event/'}
          createLink={'/admin/create/event/'}
          handleDelete={this.handleDelete(EventAPI)}
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
              <Tab label="Events" />
            </Tabs>
          </AppBar>
          <div>
            {value === 0 && this.renderUsersTable()}
            {value === 1 && this.renderGroupsTable()}
            {value === 2 && this.renderRoomsTable()}
            {value === 3 && this.renderEventsTable()}
          </div>
      </div>
    )
  }
}

export default withStyles(styles)(HomeContainer);
