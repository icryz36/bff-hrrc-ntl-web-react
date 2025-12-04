import { RefObject, useMemo } from 'react';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { StyledDataGrid } from 'section/import-file/styles';
import NoRowsOverlayCustom from 'components/common/NoRowsOverlayCustom';
import DataGridPagination from 'components/pagination/DataGridPagination';

type ProductsTableProps = {
  apiRef: RefObject<GridApiCommunity | null>;
  tableData: any[];
  onPageChange: (model: { page: number; pageSize: number }) => void;
  totalItem: number;
  currentPage: number;
  loading: boolean;
};

const defaultPageSize = 10;

const TrackingAndHistoryTableView = ({ apiRef, tableData, loading }: ProductsTableProps) => {
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
          basePagination: (props) => <DataGridPagination showFullPagination {...props} />,
        }}
      />
    </Box>
  );
};

export default TrackingAndHistoryTableView;
