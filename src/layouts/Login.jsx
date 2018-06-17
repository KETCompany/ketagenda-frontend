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

    if (this.props.location.search) {
      UserAPI.login(this.props.location.search)
        .then(response => {
          if (response && !response.description) {
            sessionStorage.setItem('role', response.user.role);
            sessionStorage.setItem('jwtToken', response.token);

          }
        })
    }
    
  }

  

  onClick = (e) => {
    window.location = 'http://localhost:8080/auth/google';
  }

  render() {
    const { classes, ...rest } = this.props;
    console.log(this.props);
    return (
      <div className={classes.root}>
        {sessionStorage.getItem('role') ? <Redirect to={'/'} key={'key'} /> : null}
${}        <Typography variant="display1" gutterBottom>
          KET-Agenda
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Key for electronic technolgies in agenda's
        </Typography>

        <Paper className={classes.paper} elevation={4}>
          <Typography variant="title" gutterBottom>
            Log in
          </Typography>
          <Button onClick={this.onClick} variant="contained" color="primary" className={classes.button}>
            Auth
           <Icon className={classes.rightIcon}>login</Icon>
           
          </Button>

          <GoogleLogin
            clientId="598561209308-gpjgs4kklkq66uac6c90e6ssq9kjvp68.apps.googleusercontent.com"
            scope='profile email'
            responseType='code'
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogleF}
          />

        </Paper>

      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
