import EditContainer from '../containers/admin/EditContainer';
import HomeContainer from '../containers/admin/HomeContainer';

import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  Notifications,
  PermContactCalendar,
  School
} from '@material-ui/icons';

const adminRoutes = [  
  {
    path: '/admin/user/:id',
    hidden: true,
    component: EditContainer,
    authorize: ['admin'],
  },
  {
    redirect: true,
    path: '/',
    to: '/admin',
    navbarName: 'Redirect',
    authorize: ['admin'],
  },
];

export default adminRoutes;