import { MouseEvent, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useBoolean } from 'hooks/useBoolean';
import FilterSection from 'section/management-job/list-job/components/filter-section';
import ListJobTableView from 'section/management-job/list-job/view/list-job-table-view';
import { useListJobDataQuery } from 'services/management-job/list-job/query';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';

const ListJobView = () => {
  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);
  const apiRef = useGridApiRef();
  const isOpenJobFailedDialog = useBoolean();

  const query = useListJobDataQuery.getListJob({
    ownerUserId: 'e8f9a0b1-c2d3-4e5f-9a6b-7c8d9e0f1a2b',
    recruiterUserId: 'e8f9a0b1-c2d3-4e5f-9a6b-7c8d9e0f1a2b',
    pageNo: 1,
    pageSize: 10,
  });

  const { data: listJobData } = useQuery(query);

  const tableData = listJobData?.items || [];

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
        <Button
          href={'/manage/job/create'}
          variant="contained"
          color="primary"
          sx={{ flexShrink: 0 }}
        >
          Create Job
        </Button>
      </Stack>
      <ListJobTableView apiRef={apiRef} filterButtonEl={filterButtonEl} tableData={tableData} />
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
