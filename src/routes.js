import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import RoomSelection from './components/RoomDetail';
import Reservation from './components/ReservationForm';
import RoomsContainer from './containers/RoomsContainer';

import indexRouters from './routes/index';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {indexRouters.map((prop, key) =>
        <Route path={prop.path} component={prop.component} key={key} />)}
        {/* <Route exact path="/rooms" component={RoomsContainer} /> */}
        {/* <Route exact path="/rooms/:id" component={RoomDetailContainer} /> */}
        {/* <Route path="/reservation" component={Reservation} /> */}
    </Switch>
  </BrowserRouter>
);

export default Routes;
