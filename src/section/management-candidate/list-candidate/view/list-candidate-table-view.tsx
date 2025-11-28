import { RefObject, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Chip, ChipOwnProps, Link, Stack, TextField, Typography } from '@mui/material';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import dayjs from 'dayjs';
import { useBoolean } from 'hooks/useBoolean';
import { navigatePaths } from 'routes/paths';
import { StyledDataGrid } from 'section/management-job/list-job/styles';
import {
  useCandidateUpdateBlacklistMutation,
  useCandidateUpdateStatusMutation,
} from 'services/candidate/mutation';
import { TCandidateListItems, TCandidateTableRow } from 'types/candidate';
import DashboardMenu from 'components/common/DashboardMenu';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
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
type SelectionType = {
  type: 'include';
  ids: string[];
};

const defaultPageSize = 10;

type ProductsTableProps = {
  apiRef: RefObject<GridApiCommunity | null>;
  filterButtonEl: HTMLButtonElement | null;
  tableData: TCandidateListItems[];
  onPageChange: (model: { page: number; pageSize: number }) => void;
  totalItem: number;
  currentPage: number;
  loading: boolean;
};

const ListCandidateTableView = ({
  apiRef,
  filterButtonEl,
  tableData,
  loading,
}: ProductsTableProps) => {
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const isOpenConfirmActiveStatusDialog = useBoolean();
  const isOpenActiveStatusDialog = useBoolean();
  const isOpenConfirmBlacklistDialog = useBoolean();
  const isOpenBlacklistDialog = useBoolean();

  const { mutate: updateCandidateStatus, isPending: isUpdatingStatus } =
    useCandidateUpdateStatusMutation();
  const { mutate: updateCandidateBlacklist, isPending: isUpdatingBlacklist } =
    useCandidateUpdateBlacklistMutation();

  const [updateStatus, setUpdateStatus] = useState<{
    candidateId: string;
    status: 'Active' | 'Inactive';
  }>({
    candidateId: '',
    status: 'Active',
  });

  const [updateBlacklist, setUpdateBlacklist] = useState<{
    candidateId: string;
    isBlacklist: boolean;
  }>({
    candidateId: '',
    isBlacklist: true,
  });

  const [blcklistReason, setBlcklistReason] = useState<string>('');

  const handleUpdateStatus = (candidateId: string, status: 'Active' | 'Inactive') => {
    updateCandidateStatus(
      { candidateId, status },
      {
        onSuccess: () => {
          isOpenConfirmActiveStatusDialog.onFalse();
          isOpenActiveStatusDialog.onTrue();
        },
        onError: () => {},
      },
    );
  };

  const handleUpdateBlacklist = () => {
    updateCandidateBlacklist(
      {
        candidatId: updateBlacklist.candidateId,
        isBlacklist: updateBlacklist.isBlacklist,
        blcklistReason,
      },
      {
        onSuccess: () => {
          isOpenConfirmBlacklistDialog.onFalse();
          isOpenBlacklistDialog.onTrue();
          setBlcklistReason('');
        },
        onError: () => {},
      },
    );
  };

  console.log('selectedCandidateIds', selectedCandidateIds);
  const handleSelectionChange = (newSelection: SelectionType) => {
    const myArray = Array.from(newSelection.ids);
    setSelectedCandidateIds(myArray);
  };

  const columns: GridColDef<TCandidateTableRow>[] = useMemo(
    () => [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 64,
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
                <Typography color="text.secondary" variant="subtitle1_regular">
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
        renderCell: (params) => {
          return (
            <>
              {params.row.titleNameTh ? (
                <Typography color="text.secondary" variant="subtitle1_regular">
                  {params.row.titleNameTh}
                </Typography>
              ) : (
                <Typography color="text.secondary" variant="subtitle1_regular">
                  -
                </Typography>
              )}
            </>
          );
        },
      },
      {
        field: 'nameTh',
        headerName: 'Name',
        width: 160,
        renderCell: (params) => {
          return (
            <>
              {params.row.nameTh ? (
                <Link
                  onClick={() => {
                    navigate(navigatePaths.candidate.detail(params.row.candidateId));
                  }}
                >
                  <Typography variant="subtitle1_regular">{params.row.nameTh}</Typography>
                </Link>
              ) : (
                <Typography color="text.secondary" variant="subtitle1_regular">
                  -
                </Typography>
              )}
            </>
          );
        },
      },
      {
        field: 'surnameTh',
        headerName: 'Surename',
        width: 200,
        renderCell: (params) => {
          return (
            <>
              {params.row.surnameTh ? (
                <Typography color="text.secondary" variant="subtitle1_regular">
                  {params.row.surnameTh}
                </Typography>
              ) : (
                <Typography color="text.secondary" variant="subtitle1_regular">
                  -
                </Typography>
              )}
            </>
          );
        },
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
        renderCell: (params) => {
          return dayjs(params.row.startDate).format('DD/MM/YYYY');
        },
      },
      {
        field: 'countJobApplication',
        headerName: 'Applied Jobs',
        width: 130,
      },

      {
        field: 'candidateId',
        headerName: 'Candidate ID',
        width: 300,
      },
      {
        field: 'status',
        headerName: 'Job Status',
        width: 90,
        headerClassName: 'job-status-header',
        cellClassName: 'job-status-cell',
        renderCell: (params) => {
          return (
            <>
              <Chip
                label={params.row.status}
                variant="soft"
                color={getStatusBadgeColor(params.row.status)}
              />
            </>
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
          const { candidateId, status, isBlacklist } = params.row;

          let statusItem = {
            label: 'Active',
            icon: 'mdi:check-circle-outline',
            onClick: () => {
              isOpenConfirmActiveStatusDialog.onTrue();
              setUpdateStatus({
                candidateId,
                status: 'Active',
              });
            },
          };

          if (status === 'Active') {
            statusItem = {
              label: 'Inactive',
              icon: 'mdi:minus-circle-outline',
              onClick: () => {
                isOpenConfirmActiveStatusDialog.onTrue();
                setUpdateStatus({
                  candidateId,
                  status: 'Inactive',
                });
              },
            };
          }
          const menuItems = [
            {
              label: 'Edit',
              icon: 'mdi:edit-outline',
              onClick: () => {
                navigate(navigatePaths.candidate.edit(candidateId));
              },
            },
            statusItem,
            {
              label: 'Black List',
              icon: 'mdi:close-octagon-outline',
              onClick: () => {
                setUpdateBlacklist({
                  candidateId,
                  isBlacklist: true,
                });
                isOpenConfirmBlacklistDialog.onTrue();
              },
            },
          ];

          const filteredMenuItems = menuItems.filter(
            (item) => !(isBlacklist && item.label === 'Black List'),
          );

          return <DashboardMenu menuItems={filteredMenuItems} />;
        },
      },
    ],
    [],
  );

  return (
    <>
      <Box sx={{ width: 1 }}>
        <StyledDataGrid
          rowHeight={64}
          rows={tableData}
          loading={loading}
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
          onRowSelectionModelChange={(newSelection) => {
            handleSelectionChange(newSelection as any);
          }}
          slotProps={{
            panel: {
              target: filterButtonEl,
            },
          }}
        />
      </Box>
      <CustomConfirmDialog
        title="ยืนยันการเปลี่ยนสถานะ"
        open={isOpenConfirmActiveStatusDialog.value}
        onClose={isOpenConfirmActiveStatusDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1" whiteSpace="pre-wrap">
            {`คุณต้องการเปลี่ยนสถานะผู้สมัครเป็น ${updateStatus.status} หรือไม่`}
          </Typography>
        }
        action={
          <Stack spacing={1}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={isOpenConfirmActiveStatusDialog.onFalse}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isUpdatingStatus}
              variant="contained"
              sx={{ backgroundColor: 'primary' }}
              onClick={() => handleUpdateStatus(updateStatus.candidateId, updateStatus.status)}
            >
              Comfirm
            </LoadingButton>
          </Stack>
        }
      />

      <CustomConfirmDialog
        title="Blacklist*"
        open={isOpenConfirmBlacklistDialog.value}
        onClose={isOpenConfirmBlacklistDialog.onFalse}
        description={
          <Box>
            <Typography variant="subtitle1_regular">
              Provide a reason for blacklisting. The candidate will be blocked from future
              applications.
            </Typography>
            <TextField
              label="write a Note"
              multiline
              rows={4}
              fullWidth
              sx={{ mt: 2 }}
              value={blcklistReason}
              onChange={(e) => setBlcklistReason(e.target.value)}
            />
          </Box>
        }
        action={
          <Stack spacing={1}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                isOpenConfirmBlacklistDialog.onFalse();
                setBlcklistReason('');
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isUpdatingBlacklist}
              variant="contained"
              sx={{ backgroundColor: 'primary' }}
              onClick={() => handleUpdateBlacklist()}
            >
              Comfirm
            </LoadingButton>
          </Stack>
        }
      />

      <CustomConfirmDialog
        title="เปลี่ยนสถานะสำเร็จ"
        open={isOpenActiveStatusDialog.value}
        onClose={isOpenActiveStatusDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ดำเนินการเปลี่ยนสถานะผู้สมัครเรียบร้อยแล้ว
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenActiveStatusDialog.onFalse}>
            Close
          </Button>
        }
      />

      <CustomConfirmDialog
        title="แบนผู้สมัครสำเร็จ"
        open={isOpenBlacklistDialog.value}
        onClose={isOpenBlacklistDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ระบบได้บันทึกการแบนผู้สมัครเรียบร้อยแล้ว
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenBlacklistDialog.onFalse}>
            Close
          </Button>
        }
      />
    </>
  );
};

export default ListCandidateTableView;
