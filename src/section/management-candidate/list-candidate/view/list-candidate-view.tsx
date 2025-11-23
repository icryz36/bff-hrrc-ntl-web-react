import { MouseEvent, useState } from 'react';
import { Stack } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import FilterSection from 'section/management-job/list-job/components/filter-section';
import { useCandidateQuery } from 'services/candidate/query';
import ListCandidateTableView from './list-candidate-table-view';

const ListCandidateView = () => {
  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);
  const apiRef = useGridApiRef();
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const query = useCandidateQuery.list({
    status: ['Active', 'Inactive'],
    pageNo: pagination.pageNo,
    pageSize: pagination.pageSize,
  });

  const { data: listCandidateData, isLoading } = useQuery(query);

  const tableData = listCandidateData?.items || [];
  const tableTotalRecords = listCandidateData?.pagination?.totalRecords || 0;

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

  const handlePageChange = ({ page, pageSize }: { page: number; pageSize: number }) => {
    setPagination({
      pageNo: page + 1,
      pageSize,
    });
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
      <ListCandidateTableView
        apiRef={apiRef}
        filterButtonEl={filterButtonEl}
        tableData={tableData}
        onPageChange={handlePageChange}
        totalItem={tableTotalRecords}
        currentPage={pagination.pageNo}
        loading={isLoading}
      />
    </>
  );
};

export default ListCandidateView;
