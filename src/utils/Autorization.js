import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const CustomRoute = (prop) => {
  if (prop.authorize.indexOf(sessionStorage.getItem('role')) > -1)
    return ( <Route path={prop.path} component={prop.component} authorize={prop.authorize} key={prop.key} />)
  return <Redirect push to="/" />
}

export default CustomRoute;
