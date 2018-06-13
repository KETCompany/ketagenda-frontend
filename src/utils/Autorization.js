import React from 'react';
import { Route } from 'react-router-dom';

const CustomRoute = (prop) => {
  console.log(prop);
  return (
    <Route path={prop.path} component={prop.component} authorize={prop.authorize} key={prop.key} />
  )
}

export default CustomRoute;
