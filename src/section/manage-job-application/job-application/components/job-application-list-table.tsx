import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, Link, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { pathsNavigate } from 'routes/paths';
import { TJobPost } from 'types/jobpost';
import NoRowsOverlayCustom from 'components/common/NoRowsOverlayCustom';
import DataGridPagination from 'components/pagination/DataGridPagination';
import { StyledTypographyLine } from 'components/styled/StyledFontLine';
import { getStatusJpbBadgeColor } from '../helper';

// ----------------------------------------------------------------------

type ListJobApplicationTableProps = {
  totalData: number;
  isLoading: boolean;
  tableData: TJobPost[];
  paginationModel: GridPaginationModel;
  onChangePaginationModel: (model: GridPaginationModel) => void;
};

const JobApplicationListTable = ({
  tableData,
  totalData,
  isLoading,
  paginationModel,
  onChangePaginationModel,
}: ListJobApplicationTableProps) => {
  const defaultPageSize = 10;
  const navigate = useNavigate();

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        sortable: true,
        minWidth: 148,
        field: 'jobPostNo',
        headerName: 'Job Post ID',
        renderCell: (params) => {
          return (
            <Link
              onClick={() => {
                navigate(pathsNavigate.jobApplication.detail(params.row.jobPostId));
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
        sortable: true,
        minWidth: 330,
        renderCell: (params) => (
          <Tooltip title={params.row.jobTitle} placement="bottom">
            <StyledTypographyLine line={2} variant="subtitle2_semibold">
              {params.row.jobTitle}
            </StyledTypographyLine>
          </Tooltip>
        ),
      },
      {
        field: 'departmentName',
        headerName: 'Department',
        minWidth: 160,
        renderCell: (params) => (
          <Tooltip title={params.row.departmentName} placement="bottom">
            <StyledTypographyLine line={2} variant="subtitle2_regular">
              {params.row.departmentName}
            </StyledTypographyLine>
          </Tooltip>
        ),
      },
      {
        field: 'regionName',
        headerName: 'NTL Regional',
        sortable: true,
        minWidth: 240,
      },
      {
        field: 'provinceName',
        headerName: 'Province',
        sortable: true,
        minWidth: 140,
      },
      {
        field: 'districtName',
        headerName: 'District',
        sortable: true,
        minWidth: 140,
      },
      {
        field: 'startDate',
        headerName: 'Start Date',
        minWidth: 140,
        sortable: true,
        renderCell: (params) => {
          return dayjs(params.row.startDate).format('DD/MM/YYYY');
        },
      },
      {
        field: 'totalActiveDays',
        headerName: 'Active Day',
        minWidth: 130,
        sortable: true,
        renderCell: (params) => {
          return `${params.row.totalActiveDays} Days`;
        },
      },
      {
        field: 'headcount',
        headerName: 'HC',
        minWidth: 74,
        sortable: true,
      },
      {
        field: 'ownerUserName',
        headerName: 'Owner',
        minWidth: 200,
        sortable: true,
      },
      {
        minWidth: 90,
        sortable: true,
        field: 'statusName',
        headerName: 'Status',
        headerClassName: 'job-status-header',
        cellClassName: 'job-status-cell',
        renderCell: (params) => {
          return (
            <Chip
              label={params.row.statusName}
              variant="soft"
              color={getStatusJpbBadgeColor(params.row.statusName)}
              sx={{ textTransform: 'capitalize' }}
            />
          );
        },
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
        getRowId={(row) => row.jobPostId}
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

export default JobApplicationListTable;
