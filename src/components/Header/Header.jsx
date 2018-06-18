import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@material-ui/icons';
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Button,
} from 'material-ui';
import cx from 'classnames';

import headerStyle from '../../assets/jss/material-dashboard-react/headerStyle.jsx';
import HeaderLinks from './HeaderLinks';

const Header = ({ ...props }) => {
  const {
    classes, color, location, routes, handleDrawerToggle, profile,
  } = props;

  const appBarClasses = cx({
    [` ${classes[color]}`]: color,
  });
  
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button href='#' className={classes.title}>
            {routes.map(prop => (prop.path === location.pathname) ? prop.navbarName : '')}
          </Button>
        </div>
        <Hidden smDown implementation='css'>
          <HeaderLinks profile={profile} />
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  location: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default withStyles(headerStyle)(Header);
