import EditContainer from '../containers/admin/EditContainer';
import HomeContainer from '../containers/admin/HomeContainer';
import CreateContainer from '../containers/admin/CreateContainer';

import {
  ContentPaste,
  BubbleChart,
} from '@material-ui/icons';
import ReservationContainer from '../containers/ReservationContainer';

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
    path: '/reservation',
    sidebarName: 'Reservation',
    navbarName: 'Event reservation',
    icon: BubbleChart,
    component: ReservationContainer,
    authorize: ['Student', 'Teacher', 'Admin'],
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