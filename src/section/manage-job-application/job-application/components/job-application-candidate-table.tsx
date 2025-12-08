import { useMemo } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { TCandidateListItems } from 'types/candidate';
import NoRowsOverlayCustom from 'components/common/NoRowsOverlayCustom';
import DataGridPagination from 'components/pagination/DataGridPagination';

// ----------------------------------------------------------------------

type JobApplicationCandidateTableProps = {
  totalData: number;
  isLoading: boolean;
  tableData: TCandidateListItems[];
  paginationModel: GridPaginationModel;
  onViewCandidateDetail: (id: string) => void;
  onChangePaginationModel: (model: GridPaginationModel) => void;
};

export const JobApplicationCandidateTable = ({
  tableData,
  totalData,
  isLoading,
  paginationModel,
  onViewCandidateDetail,
  onChangePaginationModel,
}: JobApplicationCandidateTableProps) => {
  const defaultPageSize = 10;

  const columns: GridColDef<TCandidateListItems>[] = useMemo(
    () => [
      {
        field: 'titleNameTh',
        headerName: 'Title',
        sortable: true,
        width: 120,
      },
      {
        field: 'nameTh',
        headerName: 'Name',
        width: 160,
        sortable: true,
        renderCell: (params) => {
          return (
            <Link
              onClick={() => {
                onViewCandidateDetail(params.row.candidateId);
              }}
            >
              <Typography variant="subtitle2_regular">{params.row.nameTh}</Typography>
            </Link>
          );
        },
      },
      {
        field: 'surnameTh',
        headerName: 'Surename',
        sortable: true,
        width: 120,
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: true,
        width: 200,
      },
      {
        field: 'mobileNo',
        headerName: 'Mobile Number',
        sortable: true,
        width: 180,
      },
      {
        field: 'updatedDate',
        headerName: 'Last Update',
        width: 130,
        renderCell: (params) => {
          return dayjs(params.row.updatedDate).format('DD/MM/YYYY');
        },
      },
      {
        field: 'candidateId',
        sortable: true,
        headerName: 'Candidate ID',
        width: 300,
      },

      // TODO:  waiting be return
      {
        field: '1',
        sortable: true,
        headerName: 'Position From HRMS',
        width: 200,
        renderCell: () => {
          return '-';
        },
      },
      {
        field: '2',
        sortable: true,
        headerName: 'Stage',
        width: 200,
        renderCell: () => {
          return '-';
        },
      },
      {
        field: '3',
        sortable: true,
        headerName: 'Stage Status',
        width: 200,
        renderCell: () => {
          return '-';
        },
      },
      {
        field: '4',
        sortable: true,
        headerName: 'Stage Reason',
        width: 200,
        renderCell: () => {
          return '-';
        },
      },
      {
        field: 'action',
        sortable: true,
        headerName: 'Action',
        width: 200,
      },
    ],
    [],
  );

  return (
    <Box sx={{ width: 1 }}>
      <DataGrid
        rowHeight={64}
        rows={tableData}
        columns={columns}
        loading={isLoading}
        rowCount={totalData}
        getRowId={(row) => row.candidateId}
        slots={{
          noRowsOverlay: () => <NoRowsOverlayCustom message="No List Job Application" />,
          basePagination: (props) => <DataGridPagination showFullPagination {...props} />,
        }}
        // pagination
        pagination
        paginationMode="server"
        pageSizeOptions={[defaultPageSize]}
        paginationModel={paginationModel}
        onPaginationModelChange={onChangePaginationModel}
      />
    </Box>
  );
};
