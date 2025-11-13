import { RefObject, useMemo, useState } from 'react';
import { Box, Button, Chip, ChipOwnProps, Link, Stack, Typography } from '@mui/material';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { useBoolean } from 'hooks/useBoolean';
import ListJobDetailComponent from 'section/management-job/list-job/components/list-job-detail.tsx';
import { TJobPost } from 'types/jobpost';
import DashboardMenu from 'components/common/DashboardMenu';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import DataGridPagination from 'components/pagination/DataGridPagination';
import { StyledDataGrid, StyledTypography2Line } from '../styles';

const getStatusBadgeColor = (val: string): ChipOwnProps['color'] => {
  switch (val.toLocaleLowerCase()) {
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
  tableData: TJobPost[];
  onPageChange: (model: { page: number; pageSize: number }) => void;
  totalItem: number;
  currentPage: number;
}

const ListJobTableView = ({
  apiRef,
  filterButtonEl,
  tableData,
  onPageChange,
  totalItem,
  currentPage,
}: ProductsTableProps) => {
  const isOpenConfirmDeleteDialog = useBoolean();
  const isOpenDetailDialog = useBoolean();
  const [selectedJobPostId, setSelectedJobPostId] = useState<string | null>(null);

  const columns: GridColDef<any>[] = useMemo(
    () => [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 64,
      },
      {
        field: 'jobPostNo',
        headerName: 'Job Post ID',
        minWidth: 148,
        flex: 1,
        renderCell: (params) => {
          return (
            <Link
              onClick={() => {
                setSelectedJobPostId(params.row.jobPostId);
                isOpenDetailDialog.onTrue();
              }}
            >
              {params.row.jobPostNo}
            </Link>
          );
        },
      },
      {
        field: 'jobTitle',
        headerName: 'Job Title',
        minWidth: 330,
        renderCell: (params) => (
          <StyledTypography2Line variant="subtitle2_semibold">
            {params.row.jobTitle}
          </StyledTypography2Line>
        ),
      },
      {
        field: 'departmentName',
        headerName: 'Department',
        minWidth: 160,
        renderCell: (params) => (
          <StyledTypography2Line variant="subtitle2_regular">
            {params.row.departmentName}
          </StyledTypography2Line>
        ),
      },
      {
        field: 'regionName',
        headerName: 'NTL Regional',
        minWidth: 160,
      },
      {
        field: 'provinceName',
        headerName: 'Province',
        minWidth: 160,
      },
      {
        field: 'districtName',
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
        field: 'totalActiveDays',
        headerName: 'Active Day',
        minWidth: 130,
        filterable: false,
      },
      {
        field: 'headcount',
        headerName: 'HC',
        minWidth: 80,
        filterable: false,
      },
      {
        field: 'ownerUserName',
        headerName: 'Owner',
        minWidth: 150,
        filterable: false,
      },
      {
        field: 'statusName',
        headerName: 'Job Status',
        minWidth: 130,
        headerClassName: 'job-status-header',
        cellClassName: 'job-status-cell',
        renderCell: (params) => {
          return (
            <Chip
              label={params.row.statusName}
              variant="soft"
              color={getStatusBadgeColor(params.row.statusName)}
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
        <StyledDataGrid
          rowHeight={64}
          rows={tableData}
          apiRef={apiRef}
          columns={columns}
          getRowId={(row) => row.jobPostId}
          disableVirtualization
          rowCount={totalItem}
          pagination
          paginationMode="server"
          onPaginationModelChange={(model) => {
            onPageChange(model);
          }}
          pageSizeOptions={[defaultPageSize, 15]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: defaultPageSize,
                page: currentPage - 1,
              },
            },
          }}
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
        jobPostId={selectedJobPostId}
      />
    </>
  );
};

export default ListJobTableView;
