import { MouseEvent, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useBoolean } from 'hooks/useBoolean';
import FilterSection from 'section/management-job/list-job/components/filter-section';
import ListJobTableView from 'section/management-job/list-job/view/list-job-table-view';
import { useJobpostQuery } from 'services/jobpost/query';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import { FilterState } from '../components/type';

// ----------------------------------------------------------------------

type FiltersListJobView = FilterState & {
  ownerUserId: string;
  recruiterUserId: string;
};

// ----------------------------------------------------------------------

const ListJobView = () => {
  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);
  const apiRef = useGridApiRef();
  const isOpenJobFailedDialog = useBoolean();

  const defaultUserId = 'e8f9a0b1-c2d3-4e5f-9a6b-7c8d9e0f1a2b';

  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const [filters, setFilters] = useState<FiltersListJobView>({
    jobTitle: '',
    department: [],
    region: '',
    province: '',
    district: '',
    jobStatus: '',
    owner: '',
    startDate: null,
    activeDay: '',
    ownerUserId: defaultUserId,
    recruiterUserId: defaultUserId,
  });

  const query = useJobpostQuery.list({
    ownerUserId: filters.ownerUserId,
    recruiterUserId: filters.recruiterUserId,
    pageNo: pagination.pageNo,
    pageSize: pagination.pageSize,
  });

  const { data: listJobData, isLoading } = useQuery(query);

  const tableData = listJobData?.items || [];
  const tableTotalRecords = listJobData?.pagination?.totalRecords || 0;

  const filterFields: FilterState = {
    jobTitle: filters.jobTitle,
    department: filters.department,
    region: filters.region,
    province: filters.province,
    district: filters.district,
    jobStatus: filters.jobStatus,
    owner: filters.owner,
    startDate: filters.startDate,
    activeDay: filters.activeDay,
  };

  const handleResetFilters = () => {
    setFilters({
      jobTitle: '',
      department: [],
      region: '',
      province: '',
      district: '',
      jobStatus: '',
      owner: '',
      startDate: null,
      activeDay: '',
      ownerUserId: defaultUserId,
      recruiterUserId: defaultUserId,
    });
    setPagination({
      pageNo: 1,
      pageSize: 10,
    });
  };

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
          filters={filterFields}
          handleToggleFilterPanel={handleToggleFilterPanel}
          setFilters={handleSetFilterFields}
          onResetFilters={handleResetFilters}
        />
        <Button
          href={'/manage/job/create'}
          variant="contained"
          color="primary"
          sx={{ flexShrink: 0 }}
        >
          Create Job
        </Button>
      </Stack>
      <ListJobTableView
        apiRef={apiRef}
        filterButtonEl={filterButtonEl}
        tableData={tableData}
        onPageChange={handlePageChange}
        totalItem={tableTotalRecords}
        currentPage={pagination.pageNo}
        loading={isLoading}
      />
      <CustomConfirmDialog
        title="เกิดข้อผิดพลาด"
        open={isOpenJobFailedDialog.value}
        onClose={isOpenJobFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenJobFailedDialog.onFalse}>
            Close
          </Button>
        }
      />
    </>
  );
};

export default ListJobView;
