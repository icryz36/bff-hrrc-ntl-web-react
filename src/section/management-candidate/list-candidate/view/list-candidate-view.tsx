import { MouseEvent, useState } from 'react';
import { Stack } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useCandidateQuery } from 'services/candidate/query';
import FilterSection from '../components/filter-section';
import { FilterState } from '../components/type';
import ListCandidateTableView from './list-candidate-table-view';

// ----------------------------------------------------------------------

const ListCandidateView = () => {
  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);
  const apiRef = useGridApiRef();

  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const [filters, setFilters] = useState<FilterState>({
    status: '',
    name: '',
    surname: '',
    email: '',
    mobileNumber: '',
  });

  const query = useCandidateQuery.list({
    status: filters.status ? [filters.status as 'Active' | 'Inactive'] : ['Active', 'Inactive'],
    ...(filters.name && { name: filters.name }),
    ...(filters.surname && { surname: filters.surname }),
    ...(filters.email && { email: filters.email }),
    ...(filters.mobileNumber && { mobile: filters.mobileNumber }),
    ...{ containFieldName: ['name', 'surname', 'email', 'mobileNumber'] },
    pageNo: pagination.pageNo,
    pageSize: pagination.pageSize,
  });

  const { data: listCandidateData, isLoading } = useQuery(query);

  const tableData = listCandidateData?.items || [];
  const tableTotalRecords = listCandidateData?.total || 0;

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

  const handleSetFilterFields = (newFilters: FilterState) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setPagination({
      pageNo: 1,
      pageSize: 10,
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
        <FilterSection
          filters={filters}
          handleToggleFilterPanel={handleToggleFilterPanel}
          setFilters={handleSetFilterFields}
        />
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
