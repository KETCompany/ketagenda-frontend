import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

import { Person, Notifications, Home, MyLocation } from "@material-ui/icons";
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

import headerLinksStyle from "../../assets/jss/material-dashboard-react/headerLinksStyle";
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

import UserApi from '../../api/UserAPI';

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      notifications: false,
      notificationsOn: false,
      showNotification: false,
      currentNotification: {
        title: '',
        message: '',
        variant: '',
      },
      profileOpen: false,
    };
  }

  componentDidMount = () => {
    const { profile } = this.props;
    this.setState({
      profile: profile,
      notificationsOn: profile.fmcToken !== '' ? true : false
    });

    if (profile.fmcToken !== '') {
      this.initMessaging(firebase.messaging());
    }
  }

  initMessaging = messaging => {
    messaging.requestPermission()
      .then(() => {
        messaging.getToken()
          .then((currentToken) => {
            this.updateNotificationProfile(messaging, currentToken);
          })
      })
  }

  updateNotificationProfile = (messaging, currentToken) => {
    return UserApi.updateProfile({ 
      fmcToken: currentToken,
    })
      .then(newProfile => {
        sessionStorage.setItem('profile', 
          JSON.stringify({
            ...newProfile, fmcToken: currentToken,
          }),
        );
        return this.initNotification(messaging);
      })
  }

  initNotification = messaging => {
    messaging.onMessage((payload) => {
      this.setState({
        currentNotification: {
          message: payload.data.message,
          variant: payload.data.variant
        }
      });
      this.showNotification();
    });
  }

  showNotification = () => {
    this.setState({ showNotification: true });
    setTimeout(
      function () {
        this.setState({ showNotification: false });
      }.bind(this),
      6000
    );
  }

  handleClick = (evt) => {
    if (this.state.notificationsOn) {
      this.setState({
        notifications: !this.state.notifications,
      });
    } else {
      this.initMessaging(firebase.messaging());
      this.setState({
        notificationsOn: true,
      })
    }
  };

  turnOffNotifications = () =>
    UserApi.updateProfile({ fmcToken: '' })
      .then(newProfile => {
        sessionStorage.setItem('profile', JSON.stringify({
          ...this.state.profile, fmcToken: ''
        }));
        this.setState({
          notificationsOn: false,
        })
      })

  handleClickProfile = evt =>
    this.setState({
      profileOpen: !this.state.profileOpen,
    })

  handleLogout = evt => {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('profile');
    sessionStorage.removeItem('jwtToken');

    window.location.reload();
  }

  handleClose = () => {
    this.setState({ notifications: false });
  };

  render = () => {
    const { classes } = this.props;
    const { notifications, profileOpen, notificationsOn } = this.state;

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
            variant={this.state.currentNotification.variant}
            message={this.state.currentNotification.message}
            open={this.state.showNotification}
            closeNotification={() => this.setState({ showNotification: false })}
            close
          />
          <Target>
            <IconButton
              color={notificationsOn ? "secondary" : "primary"}
              aria-label="Notifications"
              aria-owns={notifications ? 'menu-list' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
              name="notifications"
              value={notifications}
            >
              <Notifications className={classes.links} />
              {notificationsOn ? (<span className={classes.notifications}>5</span>) : <span></span>}
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
                      onClick={this.turnOffNotifications}
                      className={classes.dropdownItem}
                    >
                      TURN OFF NOTIFICATIONS
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
        <Manager style={{ display: "inline-block" }}>
          <Target>
            <IconButton
              color="inherit"
              aria-label="Person"
              aria-owns={profileOpen ? "menu-list" : null}
              className={classes.buttonLink}
              onClick={this.handleClickProfile}
            >
              <Person className={classes.links}/>
              <Hidden mdUp>
                <p onClick={this.handleClickProfile} className={classes.linkText}>Profile</p>
              </Hidden>
            </IconButton>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={profileOpen}
            className={
              classNames({ [classes.popperClose]: !profileOpen }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={profileOpen}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      {this.state.profile ? this.state.profile.name : ''}
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleLogout}
                      className={classes.dropdownItem}
                    >
                      {'Logout'}
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default withStyles(headerLinksStyle)(HeaderLinks);
