import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import UserAPI from '../api/UserAPI';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';


const responseGoogleF = (response) => {
  console.log('----> ', response);
}
const responseGoogle = (response) => {
  console.log(response);
  UserAPI.login(`?code=${response.code}`)
    .then(user => console.log(user));
}



const styles = (theme) => ({
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: 300,
    margin: '0 auto',
  },
  center: {
    textAlign: 'left',
  },
  item: {
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
  },
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 15,
  },
  button: {
    margin: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      role: '',
      token: '',
    }
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search)

    const token = query.get('token')
    if (token) {
      sessionStorage.setItem('jwtToken', token);
      UserAPI.profile().then(profile => {
        sessionStorage.setItem('role', profile.role);
        this.setState({
          role: profile.role,
          token,
        });
      });
    }
  }

  render() {
    const { classes, ...rest } = this.props;

    const { role, token } = this.state;
    console.log(role, token);

    if (role && token) {
      return (
        <div className={classes.root}>
          <Redirect to={'/'} key={'key'} />
        </div>
      );
    } else {
      return (<div></div>);
    }

    
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
