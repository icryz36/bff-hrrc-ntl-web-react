import { MouseEvent, RefObject, useState } from 'react';
import { Box, Button, Stack, Menu, MenuItem, Popover } from '@mui/material';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import FilterMenuContent from "section/management-job/list-job/components/filter-menu-content";

interface FilterSectionProps {
    apiRef: RefObject<GridApiCommunity | null>;
    handleToggleFilterPanel: (e: MouseEvent<HTMLButtonElement>) => void;
}

const FilterSection = ({ apiRef, handleToggleFilterPanel }: FilterSectionProps) => {
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

                {/* ปุ่ม Filter */}
                <Button
                    variant="text"
                    sx={{ flexShrink: 0 }}
                    color="neutral"
                    shape={upSm ? undefined : 'square'}
                    onClick={handleOpenMenu}
                >
                    {upSm && <IconifyIcon icon="material-symbols:swap-vert-rounded" fontSize="20px" />}
                    {!upSm && <IconifyIcon icon="material-symbols:filter-alt-outline" fontSize="20px" />}
                    {upSm && <Box component="span">Filters</Box>}
                </Button>

                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                        sx: { width: 360, borderRadius: 3, p: 0, overflow: 'visible' }
                    }}
                >
                    <FilterMenuContent apiRef={apiRef} onClose={handleClose} />
                </Popover>

            </Stack>
        </Stack>
    );
};

export default FilterSection;
