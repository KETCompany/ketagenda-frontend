import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import {
  withStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "material-ui";

import sidebarStyle from "../../assets/jss/material-dashboard-react/sidebarStyle.jsx";

class Sidebar extends Component {
  
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => this.props.location.pathname.indexOf(routeName) > -1 ? true : false;

  renderLogo = () => {
    const { classes, logo, logoText } = this.props;
    return (
      <div className={classes.logo}>
        <NavLink
          to={'/'}
          className={classes.logoLink}
          key={'/'}
        >
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </NavLink>
      </div>
    )
  }

  renderLinks = () => {
    const { classes, routes, color } = this.props;
    return (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect || prop.hidden) return null;
        const listItemClasses = cx({ [" " + classes[color]]: this.activeRoute(prop.path) });
        const whiteFontClasses = cx({ [" " + classes.whiteFont]: this.activeRoute(prop.path) });
        return (
          <NavLink
            to={prop.path}
            className={classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                <prop.icon />
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
    )
  }

  render() {
    const { classes, image, open, handleDrawerToggle } = this.props;
    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {this.renderLogo()}
            <div className={classes.sidebarWrapper}>
              {this.renderLinks()}
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {this.renderLogo()}
            <div className={classes.sidebarWrapper}>
              {this.renderLinks()}
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);