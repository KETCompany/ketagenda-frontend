import React from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
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

class HeaderLinks extends React.Component {
  state = {
    notifications: false
  };
  handleClick = (evt) => {
    const { name, value } = evt.currentTarget;
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
