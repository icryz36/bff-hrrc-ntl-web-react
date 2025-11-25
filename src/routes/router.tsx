import { Suspense, lazy } from 'react';
import { Outlet, RouteObject, createBrowserRouter, useLocation } from 'react-router';
import App from 'App';
import MainLayout from 'layouts/main-layout';
import CandidateDatailPage from 'pages/candidate/CandidateDetailPage';
import Page404 from 'pages/errors/Page404';
import PageLoader from 'components/loading/PageLoader';
import paths, { rootPaths } from './paths';

// import AuthGurad from 'components/guard/AuthGuard';
// import GuestGurad from 'components/guard/GuestGurad';
// import Splash from 'components/loading/Splash';

const WelcomePage = lazy(() => import('pages/Welcome'));

// jobpost
const CreateJobPage = lazy(() => import('pages/job/CreateJobPage'));
const EditJobPage = lazy(() => import('pages/job/EditJobPage'));
const ListJobPage = lazy(() => import('pages/job/ListJobPage'));
const DuplicateJobPage = lazy(() => import('pages/job/DuplicateJobPage'));
const ImportCandidatesPage = lazy(() => import('pages/candidate/CandidateImportPage'));
const ListCandidatesPage = lazy(() => import('pages/candidate/CandidateListPage'));

// candidate
const EditCandidatePage = lazy(() => import('pages/candidate/CandidateEditPage'));

export const SuspenseOutlet = () => {
  const location = useLocation();

  return (
    <Suspense key={location.pathname} fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
};

export const routes: RouteObject[] = [
  {
    element: (
      // Uncomment the following line to enable the Suspense fallback for initial loading when using AuthGuard

      // <Suspense fallback={<Splash />}>
      <App />
      // </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          // Uncomment the following line to activate the AuthGuard for protected routes

          // <AuthGurad>
          <MainLayout>
            <SuspenseOutlet />
          </MainLayout>
          // </AuthGurad>
        ),
        children: [
          {
            index: true,
            element: <WelcomePage />,
          },
          {
            path: rootPaths.manageRoot,
            children: [
              {
                children: [
                  {
                    path: paths.createJob,
                    element: <CreateJobPage />,
                  },
                  {
                    path: paths.editJob,
                    element: <EditJobPage />,
                  },
                  {
                    path: paths.duplicateJob,
                    element: <DuplicateJobPage />,
                  },
                  {
                    path: paths.listJob,
                    element: <ListJobPage />,
                  },
                  {
                    path: paths.importCandidates,
                    element: <ImportCandidatesPage />,
                  },
                  {
                    path: paths.listCandidates,
                    element: <ListCandidatesPage />,
                  },
                  {
                    path: paths.editCandidates,
                    element: <EditCandidatePage />,
                  },
                  {
                    path: paths.candidateDetail,
                    element: <CandidateDatailPage />,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASENAME || '/',
});

export default router;
