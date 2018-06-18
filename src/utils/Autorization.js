import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const AddPropsToRoute = (WrappedComponent, passedProps) => (
      class Route extends Component {
        render = () => <WrappedComponent {...Object.assign({}, this.props, passedProps)} />
      }
  )

const CustomRoute = (prop) => {
  if (!prop.authorize || prop.authorize.indexOf(sessionStorage.getItem('role')) > -1) {
    const RouteProps = { profile: JSON.parse(sessionStorage.getItem('profile')) };
    return (
      <Route
        path={prop.path}
        component={AddPropsToRoute(prop.component, RouteProps)}
        authorize={prop.authorize}
        key={prop.key}
      />
    );
  }
  return <Redirect push to="/login" />
}

export default CustomRoute;
