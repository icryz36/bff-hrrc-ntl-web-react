import { RefObject, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import dayjs from 'dayjs';
import { pathsNavigate } from 'routes/paths';
import { StyledDataGrid } from 'section/import-file/styles';
import IconifyIcon from 'components/base/IconifyIcon';
import NoRowsOverlayCustom from 'components/common/NoRowsOverlayCustom';

type ProductsTableProps = {
  apiRef: RefObject<GridApiCommunity | null>;
  tableData: any[];
  onPageChange: (model: { page: number; pageSize: number }) => void;
  totalItem: number;
  currentPage: number;
  loading: boolean;
};

export type TBatchListRow = {
  batchId: string;
  fileName: string;
  totalRecords: number;
  successCount: number;
  failCount: number;
  createdDate: string | Date;
  owner?: {
    name?: string;
    surname?: string;
  };
};

const defaultPageSize = 100;

const TrackingAndHistoryTableView = ({
  apiRef,
  tableData,
  totalItem,
  loading,
}: ProductsTableProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const columns: GridColDef<TBatchListRow>[] = useMemo(
    () => [
      {
        field: 'batchId',
        headerName: 'Batch ID',
        width: 300,
        renderCell: (params) => (
          <Typography variant="subtitle2_regular">{params.row.batchId}</Typography>
        ),
      },
      {
        field: 'fileName',
        headerName: 'File Name',
        width: 350,
        renderCell: (params) => (
          <Typography variant="subtitle2_regular">{params.row.fileName}</Typography>
        ),
      },
      {
        field: 'totalRecords',
        headerName: 'Record',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Typography variant="subtitle2_regular">{params.row.totalRecords}</Typography>
        ),
      },
      {
        field: 'successCount',
        headerName: 'Success',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Typography variant="subtitle2_regular">{params.row.successCount}</Typography>
        ),
      },
      {
        field: 'failCount',
        headerName: 'Fail',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Typography color={theme.palette.chRed[400]} variant="subtitle2_regular">
            {params.row.failCount}
          </Typography>
        ),
      },
      {
        field: 'createdDate',
        headerName: 'Import Date',
        width: 150,
        renderCell: (params) => {
          return (
            <Typography variant="subtitle2_regular">
              {dayjs(params.row.createdDate).format('DD/MM/YYYY')}
            </Typography>
          );
        },
      },
      {
        field: 'owner',
        headerName: 'Owners',
        width: 220,
        renderCell: (params) => {
          const fulname = '-';
          if (!params.row?.owner?.name && !params.row?.owner?.surname) {
            return (
              <Stack spacing={2}>
                <Typography variant="subtitle2_regular">{fulname}</Typography>
              </Stack>
            );
          }
          return (
            <Stack spacing={2}>
              <Typography variant="subtitle2_regular">
                {params.row?.owner?.name} {params.row?.owner?.surname}
              </Typography>
            </Stack>
          );
        },
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 130,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <IconButton
            aria-label="batch"
            sx={{ p: 0 }}
            onClick={() =>
              navigate(pathsNavigate.importFile.importDetailBatchId(params.row.batchId))
            }
          >
            <IconifyIcon icon="material-symbols-light:docs-outline-rounded" fontSize="18px" />
          </IconButton>
        ),
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
        getRowId={(row) => row.batchId}
        pageSizeOptions={[defaultPageSize, 15]}
        disableVirtualization
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: defaultPageSize,
            },
          },
        }}
        slots={{
          noRowsOverlay: () => <NoRowsOverlayCustom message="No List File" />,
          basePagination: () => (
            <Stack px={2} justifyContent="flex-start" width="100%" spacing={0.5}>
              <Typography variant="caption_light">Showing</Typography>
              <Typography variant="caption_bold">{totalItem}</Typography>
              <Typography variant="caption_light">items</Typography>
            </Stack>
          ),
        }}
      />
    </Box>
  );
};

export default TrackingAndHistoryTableView;
