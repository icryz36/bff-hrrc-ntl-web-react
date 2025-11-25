import { RefObject, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, ChipOwnProps, Link, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import dayjs from 'dayjs';
import { useBoolean } from 'hooks/useBoolean';
import { navigatePaths } from 'routes/paths';
import ListJobDetailComponent from 'section/management-job/list-job/components/list-job-detail.tsx';
import { useUpdateJobpostStatusMutation } from 'services/jobpost/mutation';
import { TJobPost } from 'types/jobpost';
import DashboardMenu from 'components/common/DashboardMenu';
import DataGridSkeleton from 'components/common/DataGridSkeleton';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import DataGridPagination from 'components/pagination/DataGridPagination';
import { StyledTypographyLine } from 'components/styled/StyledFontLine';
import { StyledDataGrid } from '../styles';

export const getStatusBadgeColor = (val: string): ChipOwnProps['color'] => {
  switch (val?.toLocaleLowerCase()) {
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
  loading: boolean;
}

const ListJobTableView = ({
  apiRef,
  filterButtonEl,
  tableData,
  onPageChange,
  totalItem,
  currentPage,
  loading,
}: ProductsTableProps) => {
  const navigate = useNavigate();
  const isOpenConfirmDeleteDialog = useBoolean();
  const isOpenDetailDialog = useBoolean();
  const isOpenUpdateJobStatusSuccessDialog = useBoolean();
  const isOpenUpdateJobFailedDialog = useBoolean();
  const [selectedJobPostId, setSelectedJobPostId] = useState<string | null>(null);
  const [selectedDeleteJobPostId, setSelectedDeleteJobPostId] = useState<string | null>(null);

  const { mutate: updateJobPostStatus } = useUpdateJobpostStatusMutation();

  const onDelete = () => {
    updateJobPostStatus(
      {
        jobPostId: selectedDeleteJobPostId ?? '',
        statusId: '10265555-dc7c-4c12-8e02-e6b5c751e9ae',
      },
      {
        onSuccess: (response) => {
          if (response.status) {
            isOpenConfirmDeleteDialog.onFalse();
            isOpenUpdateJobStatusSuccessDialog.onTrue();
            return;
          }

          isOpenUpdateJobFailedDialog.onTrue();
        },
        onError: () => {
          isOpenUpdateJobFailedDialog.onTrue();
        },
      },
    );
  };

  const columns: GridColDef<any>[] = useMemo(
    () => [
      {
        field: 'jobPostNo',
        headerName: 'Job Post ID',
        filterable: false,
        sortable: false,
        minWidth: 148,
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
          <StyledTypographyLine line={2} variant="subtitle2_semibold">
            {params.row.jobTitle}
          </StyledTypographyLine>
        ),
      },
      {
        field: 'departmentName',
        headerName: 'Department',
        minWidth: 160,
        renderCell: (params) => (
          <StyledTypographyLine line={2} variant="subtitle2_regular">
            {params.row.departmentName}
          </StyledTypographyLine>
        ),
      },
      {
        field: 'regionName',
        headerName: 'NTL Regional',
        minWidth: 240,
      },
      {
        field: 'provinceName',
        headerName: 'Province',
        filterable: false,
        sortable: false,
        minWidth: 140,
      },
      {
        field: 'districtName',
        headerName: 'District',
        filterable: false,
        sortable: false,
        minWidth: 140,
      },
      {
        field: 'startDate',
        headerName: 'Start Date',
        minWidth: 140,
        filterable: false,
        renderCell: (params) => {
          return dayjs(params.row.startDate).format('DD/MM/YYYY');
        },
      },
      {
        field: 'totalActiveDays',
        headerName: 'Active Day',
        minWidth: 130,
        filterable: false,
        renderCell: (params) => {
          return `${params.row.totalActiveDays} Days`;
        },
      },
      {
        field: 'headcount',
        headerName: 'HC',
        minWidth: 74,
        filterable: false,
      },
      {
        field: 'ownerUserName',
        headerName: 'Owner',
        minWidth: 200,
        filterable: false,
      },
      {
        field: 'statusName',
        headerName: 'Job Status',
        minWidth: 90,
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
        renderCell: (params) => {
          const { statusName, jobPostId } = params.row;

          const menuItems = [
            {
              label: 'Edit',
              icon: 'mdi-light:pencil',
              onClick: () => navigate(navigatePaths.jobPost.editJob(jobPostId)),
            },
            {
              label: 'Duplicate',
              icon: 'material-symbols-light:file-copy-outline',
              onClick: () => navigate(navigatePaths.jobPost.duplicateJob(jobPostId)),
            },
            {
              label: 'Delete',
              icon: 'material-symbols-light:delete-outline-sharp',
              onClick: () => {
                isOpenConfirmDeleteDialog.onTrue();
                setSelectedDeleteJobPostId(jobPostId);
              },
            },
          ];

          const filteredMenu =
            statusName === 'Closed' ? menuItems.filter((m) => m.label !== 'Edit') : menuItems;

          return <DashboardMenu menuItems={filteredMenu} />;
        },
      },
    ],
    [],
  );

  return (
    <>
      <Box width={1}>
        <StyledDataGrid
          loading={loading}
          rowHeight={64}
          rows={tableData}
          apiRef={apiRef}
          columns={columns}
          getRowId={(row) => row.jobPostId}
          disableVirtualization
          rowCount={totalItem}
          checkboxSelection={false}
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
            loadingOverlay: () => <DataGridSkeleton rows={defaultPageSize} />,
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
            <Button
              variant="contained"
              sx={{ backgroundColor: 'error.main' }}
              onClick={() => onDelete()}
            >
              Delete
            </Button>
          </Stack>
        }
      />
      <CustomConfirmDialog
        title="ลบข้อมูลไม่สำเร็จ"
        open={isOpenUpdateJobFailedDialog.value}
        onClose={isOpenUpdateJobFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ไม่สามารถลบรายการนี้ได้ เนื่องจากยังมีผู้สมัครอยู่ในรายการนี้
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenUpdateJobFailedDialog.onFalse}>
            Close
          </Button>
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
