import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

// ----------------------------------------------------------------------

export const StyledDataGrid = styled(DataGrid)(() => ({
  '& .MuiPaginationItem-root.Mui-selected': {
    backgroundColor: '#E31837',
    color: '#fff',
  },
  '& .job-status-cell': {
    position: 'sticky',
    right: 90,
    background: '#FFF',
    zIndex: 5,
    boxShadow: '-5px 0px 10px 0px #0000000D',
  },
  '& .job-status-header': {
    position: 'sticky',
    right: 90,
    background: '#F7FAFC',
    zIndex: 5,
    boxShadow: '-5px 0px 10px 0px #0000000D',
  },
  '& .action-cell': {
    position: 'sticky',
    right: 0,
    background: '#fff',
    zIndex: 6,
  },
  '& .action-header': {
    position: 'sticky',
    right: 0,
    background: '#F7FAFC',
    zIndex: 6,
  },
  '& .MuiDataGrid-row, .MuiDataGrid-columnHeaders': {
    overflow: 'visible !important',
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
