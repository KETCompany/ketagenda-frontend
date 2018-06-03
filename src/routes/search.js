// import DashboardPage from 'views/Dashboard/Dashboard.jsx';
// import UserProfile from 'views/UserProfile/UserProfile.jsx';
// import TableList from 'views/TableList/TableList.jsx';
// import Typography from 'views/Typography/Typography.jsx';
// import Icons from 'views/Icons/Icons.jsx';
// import Maps from 'views/Maps/Maps.jsx';
// import NotificationsPage from 'views/Notifications/Notifications.jsx';

import RoomsContainer from '../containers/RoomsContainer'

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
    path: '/user',
    sidebarName: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
    component: RoomsContainer,
  },
  {
    path: '/table',
    sidebarName: 'Table List',
    navbarName: 'Table List',
    icon: ContentPaste,
    component: RoomsContainer,
  },
  {
    path: '/typography',
    sidebarName: 'Typography',
    navbarName: 'Typography',
    icon: LibraryBooks,
    component: RoomsContainer,
  },
  {
    path: '/icons',
    sidebarName: 'Icons',
    navbarName: 'Icons',
    icon: BubbleChart,
    component: RoomsContainer,
  },
  {
    path: '/maps',
    sidebarName: 'Maps',
    navbarName: 'Map',
    icon: LocationOn,
    component: RoomsContainer,
  },
  {
    path: '/notifications',
    sidebarName: 'Notifications',
    navbarName: 'Notifications',
    icon: Notifications,
    component: RoomsContainer,
  },
  { redirect: true, path: '/', to: '/search', navbarName: 'Redirect' }
];

export default dashboardRoutes;
