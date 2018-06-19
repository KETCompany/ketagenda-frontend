import React, { Component } from 'react';
import Routes from '../routes';
import withRoot from '../withRoot';

class App extends Component {
  render = () => (
    <Routes />
  )
}

export default withRoot(App);
