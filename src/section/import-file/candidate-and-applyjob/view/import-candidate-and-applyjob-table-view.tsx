import { RefObject, useMemo } from 'react';
import { Box, Chip, ChipOwnProps, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { StyledDataGrid } from 'section/import-file/styles';
import NoRowsOverlayCustom from 'components/common/NoRowsOverlayCustom';
import { StyledTypographyLine } from 'components/styled/StyledFontLine';

type ProductsTableProps = {
  apiRef: RefObject<GridApiCommunity | null>;
  tableData: any[];
  onPageChange: (model: { page: number; pageSize: number }) => void;
  totalItem: number;
  currentPage: number;
  loading: boolean;
};

export const getStatusBadgeColor = (val: string): ChipOwnProps['color'] => {
  switch (val?.toLocaleLowerCase()) {
    case 'success':
      return 'success';
    case 'fail':
      return 'error';
    default:
      return 'primary';
  }
};

const ImportCandidateAndApplyJobTableView = ({
  apiRef,
  tableData,
  loading,
  totalItem,
}: ProductsTableProps) => {
  const columns: GridColDef<any>[] = useMemo(
    () => [
      {
        field: 'validateStatus',
        headerName: 'Validate Status',
        width: 130,
        headerClassName: 'validate-status-header',
        cellClassName: 'validate-status-cell',
        renderCell: (params) => {
          return (
            <Chip
              label={params.row.validateStatus}
              variant="soft"
              color={getStatusBadgeColor(params.row.validateStatus)}
              sx={{ textTransform: 'capitalize' }}
            />
          );
        },
      },
      {
        field: 'errorMsg',
        headerName: 'Error msg',
        width: 200,
        headerClassName: 'error-msg-header',
        cellClassName: 'error-msg-cell',
        renderCell: (params) => {
          const errorMsg = params.row.errorMsg;
          if (!errorMsg || errorMsg.length === 0) {
            return <Typography variant="subtitle2_regular">-</Typography>;
          }

          // Check if errorMsg is array of objects
          if (Array.isArray(errorMsg) && errorMsg.length > 0 && typeof errorMsg[0] === 'object') {
            const errorMessages = errorMsg.map((err: any) => err.errorMsg || err).join(', ');
            return (
              <Tooltip title={errorMessages} placement="bottom">
                <Typography variant="subtitle2_regular" sx={{ whiteSpace: 'normal' }}>
                  {errorMessages}
                </Typography>
              </Tooltip>
            );
          }

          // If it's array of strings
          if (Array.isArray(errorMsg)) {
            return (
              <Typography variant="subtitle2_regular" sx={{ whiteSpace: 'normal' }}>
                {errorMsg.join(', ')}
              </Typography>
            );
          }

          return (
            <Typography variant="subtitle2_regular" sx={{ whiteSpace: 'normal' }}>
              {String(errorMsg)}
            </Typography>
          );
        },
      },
      {
        field: 'no',
        headerName: 'No',
        width: 80,
        renderCell: (params) => (
          <Typography variant="subtitle2_regular">
            {params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}
          </Typography>
        ),
      },
      {
        field: 'title',
        headerName: 'title',
        width: 120,
      },
      {
        field: 'nameTh',
        headerName: 'Name',
        width: 200,
      },
      {
        field: 'surnameTh',
        headerName: 'Surname',
        width: 200,
      },
      {
        field: 'nameEn',
        headerName: 'Name (EN)',
        width: 200,
      },
      {
        field: 'surnameEn',
        headerName: 'Surname (EN)',
        width: 200,
      },
      {
        field: 'gender',
        headerName: 'Gender',
        width: 120,
      },
      {
        field: 'age',
        headerName: 'Age',
        width: 100,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 240,
      },
      {
        field: 'mobileNo',
        headerName: 'Mobile Number',
        width: 200,
      },
      {
        field: 'desiredLocation',
        headerName: 'Desired Location',
        width: 170,
      },
      {
        field: 'desiredProvince',
        headerName: 'Desired Province',
        width: 150,
      },
      {
        field: 'source',
        headerName: 'Source',
        width: 160,
      },
      {
        field: 'highestDegree',
        headerName: 'Highest Education',
        width: 160,
      },
      {
        field: 'workExperience',
        headerName: 'Work Experience',
        width: 250,
        renderCell: (params) => (
          <Tooltip title={params.row.workExperience} placement="bottom">
            <StyledTypographyLine line={1} variant="subtitle2_regular">
              {params.row.workExperience}
            </StyledTypographyLine>
          </Tooltip>
        ),
      },
      {
        field: 'canDriveMotorcycle',
        headerName: 'ความสามารถในการขับรถจักรยานยนต์',
        width: 250,
      },
      {
        field: 'canDriveCar',
        headerName: 'ความสามารถในการขับรถยนต์',
        width: 200,
      },
      {
        field: 'jobPostNo',
        headerName: 'Job Post No.',
        width: 140,
      },
      {
        field: 'applicationSource',
        headerName: 'Application Source',
        width: 160,
      },
      {
        field: 'applicationDate',
        headerName: 'Application Date.',
        width: 145,
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
        getRowId={(row: any) => {
          // Use unique identifier if available, otherwise use email or generate unique id
          if (row.id) return row.id;
          if (row.email) {
            const index = tableData.findIndex((item) => item === row);
            return `${row.email}-${index}`;
          }
          const index = tableData.findIndex((item) => item === row);
          return `row-${index}`;
        }}
        disableVirtualization
        hideFooter
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: tableData.length || 100,
            },
          },
        }}
        sx={{
          '& .MuiDataGrid-main': {
            height: totalItem > 0 ? '100%' : '320px',
          },
        }}
        slots={{
          noRowsOverlay: () => <NoRowsOverlayCustom message="No List File" />,
        }}
      />
    </Box>
  );
};

export default ImportCandidateAndApplyJobTableView;
