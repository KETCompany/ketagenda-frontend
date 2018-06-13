import Default from '../layouts/Admin/Default.jsx';

const adminRoutes = [  
  {
    redirect: true,
    path: '/',
    to: '/admin',
    navbarName: 'Redirect',
    authorize: ['user'],
  },
];

export default adminRoutes;