import React from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import Snackbar from '../Snackbar/Snackbar';
import {
  withStyles,
  IconButton,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden,
} from "material-ui";
import { Person, Notifications, Home, MyLocation } from "@material-ui/icons";

import { Link } from 'react-router-dom';

import headerLinksStyle from "../../assets/jss/material-dashboard-react/headerLinksStyle";

import firebase from 'firebase/app';

import UserApi from '../../api/UserAPI';

class HeaderLinks extends React.Component {
  state = {
    notifications: false,
    showNotification: false,
    currentNotification: {
      title: '',
      message: '',
    }
  };
  
  componentDidMount() {
    if (!this.state.notifications) {
      const messaging = firebase.messaging();
      messaging.requestPermission().then(() => {
        messaging.getToken().then((currentToken) => {
          UserApi.updateProfile({ fmcToken: currentToken })
            .then(() => {
              messaging.onMessage((payload) => {
                this.setState({
                  currentNotification: {
                    message: payload.data.message,
                  }
                });
                this.showNotification();
              });
            })
        })
      })
    }
  }

  showNotification() {
    this.setState({ showNotification: true });
    setTimeout(
      function () {
        this.setState({ showNotification: false });
      }.bind(this),
      6000
    );
  }

  handleClick = (evt) => {
    const { name, value } = evt.currentTarget;

    if(name === 'notifications') {
    

    }
    this.setState({ [name]: !value });
  };

  handleLogout = (evt) => {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('jwtToken');
  }

  handleClose = () => {
    this.setState({ notifications: false });
  };



  render() {
    const { classes } = this.props;
    const { notifications } = this.state;
    return (
      <div>
        <Link to={'/'}>
          <IconButton
            color="inherit"
            aria-label="Home"
            className={classes.buttonLink}
          >
            <Home className={classes.links} />
            <Hidden mdUp>
              <p className={classes.linkText}>Home</p>
            </Hidden>
          </IconButton>
        </Link>
        <Link to={'/admin'}>
          <IconButton
            color="inherit"
            aria-label="Admin"
            className={classes.buttonLink}
          >
            <MyLocation className={classes.buttonLink} />
            <Hidden mdUp>
              <p className={classes.linkText}>Admin</p>
            </Hidden>
          </IconButton>
        </Link>
        <Manager style={{ display: 'inline-block' }}>
          <Snackbar
            place="tr"
            variant='info'
            message={this.state.currentNotification.message}
            open={this.state.showNotification}
            closeNotification={() => this.setState({ showNotification: false })}
            close
          />
          <Target>
            <IconButton
              color="inherit"
              aria-label="Notifications"
              aria-owns={notifications ? 'menu-list' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
              name="notifications"
              value={notifications}
            >
              <Notifications className={classes.links} />
              <span className={classes.notifications}>5</span>
              <Hidden mdUp>
                <p onClick={this.handleClick} className={classes.linkText}>
                  Notification
                </p>
              </Hidden>
            </IconButton>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={notifications}
            className={
              classNames({ [classes.popperClose]: !notifications }) +
              ' ' +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={notifications}
                id="menu-list"
                style={{ transformOrigin: '0 0 0' }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      You're now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
        <IconButton
          color="inherit"
          aria-label="Person"
          className={classes.buttonLink}
        >
          <Person className={classes.links} name="notifications" value={'something'} onClick={this.handleLogout} />
          <Hidden mdUp>
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </IconButton>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
