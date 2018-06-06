// import DashboardPage from 'views/Dashboard/Dashboard.jsx';
// import UserProfile from 'views/UserProfile/UserProfile.jsx';
// import TableList from 'views/TableList/TableList.jsx';
// import Typography from 'views/Typography/Typography.jsx';
// import Icons from 'views/Icons/Icons.jsx';
// import Maps from 'views/Maps/Maps.jsx';
// import NotificationsPage from 'views/Notifications/Notifications.jsx';

import RoomsContainer from '../containers/RoomsContainer';
import RoomDetailContainer from '../containers/RoomDetailContainer';

import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  Notifications
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
    path: '/rooms/:id',
    sidebarName: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
    component: RoomDetailContainer,
  },
  {
    path: '/table',
    sidebarName: 'Group List',
    navbarName: 'Group List',
    icon: ContentPaste,
    component: RoomsContainer,
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
  { redirect: true, path: '/', to: '/search', navbarName: 'Redirect' }
];

export default dashboardRoutes;
