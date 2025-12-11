import { Dispatch, SetStateAction, useMemo } from 'react';
import { GridColDef, GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid';
import { TCandidateListItems } from 'types/candidate';
import NoRowsOverlayCustom from 'components/common/NoRowsOverlayCustom';
import DataGridPagination from 'components/pagination/DataGridPagination';
import { StyledDataGrid } from '../styles';

// ----------------------------------------------------------------------

type JobApplicationApplyCandidateTableProps = {
  totalData: number;
  isLoading: boolean;
  tableData: TCandidateListItems[];
  paginationModel: GridPaginationModel;
  selectedCandidate: GridRowSelectionModel;
  onChangePaginationModel: (model: GridPaginationModel) => void;
  onSetSelectedCandidate: Dispatch<SetStateAction<GridRowSelectionModel>>;
};

export const JobApplicationApplyCandidateTable = ({
  tableData,
  totalData,
  isLoading,
  paginationModel,
  selectedCandidate,
  onSetSelectedCandidate,
  onChangePaginationModel,
}: JobApplicationApplyCandidateTableProps) => {
  const MAX_SELECTION = 10;

  const columns: GridColDef<TCandidateListItems>[] = useMemo(
    () => [
      {
        field: 'nameTh',
        headerName: 'Name',
        width: 160,
        sortable: true,
      },
      {
        field: 'surnameTh',
        headerName: 'Surename',
        sortable: true,
        width: 120,
      },
      {
        field: 'desiredProvince',
        headerName: 'Desired Province',
        sortable: true,
        width: 200,
        renderCell: () => {
          return '-';
        },
      },
      {
        field: 'countJobApplication',
        headerName: 'Apply job',
        sortable: true,
        width: 120,
      },
      {
        field: 'candidateId',
        sortable: true,
        width: 300,
        headerName: 'Candidate ID',
      },
    ],
    [],
  );

  return (
    <StyledDataGrid
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
      paginationModel={paginationModel}
      pageSizeOptions={[paginationModel.pageSize]}
      onPaginationModelChange={onChangePaginationModel}
      // checkbox
      checkboxSelection
      keepNonExistentRowsSelected
      rowSelectionModel={selectedCandidate}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        onSetSelectedCandidate(newRowSelectionModel);
      }}
      isRowSelectable={(params) => {
        return selectedCandidate.ids.size < MAX_SELECTION || selectedCandidate.ids.has(params.id);
      }}
    />
  );
};
