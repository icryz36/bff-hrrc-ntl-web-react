import { SxProps } from '@mui/material';
import paths from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  key?: string;
  selectionPrefix?: string;
  path?: string;
  active?: boolean;
  icon?: string;
  iconSx?: SxProps;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  key?: string; // used for the locale
  subheader: string;
  icon: string;
  iconSx?: SxProps;
  items: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'Dashboard',
    subheader: 'Dashboard',
    key: 'Dashboard',
    icon: 'material-symbols:view-quilt-outline',
    items: [
      {
        name: 'Dashboard HO',
        key: 'Dashboard HO',
        pathName: 'Dashboard HO',
        icon: 'mdi:graph-box-outline',
        active: true,
      },
      {
        name: 'Dashboard Branch',
        key: 'Dashboard Branch',
        pathName: 'Dashboard Branch',
        active: true,
        icon: 'mdi:graph-box-outline',
        path: paths[404],
      },
    ],
  },
  {
    id: 'Management Job',
    subheader: 'Management Job',
    key: 'Management Job',
    icon: 'material-symbols:view-quilt-outline',
    items: [
      {
        name: 'Create Job',
        key: 'Create Job',
        pathName: 'Create Job',
        active: true,
        icon: 'formkit:add',
        path: paths.createJob,
      },
      {
        name: 'List Job Post',
        key: 'List Job Post',
        pathName: 'List Job Post',
        active: true,
        icon: 'bytesize:bag',
        path: paths.listJob,
      },
      {
        name: 'Import Job',
        key: 'Import Job',
        pathName: 'Import Job',
        active: true,
        icon: 'uil:import',
        path: paths[404],
      },
    ],
  },
  {
    id: 'Management Candidate',
    subheader: 'Management Candidate',
    key: 'Management Candidate',
    icon: 'material-symbols:view-quilt-outline',
    items: [
      {
        name: 'Import Candidate',
        key: 'Import Candidate',
        pathName: 'Import Candidate',
        active: true,
        icon: 'uil:import',
        path: paths.importCandidates,
      },
      {
        name: 'List Candidate',
        key: 'List Candidate',
        pathName: 'List Candidate',
        active: true,
        icon: 'material-symbols:list-alt-outline-rounded',
        path: paths.listCandidates,
      },
      {
        name: 'Calendar',
        key: 'Calendar',
        pathName: 'Calendar',
        active: true,
        icon: 'ep:calendar',
        path: paths[404],
      },
      {
        name: 'Re-assign',
        key: 'Re-assign',
        pathName: 'Re-assign',
        active: true,
        icon: 'ic:outline-swap-horizontal-circle',
        path: paths[404],
      },
      {
        name: 'Blacklist',
        key: 'Blacklist',
        pathName: 'Blacklist',
        active: true,
        icon: 'tdesign:close-octagon',
        path: paths[404],
      },
    ],
  },
  {
    id: 'Hiring admin',
    subheader: 'Hiring admin',
    key: 'Hiring admin',
    icon: 'material-symbols:view-quilt-outline',
    items: [
      {
        name: 'Hiring Admin',
        key: 'Hiring Admin',
        pathName: 'Hiring Admin',
        active: true,
        icon: 'mingcute:list-search-line',
        path: paths[404],
      },
    ],
  },
  {
    id: 'Report',
    subheader: 'Report',
    key: 'Report',
    icon: 'material-symbols:view-quilt-outline',
    items: [
      {
        name: 'Report',
        key: 'Report',
        pathName: 'Report',
        active: true,
        icon: 'mdi:file-document-outline',
        path: paths[404],
      },
    ],
  },
  {
    id: 'Setting',
    subheader: 'Setting',
    key: 'Setting',
    icon: 'material-symbols:dashboard-customize-outline-rounded',
    items: [
      {
        name: 'Setting Master Data',
        key: 'Setting Master Data',
        pathName: 'Setting Master Data',
        icon: 'material-symbols:layers-outline-rounded',
        active: true,
        items: [
          {
            name: 'Email Template',
            key: 'Email Template',
            path: '#!',
            pathName: 'Email Template',
            active: true,
          },
          {
            name: 'System User list',
            key: 'System User list',
            path: '#!',
            pathName: 'System User list',
            active: true,
          },
          {
            name: 'Company',
            key: 'Company',
            path: '#!',
            pathName: 'Company',
            active: true,
          },
          {
            name: 'Department',
            key: 'Department',
            path: '#!',
            pathName: 'Department',
            active: true,
          },
          {
            name: 'Regional',
            key: 'Regional',
            path: '#!',
            pathName: 'Regional',
            active: true,
          },
          {
            name: 'Province',
            key: 'Province',
            path: '#!',
            pathName: 'Province',
            active: true,
          },
          {
            name: 'Position From HRMS',
            key: 'Position From HRMS',
            path: '#!',
            pathName: 'Position From HRMS',
            active: true,
          },
          {
            name: 'Job Status',
            key: 'Job Status',
            path: '#!',
            pathName: 'Job Status',
            active: true,
          },
          {
            name: 'Candidate Status',
            key: 'Candidate Status',
            path: '#!',
            pathName: 'Candidate Status',
            active: true,
          },
          {
            name: 'Location',
            key: 'Location',
            path: '#!',
            pathName: 'Location',
            active: true,
          },
          {
            name: 'University',
            key: 'University',
            path: '#!',
            pathName: 'University',
            active: true,
          },
          {
            name: 'Education Level',
            key: 'Education Level',
            path: '#!',
            pathName: 'Education Level',
            active: true,
          },
        ],
      },
      {
        name: 'User Activity Log',
        key: 'User Activity Log',
        pathName: 'User Activity Log',
        active: true,
        icon: 'material-symbols:warning-outline-rounded',
        path: paths[404],
      },
      {
        name: 'Permission',
        key: 'Permission',
        pathName: 'Permission',
        active: true,
        icon: 'material-symbols:warning-outline-rounded',
        path: paths[404],
      },
      {
        name: 'Role',
        key: 'Role',
        pathName: 'Role',
        active: true,
        icon: 'material-symbols:supervisor-account-outline',
        path: paths[404],
      },
      {
        name: 'User Member',
        key: 'User Member',
        pathName: 'User Member',
        active: true,
        icon: 'majesticons:user-box-line',
        path: paths[404],
      },
    ],
  },
];

export default sitemap;
