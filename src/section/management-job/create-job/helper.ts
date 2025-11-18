import { GROUP_LOCATION, OPTION_SOURCE_OF_RECRUITMENT, OPTION_VACANCY } from 'constant/enum';
import { toEndOfDay } from 'lib/utils';
import { TCreateJobPostPayload, TJobPostById } from 'types/jobpost';
import { MasterDataMaps, TDistrict } from 'types/master-data';
import { CreateJobSchemaType } from './schema';

const convertCreateEditJobPostPayload = (data: CreateJobSchemaType): TCreateJobPostPayload => {
  return {
    // Job Detail
    statusId: data.statusId,
    jobTitle: data.jobTitle,
    groupLocation: data?.groupLocation?.value || '',
    regionId: data?.regionId?.regionId || '',
    headCount: Number(data.headCount),
    prNo: data.prNo || '',
    isBigEvent: data.isBigEvent || false,
    // position
    position:
      data?.groupLocation?.value === 'BRANCH'
        ? []
        : data.position
            .map((item) => {
              const cleaned: any = {};
              if (item.positionId?.positionId) cleaned.positionId = item.positionId.positionId;
              if (item.vacancy?.value) cleaned.vacancy = item.vacancy.value;
              if (item.srcOfRecruitment?.value)
                cleaned.srcOfRecruitment = item.srcOfRecruitment.value;
              return cleaned;
            })
            .filter((item) => Object.keys(item).length > 0),
    districtId: data.districtId.map((item) => item.districtId),

    // Department
    departmentId: data?.departmentId?.departmentId || '',
    sectionId: data.sectionId?.sectionId || null,

    // Type of Employee
    levelId: data?.levelId?.levelId || '',
    degreeId: data?.degreeId?.degreeId || '',
    employeeTypeId: data?.employeeTypeId?.employeeTypeId || '',

    // Date
    startDate: data.startDate,
    endDate: toEndOfDay(data.endDate),
    acknowledgeDate: data.acknowledgeDate,

    ownerUserId: 'e8f9a0b1-c2d3-4e5f-9a6b-7c8d9e0f1a2b', // TODO: waiting api
    recruiterUserId: data.recruiterUserId.map((item) => item.userId),
    jobDescription: data.jobDescription,
    jobSpecification: data.jobSpecification,
    jobBenefit: data.jobBenefit,
  };
};

const convertDefaultValuesForm = (
  data?: TJobPostById,
  masterData?: MasterDataMaps,
  isDuplicate?: boolean,
): CreateJobSchemaType => {
  const getProvinceId = data?.workLocations?.[0].provinceId || '';

  return {
    jobPostId: !isDuplicate ? data?.jobPostNo || '' : '',
    statusId: data?.statusId || '',
    jobTitle: data?.jobTitle || '',
    prNo: data?.prNo || '',
    regionId: masterData?.regionMap.get(data?.regionId || '') || null,
    groupLocation: GROUP_LOCATION.find((item) => item.value === data?.groupLocation) || null,
    headCount: String(data?.headCount || ''),

    position:
      data?.jobPostPositions.map((item) => ({
        positionId: masterData?.positionMap.get(item.positionId) || null,
        vacancy: OPTION_VACANCY.find((vc) => vc.value === item.vacancy) || null,
        srcOfRecruitment:
          OPTION_SOURCE_OF_RECRUITMENT.find((sor) => sor.value === item.srcOfRecruitment) || null,
      })) ?? [],

    // Work Location
    province: masterData?.provinceMap.get(getProvinceId) || null,
    districtId:
      data?.workLocations
        ?.flatMap((workLocation) => workLocation.district)
        .map((d) => masterData?.districtMap.get(d.districtId))
        .filter((d): d is TDistrict => Boolean(d)) ?? [],

    // Department
    departmentId: masterData?.departmentMap.get(data?.departmentId || '') || null,
    sectionId: masterData?.sectionMap.get(data?.sectionId || '') || null,

    // Type of Employee
    levelId: masterData?.jobLevelMap.get(data?.levelId || '') || null,
    degreeId: masterData?.degreeMap.get(data?.degreeId || '') || null,
    employeeTypeId: masterData?.employeeTypeMap.get(data?.employeeTypeId || '') || null,

    // Date
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    acknowledgeDate: data?.acknowledgeDate || '',
    recruiterUserId: data?.recruiterUserId?.map((id) => masterData?.usersMap.get(id) || null) ?? [],
    jobDescription: data?.jobDescription || '',
    jobBenefit: data?.jobBenefit || '',
    jobSpecification: data?.jobSpecification || '',
  };
};

// ----------------------------------------------------------------------

const handleHeadcountKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const currentValue = (e.target as HTMLInputElement).value;

  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
    return;
  }

  if (e.key === '0' && currentValue === '') {
    e.preventDefault();
  }
};

const handleHeadcountPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  const pastedData = e.clipboardData.getData('text');

  if (!/^[1-9][0-9]*$/.test(pastedData)) {
    e.preventDefault();
  }
};

export {
  convertCreateEditJobPostPayload,
  convertDefaultValuesForm,
  handleHeadcountKeyPress,
  handleHeadcountPaste,
};
