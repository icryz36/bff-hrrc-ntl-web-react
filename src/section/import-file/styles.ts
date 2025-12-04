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
  '& .validate-status-cell': {
    position: 'sticky',
    left: 0,
    background: theme.palette.background.paper,
    zIndex: 6,
  },
  '& .validate-status-header': {
    position: 'sticky',
    left: 0,
    background: theme.palette.grey[100],
    zIndex: 6,
  },
  '& .error-msg-cell': {
    position: 'sticky',
    left: 130,
    background: theme.palette.background.paper,
    zIndex: 5,
    boxShadow: theme.shadows[1],
  },
  '& .error-msg-header': {
    position: 'sticky',
    left: 130,
    background: theme.palette.grey[100],
    zIndex: 5,
    boxShadow: theme.shadows[1],
  },
  '& .MuiDataGrid-row, .MuiDataGrid-columnHeaders': {
    overflow: 'visible !important',
  },
  '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none',
    boxShadow: 'none',
  },
  '& .row-disabled': {
    opacity: 0.6,
    background: theme.palette.grey[200],
    pointerEvents: 'none',
  },
}));
