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
    path: '/admin/home',
    hidden: true,
    component: HomeContainer,
    authorize: ['admin'],
  },
  {
    path: '/admin/user/:id',
    hidden: true,
    component: EditContainer,
    authorize: ['admin'],
  },
  {
    redirect: true,
    path: '/',
    to: '/admin/home',
    navbarName: 'Redirect',
    authorize: ['admin'],
  },
];

export default adminRoutes;