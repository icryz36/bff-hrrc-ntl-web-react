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

type FieldError = {
  field: string;
  errorMsg: string;
};

type ImportCandidateRow = {
  id?: string;
  validateStatus: string;
  errorMsg?: FieldError[];

  title?: string;
  nameTh?: string;
  surnameTh?: string;
  gender?: string;
  age?: number | string;
  email?: string;
  mobileNo?: string;

  desiredLocation?: string;
  desiredProvince?: string;
  source?: string;
  highestDegree?: string;
  workExperience?: string;

  canDriveMotorcycle?: string;
  canDriveCar?: string;

  jobPostNo?: string;
  applicationSource?: string;
  applicationDate?: string;
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
  const getFieldError = (errorMsg: any[] | undefined, field: string): string | null => {
    if (!Array.isArray(errorMsg)) return null;

    const found = errorMsg.find((err) => err.field === field);
    return found ? found.errorMsg : null;
  };

  const columns: GridColDef<ImportCandidateRow>[] = useMemo(
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

          if (Array.isArray(errorMsg) && errorMsg.length > 0 && typeof errorMsg[0] === 'object') {
            const errorMessages = errorMsg.map((err: any) => err.errorMsg || err).join(', ');
            return (
              <Tooltip title={errorMessages} placement="bottom">
                <StyledTypographyLine line={2} variant="subtitle2_regular">
                  {errorMessages}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

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
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'title');
          if (!error) {
            return <Typography variant="subtitle2_regular">{params.row.title || '-'}</Typography>;
          }
          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.title || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'nameTh',
        headerName: 'name',
        width: 200,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'nameTh');

          if (!error) {
            return (
              <Tooltip title={params.row.nameTh} placement="bottom">
                <StyledTypographyLine line={1} variant="subtitle2_regular">
                  {params.row.nameTh}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.nameTh || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'surnameTh',
        headerName: 'Surname',
        width: 200,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'surnameTh');

          if (!error) {
            return (
              <Tooltip title={params.row.surnameTh} placement="bottom">
                <StyledTypographyLine line={1} variant="subtitle2_regular">
                  {params.row.surnameTh}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.surnameTh || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'gender',
        headerName: 'Gender',
        width: 120,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'gender');

          if (!error) {
            return (
              <Tooltip title={params.row.gender} placement="bottom">
                <StyledTypographyLine line={1} variant="subtitle2_regular">
                  {params.row.gender || '-'}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.gender || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'age',
        headerName: 'Age',
        width: 100,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'age');

          if (!error) {
            return (
              <Tooltip title={params.row.age} placement="bottom">
                <StyledTypographyLine line={1} variant="subtitle2_regular">
                  {params.row.age}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.age || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 240,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'email');

          if (!error) {
            return (
              <Tooltip title={params.row.email} placement="bottom">
                <StyledTypographyLine line={1} variant="subtitle2_regular">
                  {params.row.email}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.email || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'mobileNo',
        headerName: 'Mobile Number',
        width: 200,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'mobileNo');

          if (!error) {
            return (
              <Tooltip title={params.row.mobileNo} placement="bottom">
                <StyledTypographyLine line={1} variant="subtitle2_regular">
                  {params.row.mobileNo}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.mobileNo || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'desiredLocation',
        headerName: 'Desired Location',
        width: 170,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'desiredLocation');

          if (!error) {
            return (
              <Tooltip title={params.row.desiredLocation} placement="bottom">
                <StyledTypographyLine line={1} variant="subtitle2_regular">
                  {params.row.desiredLocation}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.desiredLocation || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'desiredProvince',
        headerName: 'Desired Province',
        width: 150,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'desiredProvince');

          if (!error) {
            return (
              <Tooltip title={params.row.desiredProvince} placement="bottom">
                <StyledTypographyLine line={1} variant="subtitle2_regular">
                  {params.row.desiredProvince}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.desiredProvince || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'source',
        headerName: 'Source',
        width: 160,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'source');

          if (!error) {
            return (
              <Tooltip title={params.row.source} placement="bottom">
                <StyledTypographyLine line={1} variant="subtitle2_regular">
                  {params.row.source || '-'}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.source || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'highestDegree',
        headerName: 'Highest Education',
        width: 160,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'highestDegree');

          if (!error) {
            return (
              <Tooltip title={params.row.highestDegree} placement="bottom">
                <StyledTypographyLine line={1} variant="subtitle2_regular">
                  {params.row.highestDegree}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.highestDegree || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'workExperience',
        headerName: 'Work Experience',
        width: 250,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'workExperience');

          if (!error) {
            return (
              <Tooltip title={params.row.workExperience} placement="bottom">
                <StyledTypographyLine line={1} variant="subtitle2_regular">
                  {params.row.workExperience}
                </StyledTypographyLine>
              </Tooltip>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.workExperience || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'canDriveMotorcycle',
        headerName: 'ความสามารถในการขับรถจักรยานยนต์',
        width: 250,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'canDriveMotorcycle');

          if (!error) {
            return (
              <Typography variant="subtitle2_regular">
                {params.row.canDriveMotorcycle || '-'}
              </Typography>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.canDriveMotorcycle || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'canDriveCar',
        headerName: 'ความสามารถในการขับรถยนต์',
        width: 200,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'canDriveCar');

          if (!error) {
            return (
              <Typography variant="subtitle2_regular">{params.row.canDriveCar || '-'}</Typography>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.canDriveCar || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'jobPostNo',
        headerName: 'Job Post No.',
        width: 140,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'jobPostNo');

          if (!error) {
            return (
              <Typography variant="subtitle2_regular">{params.row.jobPostNo || '-'}</Typography>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.jobPostNo || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'applicationSource',
        headerName: 'Application Source',
        width: 160,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'applicationSource');

          if (!error) {
            return (
              <Typography variant="subtitle2_regular">
                {params.row.applicationSource || '-'}
              </Typography>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.applicationSource || '-'}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'applicationDate',
        headerName: 'Application Date.',
        width: 145,
        renderCell: (params) => {
          const error = getFieldError(params.row.errorMsg, 'applicationDate');

          if (!error) {
            return (
              <Typography variant="subtitle2_regular">
                {params.row.applicationDate || '-'}
              </Typography>
            );
          }

          return (
            <Tooltip title={error} placement="bottom">
              <Typography variant="subtitle2_regular" color="error">
                {params.row.applicationDate || '-'}
              </Typography>
            </Tooltip>
          );
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
        getRowId={(row: any) => {
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
