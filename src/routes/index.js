import Search from '../layouts/Search/Search.jsx';
import Admin from '../layouts/Admin/Default.jsx';

const indexRoutes = [
  {
    path: '/',
    component: Search,
    authorize: ['user'],
  },
];

export default indexRoutes;
