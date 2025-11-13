export const rootPaths = {
  root: '/',
  dashboardRoot: 'dashboard',
  pagesRoot: 'pages',
  errorRoot: 'error',
  manageRoot: 'manage',
};

const paths = {
  starter: `/${rootPaths.pagesRoot}/starter`,
  createJob: `/${rootPaths.manageRoot}/job/create`,
  listJob: `/${rootPaths.manageRoot}/job/list`,
  defaultJwtLogin: `/${rootPaths.pagesRoot}/authentication/jwt/login`,
  defaultAuth0Login: `/${rootPaths.pagesRoot}/authentication/auth0/login`,
  notifications: `/${rootPaths.pagesRoot}/notifications`, //? update path

  404: `/${rootPaths.errorRoot}/404`,
};

export const apiEndpoints = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  profile: '/auth/profile',
  getUsers: '/users',
  forgotPassword: '/auth/forgot-password',
  setPassword: '/auth/set-password',
  getProduct: (id: string) => `e-commerce/products/${id}`,
};

export default paths;
