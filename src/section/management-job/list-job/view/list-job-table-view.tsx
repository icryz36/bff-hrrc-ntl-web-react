import { RefObject, useMemo } from 'react';
import { Box, Button, Chip, ChipOwnProps, Link, Stack, Typography } from '@mui/material';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { useBoolean } from 'hooks/useBoolean';
import ListJobDetailComponent from 'section/management-job/list-job/components/list-job-detail.tsx';
import DashboardMenu from 'components/common/DashboardMenu';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import DataGridPagination from 'components/pagination/DataGridPagination';

export interface IListJobData {
  id: number;
  jobPostID: string;
  jobTitle: string;
  department: string;
  regional: string;
  province: string;
  district: string;
  startDate: string;
  activeDay: string;
  hc: string;
  owner: string;
  jobStatus: string;
}

export const ListJobData: IListJobData[] = [
  {
    id: 1,
    jobPostID: 'H0001',
    jobTitle: 'Treasury cccc',
    department: 'Finance & Accounting',
    regional: 'Head Office',
    province: 'Province 01',
    district: 'District 01, District 02',
    startDate: '01/10/2025',
    activeDay: '9 Day',
    hc: '1',
    owner: 'Chaiya Phongthun',
    jobStatus: 'open',
  },
];

const getStatusBadgeColor = (val: string): ChipOwnProps['color'] => {
  switch (val) {
    case 'open':
      return 'success';
    case 'close':
      return 'neutral';
    case 'hold':
      return 'warning';
    case 'cancel':
      return 'error';
    default:
      return 'primary';
  }
};

const defaultPageSize = 10;

interface ProductsTableProps {
  apiRef: RefObject<GridApiCommunity | null>;
  filterButtonEl: HTMLButtonElement | null;
}

const ListJobTableView = ({ apiRef, filterButtonEl }: ProductsTableProps) => {
  const isOpenConfirmDeleteDialog = useBoolean();
  const isOpenDetailDialog = useBoolean();
  const columns: GridColDef<IListJobData>[] = useMemo(
    () => [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 64,
      },
      {
        field: 'jobPostID',
        headerName: 'Job Post ID',
        minWidth: 148,
        flex: 1,
        renderCell: (params) => {
          return <Link onClick={isOpenDetailDialog.onTrue}>{params.row.jobPostID}</Link>;
        },
      },
      {
        field: 'jobTitle',
        headerName: 'Job Title',
        minWidth: 330,
      },
      {
        field: 'department',
        headerName: 'Department',
        minWidth: 160,
      },
      {
        field: 'regional',
        headerName: 'NTL Regional',
        minWidth: 160,
      },
      {
        field: 'province',
        headerName: 'Province',
        minWidth: 160,
      },
      {
        field: 'district',
        headerName: 'District',
        minWidth: 160,
        filterable: false,
      },
      {
        field: 'startDate',
        headerName: 'Start Date',
        minWidth: 160,
        filterable: false,
      },
      {
        field: 'activeDay',
        headerName: 'Active Day',
        minWidth: 130,
        filterable: false,
      },
      {
        field: 'hc',
        headerName: 'HC',
        minWidth: 80,
        filterable: false,
      },
      {
        field: 'owner',
        headerName: 'Owner',
        minWidth: 150,
        filterable: false,
      },
      {
        field: 'jobStatus',
        headerName: 'Job Status',
        minWidth: 130,
        headerClassName: 'job-status-header',
        cellClassName: 'job-status-cell',
        renderCell: (params) => {
          return (
            <Chip
              label={params.row.jobStatus}
              variant="soft"
              color={getStatusBadgeColor(params.row.jobStatus)}
              sx={{ textTransform: 'capitalize' }}
            />
          );
        },
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
        renderCell: () => (
          <DashboardMenu
            menuItems={[
              {
                label: 'Edit',
                icon: 'mdi-light:pencil',
                onClick: () => {},
              },
              {
                label: 'Duplicate',
                icon: 'material-symbols-light:file-copy-outline',
                onClick: () => {},
              },
              {
                label: 'Delete',
                icon: 'material-symbols-light:delete-outline-sharp',
                onClick: () => {
                  isOpenConfirmDeleteDialog.onTrue();
                },
              },
            ]}
          />
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Box width={1}>
        <DataGrid
          rowHeight={64}
          rows={ListJobData}
          apiRef={apiRef}
          columns={columns}
          disableVirtualization
          pageSizeOptions={[defaultPageSize, 15]}
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
          sx={{
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: '#E31837',
              color: '#fff',
            },
            '& .job-status-cell': {
              position: 'sticky',
              right: 90,
              background: '#FFF',
              zIndex: 5,
              boxShadow: '-5px 0px 10px 0px #0000000D',
            },
            '& .job-status-header': {
              position: 'sticky',
              right: 90,
              background: '#F7FAFC',
              zIndex: 5,
              boxShadow: '-5px 0px 10px 0px #0000000D',
            },
            '& .action-cell': {
              position: 'sticky',
              right: 0,
              background: '#fff',
              zIndex: 6,
            },
            '& .action-header': {
              position: 'sticky',
              right: 0,
              background: '#F7FAFC',
              zIndex: 6,
            },
            '& .MuiDataGrid-row, .MuiDataGrid-columnHeaders': {
              overflow: 'visible !important',
            },
          }}
        />
      </Box>
      <CustomConfirmDialog
        title="ยืนยันการลบข้อมูล"
        open={isOpenConfirmDeleteDialog.value}
        onClose={isOpenConfirmDeleteDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1" whiteSpace="pre-wrap">
            {'คุณต้องการลบข้อมูลนี้หรือไม่?\nหากลบแล้วจะไม่สามารถกู้ข้อมูลนี้ได้อีก'}
          </Typography>
        }
        action={
          <Stack spacing={1}>
            <Button variant="outlined" color="neutral" onClick={isOpenConfirmDeleteDialog.onFalse}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#E31837' }}>
              Delete
            </Button>
          </Stack>
        }
      />
      <ListJobDetailComponent
        open={isOpenDetailDialog.value}
        onClose={isOpenDetailDialog.onFalse}
      />
    </>
  );
};

export default ListJobTableView;
