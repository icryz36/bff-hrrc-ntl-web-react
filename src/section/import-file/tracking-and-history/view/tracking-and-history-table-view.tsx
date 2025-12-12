import { RefObject, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
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

const defaultPageSize = 10;

const TrackingAndHistoryTableView = ({
  apiRef,
  tableData,
  totalItem,
  loading,
}: ProductsTableProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const columns: GridColDef<any>[] = useMemo(
    () => [
      {
        field: 'batchId',
        headerName: 'Batch ID',
        width: 142,
      },
      {
        field: 'fileName',
        headerName: 'File Name',
        width: 350,
      },
      {
        field: 'record',
        headerName: 'Record',
        width: 130,
      },
      {
        field: 'success',
        headerName: 'Success',
        width: 130,
      },
      {
        field: 'fail',
        headerName: 'Fail',
        width: 130,
        renderCell: (params) => (
          <Typography color={theme.palette.chRed[400]}>{params.row.fail}</Typography>
        ),
      },
      {
        field: 'importDate',
        headerName: 'Import Date',
        width: 150,
      },
      {
        field: 'owner',
        headerName: 'Owners',
        width: 330,
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 130,
        renderCell: (params) => (
          <IconButton
            aria-label="batch"
            sx={{ p: 0 }}
            onClick={() => navigate(pathsNavigate.importFile.importDetailBatchId(params.row.id))}
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
        getRowId={(row) => row.id}
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
