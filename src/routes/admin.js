import EditContainer from '../containers/admin/EditContainer';
import HomeContainer from '../containers/admin/HomeContainer';
import CreateContainer from '../containers/admin/CreateContainer';

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
    sidebarName: 'Management',
    navbarName: 'Management',
    icon: ContentPaste,
    component: HomeContainer,
    authorize: ['Admin'],
  },
  {
    path: '/admin/edit/:kind/:id',
    hidden: true,
    component: EditContainer,
    authorize: ['Admin'],
  },
  {
    path: '/admin/create/:kind',
    hidden: true,
    component: CreateContainer,
    authorize: ['Admin'],
  },
  {
    redirect: true,
    path: '/',
    to: '/admin/home',
    navbarName: 'Redirect',
    authorize: ['Admin'],
  },
];

export default adminRoutes;