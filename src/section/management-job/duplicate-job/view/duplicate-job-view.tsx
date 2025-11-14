import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useBoolean } from 'hooks/useBoolean';
import { navigatePaths } from 'routes/paths';
import { CreateJobForm } from 'section/management-job/create-job/components/create-job-form';
import {
  convertCreateEditJobPostPayload,
  convertDefaultValuesForm,
} from 'section/management-job/create-job/helper';
import { CreateJobSchemaType } from 'section/management-job/create-job/schema';
import { useCreateJobpostMutation } from 'services/jobpost/mutation';
import { useJobpostQuery } from 'services/jobpost/query';
import { useMasterDataQuery } from 'services/master-data/query';
import { MasterDataMaps } from 'types/master-data';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';

// ---------------------------------------------------------------------

const DuplicateJobView = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [jobNo, setJobNo] = useState<string>('');
  const isOpenLoadDataFailedDialog = useBoolean();
  const isOpenDuplicateJobSuccessDialog = useBoolean();
  const isOpenDuplicateJobFailedDialog = useBoolean();

  // api ----------------------------------------------------------------

  const { mutate: createJobPost, isPending: isLoadingCreateJobPost } = useCreateJobpostMutation();

  const { data: jobpostDetail, isError: isErrorGetjobDetail } = useQuery(
    useJobpostQuery.detail({ jobPostId: id }),
  );

  const getDepartmentId = jobpostDetail?.data?.departmentId || '';
  const getProvinceId = jobpostDetail?.data?.workLocations[0]?.provinceId || '';

  const { data: postStatusList = [] } = useQuery(useMasterDataQuery.postStatus());
  const { data: ntlRegionList = [] } = useQuery(useMasterDataQuery.ntlRegion());
  const { data: provinceList = [] } = useQuery(useMasterDataQuery.province());
  const { data: departmentList = [] } = useQuery(useMasterDataQuery.department());
  const { data: jobLevelList = [] } = useQuery(useMasterDataQuery.jobLevel());
  const { data: degreeList = [] } = useQuery(useMasterDataQuery.degree());
  const { data: employeeTypeList = [] } = useQuery(useMasterDataQuery.employeeType());
  const { data: positionList = [] } = useQuery(useMasterDataQuery.position());
  const { data: usersList = [] } = useQuery(useMasterDataQuery.users());

  const { data: districtList = [] } = useQuery({
    ...useMasterDataQuery.district({ provinceId: getProvinceId }),
    enabled: !!getProvinceId,
  });

  const { data: sectionList = [] } = useQuery({
    ...useMasterDataQuery.section({ departmentId: getDepartmentId }),
    enabled: !!getDepartmentId,
  });

  // value ---------------------------------------------------------------

  const masterDataMaps: MasterDataMaps = useMemo(
    () => ({
      postStatusMap: new Map(postStatusList.map((item) => [item.statusId, item])),
      regionMap: new Map(ntlRegionList.map((item) => [item.regionId, item])),
      provinceMap: new Map(provinceList.map((item) => [item.provinceId, item])),
      departmentMap: new Map(departmentList.map((item) => [item.departmentId, item])),
      jobLevelMap: new Map(jobLevelList.map((item) => [item.levelId, item])),
      degreeMap: new Map(degreeList.map((item) => [item.degreeId, item])),
      employeeTypeMap: new Map(employeeTypeList.map((item) => [item.employeeTypeId, item])),
      positionMap: new Map(positionList.map((item) => [item.positionId, item])),
      usersMap: new Map(usersList.map((item) => [item.userId, item])),
      districtMap: new Map(districtList.map((item) => [item.districtId, item])),
      sectionMap: new Map(sectionList.map((item) => [item.sectionId, item])),
    }),
    [
      postStatusList,
      ntlRegionList,
      provinceList,
      departmentList,
      jobLevelList,
      degreeList,
      employeeTypeList,
      positionList,
      usersList,
      districtList,
      sectionList,
    ],
  );

  const defaultValuesForm = useMemo(
    () => convertDefaultValuesForm(jobpostDetail?.data, masterDataMaps, true),
    [jobpostDetail?.data, masterDataMaps],
  );

  // func ---------------------------------------------------------------

  const onSubmit = (data: CreateJobSchemaType) => {
    const payload = convertCreateEditJobPostPayload(data);

    createJobPost(payload, {
      onSuccess: (response) => {
        if (response.status) {
          setJobNo(response.data.jobPostNo);
          isOpenDuplicateJobSuccessDialog.onTrue();
          return;
        }

        isOpenDuplicateJobFailedDialog.onTrue();
      },
      onError: () => {
        isOpenDuplicateJobFailedDialog.onTrue();
      },
    });
  };

  const handleCopyJobNo = () => {
    if (jobNo) {
      // TODO: show toast
      navigator.clipboard.writeText(jobNo);
    }
  };

  // hook ---------------------------------------------------------------

  // show dialog when load data failed !
  useEffect(() => {
    if (isErrorGetjobDetail) {
      isOpenLoadDataFailedDialog.onTrue();
    }
  }, [isErrorGetjobDetail]);

  // --------------------------------------------------------------------

  return (
    <>
      <CreateJobForm
        isEdit
        onSubmit={onSubmit}
        isLoading={isLoadingCreateJobPost}
        defaultValuesForm={defaultValuesForm}
      />

      {/* Dialog */}

      <CustomConfirmDialog
        title="เกิดข้อผิดพลาด"
        open={isOpenDuplicateJobFailedDialog.value}
        onClose={isOpenDuplicateJobFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenDuplicateJobFailedDialog.onFalse}>
            Close
          </Button>
        }
      />

      <CustomConfirmDialog
        title="สร้าง Job สำเร็จ"
        open={isOpenDuplicateJobSuccessDialog.value}
        onClose={isOpenDuplicateJobSuccessDialog.onFalse}
        description={
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="subtitle1" color="text.secondary">
              เลข Job No. คือ{' '}
            </Typography>
            <Typography variant="subtitle1_bold">{jobNo}</Typography>
            <IconButton onClick={handleCopyJobNo}>
              <IconifyIcon
                icon="material-symbols-light:content-copy-outline"
                color="text.primary"
              />
            </IconButton>
          </Stack>
        }
        action={
          <Stack spacing={1}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => navigate(navigatePaths.jobPost.createJob)}
            >
              Create new Job
            </Button>
            <Button variant="contained" onClick={() => navigate(navigatePaths.jobPost.listJob)}>
              Go to List Job Post
            </Button>
          </Stack>
        }
      />

      <CustomConfirmDialog
        title="คัดลอกรายการไม่สำเร็จ"
        open={isOpenLoadDataFailedDialog.value}
        onClose={isOpenLoadDataFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1" whiteSpace="pre-wrap">
            เกิดข้อผิดพลาดระหว่างการคัดลอก กรุณาลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenLoadDataFailedDialog.onFalse}>
            Close
          </Button>
        }
      />
    </>
  );
};

export default DuplicateJobView;
