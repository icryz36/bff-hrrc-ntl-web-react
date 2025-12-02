import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useBoolean } from 'hooks/useBoolean';
import { navigatePaths } from 'routes/paths';
import { CreateJobForm } from 'section/management-job/create-job/components/create-job-form';
import {
  convertCreateEditJobPostPayload,
  convertDefaultValuesForm,
} from 'section/management-job/create-job/helper';
import { CreateJobSchemaType } from 'section/management-job/create-job/schema';
import { useUpdateJobpostMutation } from 'services/jobpost/mutation';
import { useJobpostQuery } from 'services/jobpost/query';
import { useMasterDataQuery } from 'services/master-data/query';
import { MasterDataMaps } from 'types/master-data';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';

// ---------------------------------------------------------------------

const EditJobView = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const isSubmitSuccess = useBoolean();
  const isOpenEditJobFailedDialog = useBoolean();
  const isOpenLoadDataFailedDialog = useBoolean();
  const isOpenUpdateJobSuccessDialog = useBoolean();

  // api ----------------------------------------------------------------

  const { mutate: updateJobPost, isPending: isLoadingUpdateJobPost } = useUpdateJobpostMutation();
  const { data: jobpostDetail, isError: isErrorGetjobDetail } = useQuery({
    ...useJobpostQuery.detail({ jobPostId: id }),
    enabled: !!id,
  });

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
    () => convertDefaultValuesForm(jobpostDetail?.data, masterDataMaps),
    [jobpostDetail?.data, masterDataMaps],
  );

  // func ---------------------------------------------------------------

  const onSubmit = (data: CreateJobSchemaType) => {
    const payload = convertCreateEditJobPostPayload(data);

    updateJobPost(
      { ...payload, jobPostId: id },
      {
        onSuccess: (response) => {
          if (response.status) {
            isOpenUpdateJobSuccessDialog.onTrue();
            isSubmitSuccess.onTrue();
            return;
          }

          isOpenEditJobFailedDialog.onTrue();
        },
        onError: () => {
          isOpenEditJobFailedDialog.onTrue();
        },
      },
    );
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
        isLoading={isLoadingUpdateJobPost}
        defaultValuesForm={defaultValuesForm}
        isSubmitSuccess={isSubmitSuccess.value}
      />

      {/* Dialog */}

      <CustomConfirmDialog
        title="เกิดข้อผิดพลาด"
        open={isOpenEditJobFailedDialog.value}
        onClose={isOpenEditJobFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenEditJobFailedDialog.onFalse}>
            Close
          </Button>
        }
      />

      <CustomConfirmDialog
        title="แก้ไขข้อมูลสำเร็จ"
        open={isOpenUpdateJobSuccessDialog.value}
        onClose={isOpenUpdateJobSuccessDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            คุณได้ทำการแก้ไขข้อมูลที่ต้องการสำเร็จ
          </Typography>
        }
        action={
          <Button variant="contained" onClick={() => navigate(navigatePaths.jobPost.listJob)}>
            Go to List Job Post
          </Button>
        }
      />

      <CustomConfirmDialog
        title="โหลดข้อมูลไม่สำเร็จ"
        open={isOpenLoadDataFailedDialog.value}
        onClose={isOpenLoadDataFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1" whiteSpace="pre-wrap">
            ระบบไม่สามารถแสดงข้อมูลที่คุณเลือกได้ในขณะนี้อาจเกิดจากการเชื่อมต่อหรือข้อมูลไม่พร้อมใช้งาน
            กรุณาลองใหม่อีกครั้ง
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

export default EditJobView;
