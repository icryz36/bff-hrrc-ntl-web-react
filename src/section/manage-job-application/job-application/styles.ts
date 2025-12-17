import { Button, TextField, styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const StyledSearchTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: 36,
    borderRadius: '8px',
  },
});

export const StyledDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
    display: 'none',
  },
});

export const StyledStatusButton = styled(Button)(({ theme }) => ({
  // px: 3,
  borderRadius: 999,
  color: theme.palette.success.dark,
  borderColor: theme.palette.success.darker,
  backgroundColor: theme.palette.success.lighter,
}));
