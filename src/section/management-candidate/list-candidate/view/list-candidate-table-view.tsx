import { RefObject, useMemo } from 'react';
import { Box, Chip, ChipOwnProps, Link, Typography } from '@mui/material';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { StyledDataGrid } from 'section/management-job/list-job/styles';
import { TCandidateListItems } from 'types/candidate';
import DashboardMenu from 'components/common/DashboardMenu';
import DataGridPagination from 'components/pagination/DataGridPagination';

export const getStatusBadgeColor = (val: string): ChipOwnProps['color'] => {
  switch (val?.toLocaleLowerCase()) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'neutral';
    default:
      return 'neutral';
  }
};

const defaultPageSize = 10;

interface ProductsTableProps {
  apiRef: RefObject<GridApiCommunity | null>;
  filterButtonEl: HTMLButtonElement | null;
  tableData: TCandidateListItems[];
  onPageChange: (model: { page: number; pageSize: number }) => void;
  totalItem: number;
  currentPage: number;
  loading: boolean;
}

const ListCandidateTableView = ({ apiRef, filterButtonEl, tableData }: ProductsTableProps) => {
  const columns: GridColDef<any>[] = useMemo(
    () => [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 64,
      },
      {
        field: 'candidateId',
        headerName: 'Candidate ID',
        width: 146,
        renderCell: (params) => {
          return <Link onClick={() => {}}>{params.row.candidateId}</Link>;
        },
      },
      {
        field: 'isBlacklist',
        headerName: 'Blacklist',
        width: 110,
        renderCell: (params) => {
          return (
            <>
              {params.row.isBlacklist ? (
                <Chip label="Blacklist" variant="soft" color="error" />
              ) : (
                <Typography color="text.secondary" variant="subtitle2">
                  -
                </Typography>
              )}
            </>
          );
        },
      },
      {
        field: 'titleNameTh',
        headerName: 'Title',
        width: 120,
      },
      {
        field: 'nameTh',
        headerName: 'Name',
        width: 160,
      },
      {
        field: 'surnameTh',
        headerName: 'Surename',
        width: 200,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 200,
      },
      {
        field: 'mobileNo',
        headerName: 'Mobile Number',
        width: 180,
      },
      {
        field: 'updatedDate',
        headerName: 'Update Date',
        width: 130,
      },
      {
        field: 'countJobApplication',
        headerName: 'Applied Jobs',
        width: 130,
      },
      {
        field: 'status',
        headerName: 'Job Status',
        width: 90,
        headerClassName: 'job-status-header',
        cellClassName: 'job-status-cell',
        renderCell: (params) => {
          return (
            <Chip
              label={params.row.status}
              variant="soft"
              color={getStatusBadgeColor(params.row.status)}
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
        renderCell: (params) => {
          let statusItem = {
            label: 'Active',
            icon: 'mdi:check-circle-outline',
          };

          if (params.row.status === 'Active') {
            statusItem = {
              label: 'Inactive',
              icon: 'mdi:minus-circle-outline',
            };
          }
          const menuItems = [
            {
              label: 'Edit',
              icon: 'mdi:edit-outline',
            },
            statusItem,
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

  console.log('tableData ==> ', tableData);

  return (
    <Box sx={{ width: 1 }}>
      <StyledDataGrid
        rowHeight={64}
        rows={tableData}
        apiRef={apiRef}
        columns={columns}
        getRowId={(row) => row.candidateId}
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
