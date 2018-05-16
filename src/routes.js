import React from 'react';
import { Redirect, Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import RoomSelection from './components/RoomSelection';
import Reservation from './components/ReservationForm';

const Routes = () => (
  <BrowserRouter onUpdate={() => console.log("test")}>
    <Switch>
        <Route exact path="/" component={RoomSelection} />
        <Route path="/reservation" component={Reservation} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
