import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  borderRadius: '8px',
  overflow: 'hidden',
  '& .MuiPaginationItem-root.Mui-selected': {
    backgroundColor: theme.palette.chRed[500],
    color: theme.palette.common.white,
  },
  '& .MuiDataGrid-row .MuiDataGrid-cell:nth-of-type(2):not(.MuiDataGrid-cellCheckbox)': {
    paddingLeft: '10px !important',
  },
  '& .job-status-cell': {
    position: 'sticky',
    right: 90,
    background: theme.palette.background.paper,
    zIndex: 5,
    boxShadow: theme.shadows[1],
  },
  '& .job-status-header': {
    position: 'sticky',
    right: 90,
    background: theme.palette.grey[100],
    zIndex: 5,
    boxShadow: theme.shadows[1],
  },
  '& .action-cell': {
    position: 'sticky',
    right: 0,
    background: theme.palette.background.paper,
    zIndex: 6,
  },
  '& .action-header': {
    position: 'sticky',
    right: 0,
    background: theme.palette.grey[100],
    zIndex: 6,
  },
  '& .MuiDataGrid-row, .MuiDataGrid-columnHeaders': {
    overflow: 'visible !important',
  },
  '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none',
    boxShadow: 'none',
  },
}));

export const StyledTypography2Line = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
}));
