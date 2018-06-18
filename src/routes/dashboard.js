import RoomsContainer from '../containers/RoomsContainer';

import ReservationContainer from '../containers/ReservationContainer';
import RoomDetailContainer from '../containers/RoomDetailContainer';
import EventDetailContainer from '../containers/EventDetailContainer';

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
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/room/:id',
    hidden: true,
    component: RoomDetailContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/event/:id',
    hidden: true,
    component: EventDetailContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/reservation',
    hidden: true,
    component: ReservationContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/typography',
    sidebarName: 'Event list',
    navbarName: 'Event list',
    icon: LibraryBooks,
    component: RoomsContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/messages',
    sidebarName: 'Messages',
    navbarName: 'Messages',
    icon: Notifications,
    component: RoomsContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/',
    hidden: true,
    component: RoomsContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
];

export default dashboardRoutes;
