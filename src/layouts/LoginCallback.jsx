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
        sessionStorage.setItem('profile', JSON.stringify(profile));
        this.setState({
          role: profile.role,
          token,
        });
      }).then(() => 
        this.props.history.push(`/`)
      );
    }
  }

  render() {
    return (<div></div>);
  }
}

export default Login;
