import Search from '../layouts/Default.jsx';
import Admin from '../layouts/Admin/Default.jsx';
import Login from '../layouts/Login.jsx';
import LoginCallback from '../layouts/LoginCallback.jsx';

const indexRoutes = [
  { 
    path: '/admin', 
    component: Admin,
    authorize: ['Admin'],
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/callback',
    component: LoginCallback,
  },
  { 
    path: '/', 
    component: Search,
    authorize: ['Student', 'Teacher', 'Admin'],
  },
  
];

export default indexRoutes;