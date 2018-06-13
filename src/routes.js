import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import CustomRoute from './utils/Autorization';
// import RoomSelection from './components/RoomDetail';
import Reservation from './components/ReservationForm';
import RoomsContainer from './containers/RoomsContainer';

import indexRouter from './routes/index';
import adminRouter from './routes/admin';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {indexRouter.map((prop, key) => 
        <CustomRoute path={prop.path} component={prop.component} authorize={prop.authorize} key={key} />
      )}
    </Switch>
  </BrowserRouter>
);

export default Routes;
