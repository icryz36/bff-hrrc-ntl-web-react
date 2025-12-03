import { useState } from 'react';
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
import { DatePicker } from '@mui/x-date-pickers';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMasterDataQuery } from 'services/master-data/query';
import IconifyIcon from 'components/base/IconifyIcon.tsx';
import { FilterState } from './type';

// ----------------------------------------------------------------------

interface FilterMenuContentProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onClose: () => void;
  onResetFilters: () => void;
}

// ----------------------------------------------------------------------

const FilterMenuContent = ({
  filters,
  setFilters,
  onClose,
  onResetFilters,
}: FilterMenuContentProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const { data: departmentList = [] } = useQuery(useMasterDataQuery.department());
  const { data: ntlRegionList = [] } = useQuery(useMasterDataQuery.ntlRegion());
  const { data: provinceList = [] } = useQuery(useMasterDataQuery.province());
  const { data: districtList = [] } = useQuery({
    ...useMasterDataQuery.district({ provinceId: localFilters.province }),
    enabled: !!localFilters.province,
  });
  const { data: postStatusList = [] } = useQuery(useMasterDataQuery.postStatus());
  const { data: usersList = [] } = useQuery(useMasterDataQuery.users());

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      jobTitle: '',
      department: [],
      region: '',
      province: '',
      district: '',
      jobStatus: '',
      owner: '',
      startDate: null,
      activeDay: '',
    };
    setLocalFilters(resetFilters);
    onResetFilters();
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
        Easily find the List Job Post you’re looking for using filters.
      </Typography>

      <Stack spacing={2} direction="column">
        <TextField
          label="Job Title"
          value={localFilters.jobTitle}
          onChange={(e) => setLocalFilters({ ...localFilters, jobTitle: e.target.value })}
          fullWidth
        />

        <Autocomplete
          multiple
          options={departmentList}
          getOptionLabel={(option) => option.departmentNameTh || option.departmentNameEn}
          value={departmentList.filter((dept) =>
            localFilters.department.includes(dept.departmentId),
          )}
          onChange={(_, v) =>
            setLocalFilters({
              ...localFilters,
              department: v.map((dept) => dept.departmentId),
            })
          }
          renderInput={(params) => <TextField {...params} label="Department" />}
        />

        <TextField
          label="NTL Regional"
          select
          value={localFilters.region}
          onChange={(e) => {
            setLocalFilters({
              ...localFilters,
              region: e.target.value,
              province: '',
              district: '',
            });
          }}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {ntlRegionList.map((region) => (
            <MenuItem key={region.regionId} value={region.regionId}>
              {region.regionNameTh || region.regionNameEn}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Province"
          select
          value={localFilters.province}
          onChange={(e) => {
            setLocalFilters({
              ...localFilters,
              province: e.target.value,
              district: '',
            });
          }}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {provinceList.map((province) => (
            <MenuItem key={province.provinceId} value={province.provinceId}>
              {province.provinceNameTh || province.provinceNameEn}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="District"
          select
          value={localFilters.district}
          onChange={(e) => setLocalFilters({ ...localFilters, district: e.target.value })}
          disabled={!localFilters.province}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {districtList.map((district) => (
            <MenuItem key={district.districtId} value={district.districtId}>
              {district.districtNameTh || district.districtNameEn}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Job Status"
          select
          value={localFilters.jobStatus}
          onChange={(e) => setLocalFilters({ ...localFilters, jobStatus: e.target.value })}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {postStatusList.map((status) => (
            <MenuItem key={status.statusId} value={status.statusId}>
              {status.statusNameTh || status.statusNameEn}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Owner"
          select
          value={localFilters.owner}
          onChange={(e) => setLocalFilters({ ...localFilters, owner: e.target.value })}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {usersList.map((user) => (
            <MenuItem key={user.userId} value={user.userId}>
              {user.name} {user.surname}
            </MenuItem>
          ))}
        </TextField>

        <DatePicker
          label="Start Date"
          format="DD/MM/YYYY"
          value={localFilters.startDate ? dayjs(localFilters.startDate) : null}
          onChange={(newValue) =>
            setLocalFilters({
              ...localFilters,
              startDate: newValue ? (newValue.toDate() as Date) : null,
            })
          }
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />

        <TextField
          label="Active Day"
          select
          value={localFilters.activeDay}
          onChange={(e) => setLocalFilters({ ...localFilters, activeDay: e.target.value })}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
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
