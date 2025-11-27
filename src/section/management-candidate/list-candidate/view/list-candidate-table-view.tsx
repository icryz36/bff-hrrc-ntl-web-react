import { RefObject, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, ChipOwnProps, Link, Typography } from '@mui/material';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import dayjs from 'dayjs';
import { navigatePaths } from 'routes/paths';
import { StyledDataGrid } from 'section/management-job/list-job/styles';
import {
  useCandidateUpdateBlacklistMutation,
  useCandidateUpdateStatusMutation,
} from 'services/candidate/mutation';
import { TCandidateListItems, TCandidateTableRow } from 'types/candidate';
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

  const { mutate: updateCandidateStatus } = useCandidateUpdateStatusMutation();
  const { mutate: updateCandidateBlacklist } = useCandidateUpdateBlacklistMutation();

  const handleUpdateStatus = (candidateId: string, status: 'Active' | 'Inactive') => {
    updateCandidateStatus(
      { candidateId, status },
      {
        onSuccess: () => {},
        onError: () => {},
      },
    );
  };

  const handleUpdateBlacklist = (candidatId: string, isBlacklist: boolean) => {
    updateCandidateBlacklist(
      { candidatId, isBlacklist, blcklistReason: '' },
      {
        onSuccess: () => {},
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
        field: 'candidateId',
        headerName: 'Candidate ID',
        width: 300,
        renderCell: (params) => {
          const { candidateId } = params.row;

          return (
            <Link
              onClick={() => {
                navigate(navigatePaths.candidate.detail(candidateId));
              }}
            >
              {params.row.candidateId}
            </Link>
          );
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
                <Typography color="text.secondary" variant="subtitle1_regular">
                  {params.row.nameTh}
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
              handleUpdateStatus(candidateId, 'Active');
            },
          };

          if (status === 'Active') {
            statusItem = {
              label: 'Inactive',
              icon: 'mdi:minus-circle-outline',
              onClick: () => {
                handleUpdateStatus(candidateId, 'Inactive');
              },
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
              onClick: () => {
                handleUpdateBlacklist(candidateId, !isBlacklist);
              },
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
        onRowSelectionModelChange={(newSelection) => {
          handleSelectionChange(newSelection as any);
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
  );
};

export default ListCandidateTableView;
