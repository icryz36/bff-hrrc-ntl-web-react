import { MouseEvent, RefObject } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';

interface FilterSectionProps {
  apiRef: RefObject<GridApiCommunity | null>;
  handleToggleFilterPanel: (e: MouseEvent<HTMLButtonElement>) => void;
}

const FilterSection = ({ apiRef, handleToggleFilterPanel }: FilterSectionProps) => {
  const { up } = useBreakpoints();
  const upSm = up('sm');

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        gap: 1,
      }}
    >
      <Stack spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Button
          variant="text"
          sx={{ flexShrink: 0 }}
          color="neutral"
          shape={upSm ? undefined : 'square'}
          onClick={handleToggleFilterPanel}
        >
          {upSm && (
            <IconifyIcon icon="material-symbols:swap-vert-rounded" fontSize={'20px !important'} />
          )}
          {!upSm && (
            <IconifyIcon icon="material-symbols:filter-alt-outline" fontSize={'20px !important'} />
          )}
          {
            upSm && <Box component="span">Filters</Box>
          }
        </Button>
      </Stack>
    </Stack>
  );
};

export default FilterSection;
