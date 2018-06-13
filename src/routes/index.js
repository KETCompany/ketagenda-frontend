import Search from '../layouts/Default.jsx';
import Admin from '../layouts/Admin/Default.jsx';

const indexRoutes = [
  { 
    path: '/admin', 
    component: Admin,
    authorize: ['admin'],
  },
  { 
    path: '/', 
    component: Search,
    authorize: ['student', 'teacher', 'admin'],
  },
];

export default indexRoutes;