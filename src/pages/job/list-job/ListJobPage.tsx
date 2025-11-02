import Grid from '@mui/material/Grid';
import PageHeader from 'components/page-header/page-header';
import ListJobTable from "pages/job/list-job/ListJobTable";
import { useGridApiRef } from '@mui/x-data-grid';
import { MouseEvent, useState } from 'react';
import { Button, Stack } from '@mui/material';
import FilterSection from "pages/job/list-job/filters/FilterSection";

const ListJobPage = () => {
    const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);
    const apiRef = useGridApiRef();

    const handleToggleFilterPanel = (e: MouseEvent<HTMLButtonElement>) => {
        const clickedEl = e.currentTarget;

        if (filterButtonEl && filterButtonEl === clickedEl) {
            setFilterButtonEl(null);
            apiRef.current?.hideFilterPanel();
            return;
        }

        setFilterButtonEl(clickedEl);
        apiRef.current?.showFilterPanel();
    };


    return (
        <Grid container>
            <Grid size={12}>
                <PageHeader title="List Job Post" />
            </Grid>
            <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 5 }}>
                <Stack
                    spacing={1}
                    sx={{ flexGrow: 1, alignItems: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' }, mb: 3, justifyContent: 'end' }}
                >
                    <FilterSection apiRef={apiRef} handleToggleFilterPanel={handleToggleFilterPanel} />
                    <Button
                        href={"/"}
                        variant="contained"
                        color="primary"
                        sx={{ flexShrink: 0}}
                    >
                        Create Job
                    </Button>
                </Stack>
                <ListJobTable apiRef={apiRef} filterButtonEl={filterButtonEl} />
            </Grid>
        </Grid>
    );
};

export default ListJobPage;
