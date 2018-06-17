import Search from '../layouts/Default.jsx';
import Admin from '../layouts/Admin/Default.jsx';
import Login from '../layouts/Login.jsx';

const indexRoutes = [
  { 
    path: '/admin', 
    component: Admin,
    authorize: ['admin'],
  },
  {
    path: '/login',
    component: Login,
  },
  { 
    path: '/', 
    component: Search,
    authorize: ['Student', 'teacher', 'admin'],
  },
  
];

export default indexRoutes;