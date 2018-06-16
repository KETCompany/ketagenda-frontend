import React from 'react';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Input from 'material-ui/Input';


const styles = theme => ({
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
});

const RoomSearch = props => (
  <Paper className={props.classes.paper} elevation={4}>
    <form onSubmit={props.onSubmitSearch}>
      <Toolbar>
        <Input
          placeholder="Search your room"
          className={props.classes.search}
          value={props.search}
          onChange={props.onSearchChange}
        />
      </Toolbar>
    </form>
  </Paper>
);

export default withStyles(styles)(RoomSearch);
