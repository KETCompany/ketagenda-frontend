import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import CustomRoute from './utils/Autorization';
import indexRouter from './routes/index';
import NotFoundContainer from './containers/error/NotFoundContainer';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      {indexRouter.map((prop, key) =>
        <CustomRoute
          path={prop.path}
          component={prop.component}
          authorize={prop.authorize}
          key={key}
        />)}
        <Route component={NotFoundContainer}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;