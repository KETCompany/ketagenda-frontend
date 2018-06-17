import RoomsContainer from '../containers/RoomsContainer';

import ReservationContainer from '../containers/ReservationContainer';
import RoomDetailContainer from '../containers/RoomDetailContainer';

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

const dashboardRoutes = [
  {
    path: '/search',
    sidebarName: 'Search',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: RoomsContainer,
    authorize: ['Student', 'teacher', 'admin'],
  },
  {
    path: '/rooms/:id',
    hidden: true,
    component: RoomDetailContainer,
    authorize: ['Student', 'teacher', 'admin'],
  },
  {
    path: '/reservation',
    hidden: true,
    component: ReservationContainer,
    authorize: ['Student', 'teacher', 'admin'],
  },
  {
    path: '/typography',
    sidebarName: 'Event list',
    navbarName: 'Event list',
    icon: LibraryBooks,
    component: RoomsContainer,
    authorize: ['Student', 'teacher', 'admin'],
  },
  {
    path: '/messages',
    sidebarName: 'Messages',
    navbarName: 'Messages',
    icon: Notifications,
    component: RoomsContainer,
    authorize: ['Student', 'teacher', 'admin'],
  },
  {
    path: '/',
    hidden: true,
    component: RoomsContainer,
    authorize: ['Student', 'teacher', 'admin'],
  },
];

export default dashboardRoutes;
