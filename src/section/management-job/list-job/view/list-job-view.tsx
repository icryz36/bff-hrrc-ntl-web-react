import {Button, Stack} from "@mui/material";
import FilterSection from "section/management-job/list-job/components/filter-section";
import ListJobTableView from "section/management-job/list-job/view/list-job-table-view";
import {MouseEvent, useState} from "react";
import {useGridApiRef} from "@mui/x-data-grid";

const  ListJobView = () => {
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
        <>
            <Stack
                spacing={1}
                sx={{ flexGrow: 1, alignItems: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' }, mb: 3, justifyContent: 'end' }}
            >
                <FilterSection apiRef={apiRef} handleToggleFilterPanel={handleToggleFilterPanel} />
                <Button
                    href={"/manage/job/create"}
                    variant="contained"
                    color="primary"
                    sx={{ flexShrink: 0}}
                >
                    Create Job
                </Button>
            </Stack>
            <ListJobTableView apiRef={apiRef} filterButtonEl={filterButtonEl} />
        </>
    )
}

export default ListJobView;