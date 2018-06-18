import React from 'react';
import { NavLink } from "react-router-dom";

import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

import ArrowForwardIcon from 'material-ui-icons/ArrowForward';
import deepOrange from '@material-ui/core/colors/deepOrange';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';

import _ from 'lodash';

const styles = theme => ({
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: 600,
    margin: '0 auto',
  },
  avatar: {
    padding: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  center: {
    textAlign: 'left',
  },
  item: {
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
  },
  search: {
    width: '100%',
  },
});

const DataList = (props) => {
  const { kind, noData, filter, handleFilterChange, classes } = props;
  let { data } = props;
  
  if (data.length > 0) {
    data = data.filter(data => new RegExp(filter ? filter : '', 'i').exec(_.concat(data.name, data.description)));
  }

  if (data.length > 0 || !_.isEmpty(filter)) {
    return (
      <div>
        <Paper className={classes.paper} elevation={4}>
          <form>
            <Toolbar>
              <TextField
                defaultValue={filter}
                label={`search ${kind}`}
                className={classes.search}
                margin="normal"
                onChange={handleFilterChange}
              />
            </Toolbar>
          </form>
            <List>
              {data.map((obj, i) => (
                  <div key={obj._id}>
                    <NavLink
                      to={`${kind}/${obj._id}`}
                      className={classes.item}
                      activeClassName="active"
                      key={i}
                    >
                      <ListItem button>
                        <Avatar className={classes.avatar}>
                          {(obj.name ? obj.name.substring(0, 3) : 'EVT')}
                        </Avatar>
                        <ListItemText primary={obj.name} secondary={obj.description} />
                        <Avatar>
                          <ArrowForwardIcon color='primary' />
                        </Avatar>
                      </ListItem>
                    <Divider inset component="li" />
                  </NavLink>
                </div>
                ))}
            </List>
        </Paper>
      </div>
    );
  } else if (noData) {
    return (
      <Paper className={classes.paper} elevation={4}>
        <Typography variant="subheading" gutterBottom>
         Sorry no {kind} have been found
        </Typography>
      </Paper>
    );
  }

  return (<div></div>);
};

export default withStyles(styles)(DataList);
