import { RefObject, useMemo } from 'react';
import { Box, Chip } from '@mui/material';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { StyledDataGrid } from 'section/management-job/list-job/styles';
import DashboardMenu from 'components/common/DashboardMenu';
import DataGridPagination from 'components/pagination/DataGridPagination';

const defaultPageSize = 10;

interface ProductsTableProps {
  apiRef: RefObject<GridApiCommunity | null>;
  filterButtonEl: HTMLButtonElement | null;
}

const tableData = [
  {
    id: '1',
    blacklist: 'blacklist',
    title: 'Mr',
    name: 'Akkharaphon',
    surename: 'Sahastrabudhhe',
    email: 'Exampleemail@gmail.com',
    mobileNumber: '000-000-0000',
    updateDate: '10/11/2025',
    appliedJobs: '3',
    statusName: 'Active',
  },
];

const ListCandidateTableView = ({ apiRef, filterButtonEl }: ProductsTableProps) => {
  const columns: GridColDef<any>[] = useMemo(
    () => [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 64,
      },
      {
        field: 'id',
        headerName: 'Candidate ID',
        width: 146,
      },
      {
        field: 'blacklist',
        headerName: 'Blacklist',
        width: 110,
        renderCell: (params) => {
          return <Chip label={params.row.blacklist} variant="soft" color="neutral" />;
        },
      },
      {
        field: 'title',
        headerName: 'Title',
        width: 120,
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 160,
      },
      {
        field: 'surename',
        headerName: 'Surename',
        width: 200,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 200,
      },
      {
        field: 'mobileNumber',
        headerName: 'Mobile Number',
        width: 180,
      },
      {
        field: 'updateDate',
        headerName: 'Update Date',
        width: 130,
      },
      {
        field: 'appliedJobs',
        headerName: 'Applied Jobs',
        width: 130,
      },
      {
        field: 'statusName',
        headerName: 'Job Status',
        width: 90,
        headerClassName: 'job-status-header',
        cellClassName: 'job-status-cell',
      },
      {
        field: 'action',
        headerName: 'Actions',
        filterable: false,
        sortable: false,
        width: 90,
        align: 'center',
        headerAlign: 'right',
        headerClassName: 'action-header',
        cellClassName: 'action-cell',
        renderCell: () => {
          const menuItems = [
            {
              label: 'Edit',
              icon: 'mdi:edit-outline',
            },
            {
              label: 'Inactive',
              icon: 'mdi:minus-circle-outline',
            },
            {
              label: 'Active',
              icon: 'mdi:check-circle-outline',
            },
            {
              label: 'Black List',
              icon: 'mdi:close-octagon-outline',
            },
          ];
          return <DashboardMenu menuItems={menuItems} />;
        },
      },
    ],
    [],
  );
  return (
    <Box sx={{ width: 1 }}>
      <StyledDataGrid
        rowHeight={64}
        rows={tableData}
        apiRef={apiRef}
        columns={columns}
        pageSizeOptions={[defaultPageSize, 15]}
        disableVirtualization
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: defaultPageSize,
            },
          },
        }}
        checkboxSelection
        slots={{
          basePagination: (props) => <DataGridPagination showFullPagination {...props} />,
        }}
        slotProps={{
          panel: {
            target: filterButtonEl,
          },
        }}
      />
    </Box>
  );
};

export default ListCandidateTableView;
