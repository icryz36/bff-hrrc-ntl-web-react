import { useState } from 'react';
import { Box, Button, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon.tsx';
import { FilterState } from './type';

// ----------------------------------------------------------------------

interface FilterMenuContentProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onClose: () => void;
}

// ----------------------------------------------------------------------

const FilterMenuContent = ({ onClose, filters, setFilters }: FilterMenuContentProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      status: '',
      name: '',
      surname: '',
      email: '',
      mobileNumber: '',
    };
    setLocalFilters(resetFilters);
  };

  return (
    <Box p={3} maxHeight="80vh">
      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Filter</Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ p: 0 }}>
          <IconifyIcon icon="material-symbols-light:close-rounded" fontSize="20px" />
        </IconButton>
      </Stack>
      <Typography variant="body2" sx={{ my: 2 }}>
        Easily find the Candidate you're looking for using filters.
      </Typography>

      <Stack spacing={2} direction="column">
        <TextField
          label="Status"
          select
          value={localFilters.status}
          onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
          fullWidth
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        <TextField
          label="Name"
          value={localFilters.name}
          onChange={(e) => setLocalFilters({ ...localFilters, name: e.target.value })}
          fullWidth
        />

        <TextField
          label="Surname"
          value={localFilters.surname}
          onChange={(e) => setLocalFilters({ ...localFilters, surname: e.target.value })}
          fullWidth
        />

        <TextField
          label="Email"
          value={localFilters.email}
          onChange={(e) => setLocalFilters({ ...localFilters, email: e.target.value })}
          fullWidth
        />

        <TextField
          label="Mobile Number"
          value={localFilters.mobileNumber}
          onChange={(e) => setLocalFilters({ ...localFilters, mobileNumber: e.target.value })}
          fullWidth
        />
      </Stack>

      <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{
            width: '25%',
            borderColor: 'divider',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'divider',
              backgroundColor: 'action.hover',
            },
          }}
        >
          Reset
        </Button>
        <Button variant="contained" onClick={handleApply} sx={{ width: '25%' }}>
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default FilterMenuContent;
