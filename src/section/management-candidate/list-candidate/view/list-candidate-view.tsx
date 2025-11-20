import { MouseEvent, useState } from 'react';
import { Stack } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import FilterSection from 'section/management-job/list-job/components/filter-section';
import ListCandidateTableView from './list-candidate-table-view';

const ListCandidateView = () => {
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
        sx={{
          flexGrow: 1,
          alignItems: 'center',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          mb: 3,
          justifyContent: 'end',
        }}
      >
        <FilterSection apiRef={apiRef} handleToggleFilterPanel={handleToggleFilterPanel} />
      </Stack>
      <ListCandidateTableView apiRef={apiRef} filterButtonEl={filterButtonEl} />
    </>
  );
};

export default ListCandidateView;
