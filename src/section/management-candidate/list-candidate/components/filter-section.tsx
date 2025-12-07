import { MouseEvent, useState } from 'react';
import { Box, Button, Popover, Stack } from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import FilterMenuContent from './filter-menu-content';
import { FilterState } from './type';

// ----------------------------------------------------------------------

interface FilterSectionProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  handleToggleFilterPanel: (e: MouseEvent<HTMLButtonElement>) => void;
}

// ----------------------------------------------------------------------

const FilterSection = ({ filters, setFilters }: FilterSectionProps) => {
  const { up } = useBreakpoints();
  const upSm = up('sm');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Stack justifyContent="space-between" sx={{ gap: 1 }}>
      <Stack spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Button
          variant="text"
          sx={{ flexShrink: 0, gap: '2px' }}
          color="neutral"
          shape={upSm ? undefined : 'square'}
          onClick={handleOpenMenu}
        >
          {upSm && <IconifyIcon icon="material-symbols:filter-list-rounded" fontSize="20px" />}
          {upSm && <Box component="span">Filters</Box>}
        </Button>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { width: 360, borderRadius: 3, p: 0, overflow: 'visible' },
          }}
        >
          <FilterMenuContent
            key={open ? JSON.stringify(filters) : 'closed'}
            onClose={handleClose}
            filters={filters}
            setFilters={setFilters}
          />
        </Popover>
      </Stack>
    </Stack>
  );
};

export default FilterSection;
