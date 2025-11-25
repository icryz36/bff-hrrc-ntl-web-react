import { useMemo } from 'react';
import { Box, Chip, ChipOwnProps } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useGridApiRef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { StyledDataGrid } from 'section/management-job/list-job/styles';
import { TJobApplications } from 'types/candidate';
import { StyledTypographyLine } from 'components/styled/StyledFontLine';

const defaultPageSize = 10;

export const getStatusBadgeColor = (val: string): ChipOwnProps['color'] => {
  switch (val?.toLocaleLowerCase()) {
    case 'interview':
      return 'success';
    default:
      return 'neutral';
  }
};

const AppliedJobTable = ({ tableData }: { tableData: TJobApplications[] }) => {
  const apiRef = useGridApiRef();

  const columns: GridColDef<any>[] = useMemo(
    () => [
      {
        field: 'jobAppId',
        headerName: 'Job Post ID',
        width: 104,
      },
      {
        field: 'jobTitle',
        headerName: 'Job Title',
        width: 380,
        renderCell: (params) => {
          return (
            <StyledTypographyLine variant="subtitle2_regular" line={1}>
              {params.row.jobTitle}
            </StyledTypographyLine>
          );
        },
      },
      {
        field: 'ownerName',
        headerName: 'Owner',
        width: 136,
      },
      {
        field: 'applicationDate',
        headerName: 'Apply Date',
        width: 136,
        renderCell: (params) => {
          return dayjs(params.row.startDate).format('DD/MM/YYYY');
        },
      },
      {
        field: 'updatedDate',
        headerName: 'Last Update',
        width: 136,
        renderCell: (params) => {
          return dayjs(params.row.startDate).format('DD/MM/YYYY');
        },
      },
      {
        field: 'jobStatus',
        headerName: 'Status',
        width: 136,
        renderCell: (params) => {
          return (
            <Chip
              label={params.row.jobStatus.statusNameEn}
              variant="soft"
              color={getStatusBadgeColor(params.row.jobStatus.statusNameEn)}
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
      <StyledDataGrid
        rowHeight={64}
        rows={tableData}
        apiRef={apiRef}
        getRowId={(row) => row.jobAppId}
        columns={columns}
        pageSizeOptions={[defaultPageSize, 15]}
        disableVirtualization
        hideFooter
      />
    </Box>
  );
};

export default AppliedJobTable;
