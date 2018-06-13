import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import { Grid } from 'material-ui';
import { AddAlert } from '@material-ui/icons';
import List, { ListItem, ListItemText } from 'material-ui/List';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

class UsersContainer extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      user: [],
      room: [],
      columns: {
        user: [
          'name',
          'short',
          'email',
          'role',
        ],
        room: [
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

  loadUser = async () => {
    const Users = await UserAPI.get(this.props.params.id)
      .catch(err => console.error(err));

    this.setState({ users: Users });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <RegularCard
          content={
            <div>
              <genericForm data={user} />
            </div>
          }
        />
      </div>
    )
  }
}

export default withStyles(styles)(UsersContainer);
