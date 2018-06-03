import React from 'react';
import { Redirect, Link, Route, Switch, BrowserRouter } from 'react-router-dom';
// import RoomSelection from './components/RoomDetail';
import Reservation from './components/ReservationForm';
import RoomsContainer from './containers/RoomsContainer';

const Routes = () => (
  <BrowserRouter onUpdate={() => console.log("test")}>
    <Switch>
        <Route exact path="/rooms" component={RoomsContainer} />
        {/* <Route exact path="/rooms/:id" component={RoomDetail} /> */}
        <Route path="/reservation" component={Reservation} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
