import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Button, InputAdornment, Stack } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { StyledSearchTextField } from '../styles';
import { TFilter } from './job-application-apply-candidate-dialog';

// ----------------------------------------------------------------------

type TTempFilter = {
  searchName?: string;
  searchSurname?: string;
};

type JobApplicationApplyCandidateFilterProps = {
  onSetFilter: Dispatch<SetStateAction<TFilter>>;
};

export const JobApplicationApplyCandidateFilter = ({
  onSetFilter,
}: JobApplicationApplyCandidateFilterProps) => {
  const [tempFilter, setTempFilter] = useState<TTempFilter>({
    searchName: '',
    searchSurname: '',
  });

  // func ---------------------------------------------------------------

  const handleConfirmFilter = () => {
    onSetFilter({ ...tempFilter });
  };

  const handleSearchName = (value: string) => {
    setTempFilter((prev) => ({
      ...prev,
      searchName: value,
    }));
  };

  const handleSearchSurname = (value: string) => {
    setTempFilter((prev) => ({
      ...prev,
      searchSurname: value,
    }));
  };

  // ----------------------------------------------------------------------

  return (
    <Stack spacing={2} alignItems="center">
      <StyledSearchTextField
        name="searchName"
        label="Search Name"
        size="small"
        fullWidth
        onChange={(e) => handleSearchName(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="material-symbols:search-rounded" width={20} height={20} />
              </InputAdornment>
            ),
          },
        }}
      />
      <StyledSearchTextField
        name="searchSurname"
        label="Search Surname"
        size="small"
        fullWidth
        onChange={(e) => handleSearchSurname(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="material-symbols:search-rounded" width={20} height={20} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box width={100}>
        <Button
          fullWidth
          size="medium"
          variant="contained"
          onClick={handleConfirmFilter}
          startIcon={<IconifyIcon icon="material-symbols:search-rounded" width={20} height={20} />}
        >
          Search
        </Button>
      </Box>
    </Stack>
  );
};
