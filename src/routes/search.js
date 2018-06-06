import RoomsContainer from '../containers/RoomsContainer';
import RoomDetailContainer from '../containers/RoomDetailContainer';
import ReservationContainer from '../containers/ReservationContainer';

import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  Notifications,
  PermContactCalendar
} from '@material-ui/icons';

const dashboardRoutes = [
  {
    path: '/search',
    sidebarName: 'Search',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: RoomsContainer,
  },
  {
    path: '/rooms/5afc2c4f0a876e4deb9656c6/',
    sidebarName: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
    component: RoomDetailContainer,
  },
  {
    path: '/reservation',
    sidebarName: 'Reservation',
    navbarName: 'Reservation',
    icon: PermContactCalendar,
    component: ReservationContainer,
  },
  {
    path: '/typography',
    sidebarName: 'Event list',
    navbarName: 'Event list',
    icon: LibraryBooks,
    component: RoomsContainer,
  },
  {
    path: '/messages',
    sidebarName: 'Messages',
    navbarName: 'Messages',
    icon: Notifications,
    component: RoomsContainer,
  },
  {
    redirect: true,
    path: '/',
    to: '/search',
    navbarName: 'Redirect',
  },
];

export default dashboardRoutes;
