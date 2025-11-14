import { RefObject, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { DatePicker } from '@mui/x-date-pickers';
import IconifyIcon from 'components/base/IconifyIcon.tsx';

interface FilterMenuContentProps {
  apiRef: RefObject<GridApiCommunity | null>;
  onClose: () => void;
}

const FilterMenuContent = ({ apiRef, onClose }: FilterMenuContentProps) => {
  const [filters, setFilters] = useState({
    jobTitle: '',
    department: ['Department01', 'Department02'],
    region: '',
    province: '',
    district: '',
    jobStatus: '',
    owner: '',
    startDate: null as Date | null,
    activeDay: '',
  });

  const handleReset = () => {
    setFilters({
      jobTitle: '',
      department: [],
      region: '',
      province: '',
      district: '',
      jobStatus: '',
      owner: '',
      startDate: null,
      activeDay: '',
    });
  };

  const handleApply = () => {
    apiRef.current?.setFilterModel({
      items: [
        filters.jobTitle && {
          columnField: 'jobTitle',
          operatorValue: 'contains',
          value: filters.jobTitle,
        },
      ].filter(Boolean) as any,
    });
    onClose();
  };

  return (
    <Box p={3} maxHeight="80vh">
      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Filter</Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ p: 0 }}>
          <IconifyIcon
            icon="material-symbols-light:close-rounded"
            fontSize="20px"
            color={'#111417'}
          />
        </IconButton>
      </Stack>
      <Typography variant="body2" sx={{ my: 2 }}>
        Easily find the List Job Post you’re looking for using filters.
      </Typography>

      <Stack spacing={2} direction="column">
        <TextField
          label="Job Title"
          value={filters.jobTitle}
          onChange={(e) => setFilters({ ...filters, jobTitle: e.target.value })}
          fullWidth
        />

        <Autocomplete
          multiple
          options={['Department01', 'Department02', 'Department03']}
          value={filters.department}
          onChange={(_, v) => setFilters({ ...filters, department: v })}
          renderInput={(params) => <TextField {...params} label="Department" />}
        />

        <TextField label="NTL Regional" select value={filters.region}>
          <MenuItem value="North">North</MenuItem>
          <MenuItem value="South">South</MenuItem>
        </TextField>

        <TextField label="Province" select value={filters.province}>
          <MenuItem value="Bangkok">Bangkok</MenuItem>
        </TextField>

        <TextField label="District" select value={filters.district}>
          <MenuItem value="District A">District A</MenuItem>
        </TextField>

        <TextField label="Job Status" select value={filters.jobStatus}>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </TextField>

        <TextField label="Owner" select value={filters.owner}>
          <MenuItem value="User01">User01</MenuItem>
        </TextField>

        <DatePicker label="Start Date" format="DD/MM/YYYY" />

        <TextField label="Active Day" select value={filters.activeDay}>
          <MenuItem value="7">Last 7 days</MenuItem>
          <MenuItem value="30">Last 30 days</MenuItem>
        </TextField>
      </Stack>

      <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
        <Button variant="outlined" onClick={handleReset} sx={{ width: '25%' }}>
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
