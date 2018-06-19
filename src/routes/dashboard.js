import RoomsContainer from '../containers/RoomsContainer';
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
import GroupsContainer from '../containers/GroupsContainer';
import EventsContainer from '../containers/EventsContainer';
import GroupDetailContainer from '../containers/GroupDetailContainer';
import ReservationContainer from '../containers/ReservationContainer';

const dashboardRoutes = [
  {
    path: '/search',
    sidebarName: 'Rooms',
    navbarName: 'Room list',
    icon: Dashboard,
    component: RoomsContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/reservation',
    sidebarName: 'Reservation',
    navbarName: 'Event reservation',
    icon: BubbleChart,
    component: ReservationContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/groups',
    sidebarName: 'Groups',
    navbarName: 'Group list',
    icon: LibraryBooks,
    component: GroupsContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/group/:id',
    hidden: true,
    component: GroupDetailContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/events',
    sidebarName: 'Events',
    navbarName: 'Event list',
    icon: PermContactCalendar,
    component: EventsContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/event/:id',
    hidden: true,
    component: EventDetailContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  {
    path: '/rooms',
    hidden: true,
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
