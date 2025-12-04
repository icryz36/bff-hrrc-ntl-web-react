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
  editJob: `/${rootPaths.manageRoot}/job/:id/edit`,
  duplicateJob: `/${rootPaths.manageRoot}/job/:id/duplicate`,
  listJob: `/${rootPaths.manageRoot}/job/list`,
  defaultJwtLogin: `/${rootPaths.pagesRoot}/authentication/jwt/login`,
  defaultAuth0Login: `/${rootPaths.pagesRoot}/authentication/auth0/login`,
  notifications: `/${rootPaths.pagesRoot}/notifications`, //? update path
  importCandidates: `/${rootPaths.manageRoot}/candidates/import`,
  listCandidates: `/${rootPaths.manageRoot}/candidates/list`,
  editCandidates: `/${rootPaths.manageRoot}/candidates/:id/edit`,
  candidateDetail: `/${rootPaths.manageRoot}/candidates/:id/detail`,
  importCandidateAndApplyJob: `/${rootPaths.manageRoot}/import/candidate-and-applyjob`,
  importTrackingAndHistory: `/${rootPaths.manageRoot}/import/tracking-and-history`,

  404: `/${rootPaths.errorRoot}/404`,
};

export const navigatePaths = {
  jobPost: {
    listJob: `/${rootPaths.manageRoot}/job/list`,
    createJob: `/${rootPaths.manageRoot}/job/create`,
    editJob: (id: string) => `/${rootPaths.manageRoot}/job/${id}/edit`,
    duplicateJob: (id: string) => `/${rootPaths.manageRoot}/job/${id}/duplicate`,
  },
  candidate: {
    list: `/${rootPaths.manageRoot}/candidates/list`,
    detail: (id: string) => `/${rootPaths.manageRoot}/candidates/${id}/detail`,
    edit: (id: string) => `/${rootPaths.manageRoot}/candidates/${id}/edit`,
  },
  importFile: {
    candidateAndApplyJob: `/${rootPaths.manageRoot}/import/candidate-and-applyjob`,
    importTrackingAndHistory: `/${rootPaths.manageRoot}/import/tracking-and-history`,
  },
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
