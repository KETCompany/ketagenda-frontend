import RoomsContainer from '../containers/RoomsContainer';
import RoomDetailContainer from '../containers/RoomDetailContainer';
import ReservationContainer from '../containers/ReservationContainer';
import UsersContainer from '../containers/admin/HomeContainer';

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
    authorize: ['user'],
  },
  {
    path: '/rooms/:id/',
    sidebarName: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
    component: RoomDetailContainer,
    authorize: ['user'],
  },
  {
    path: '/reservation',
    sidebarName: 'Reservation',
    navbarName: 'Reservation',
    icon: PermContactCalendar,
    component: ReservationContainer,
    authorize: ['user'],
  },
  {
    path: '/typography',
    sidebarName: 'Event list',
    navbarName: 'Event list',
    icon: LibraryBooks,
    component: RoomsContainer,
    authorize: ['user'],
  },
  {
    path: '/messages',
    sidebarName: 'Messages',
    navbarName: 'Messages',
    icon: Notifications,
    component: RoomsContainer,
    authorize: ['user'],
  },
  {
    path: '/admin',
    sidebarName: 'Administration',
    navbarName: 'Administration',
    icon: School,
    component: UsersContainer,
    authorize: ['user'],
  },
  {
    redirect: true,
    path: '/',
    to: '/search',
    navbarName: 'Redirect',
    authorize: ['user'],
  },
];

export default dashboardRoutes;
