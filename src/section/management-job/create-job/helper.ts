import { toEndOfDay } from 'lib/utils';
import { TCreateJobPostPayload } from 'types/jobpost';
import { CreateJobSchemaType } from './schema';

const convertCreateJobPostPayload = (data: CreateJobSchemaType): TCreateJobPostPayload => {
  return {
    // Job Detail
    statusId: data.statusId,
    jobTitle: data.jobTitle,
    groupLocation: data?.groupLocation?.value || '',
    regionId: data?.regionId?.regionId || '',
    headCount: Number(data.headCount),
    prNo: data.prNo,

    // position
    position: data.position.map((item) => ({
      positionId: item.positionId?.positionId || '',
      vacancy: item.vacancy?.value || '',
      srcOfRecruitment: item.srcOfRecruitment?.value || '',
    })),

    // Work Location
    districtId: data.districtId.map((item) => item.districtId),

    // Department
    departmentId: data?.departmentId?.departmentId || '',

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

// ----------------------------------------------------------------------

export const handleHeadcountKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const currentValue = (e.target as HTMLInputElement).value;

  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
    return;
  }

  if (e.key === '0' && currentValue === '') {
    e.preventDefault();
  }
};

export const handleHeadcountPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  const pastedData = e.clipboardData.getData('text');

  if (!/^[1-9][0-9]*$/.test(pastedData)) {
    e.preventDefault();
  }
};

export { convertCreateJobPostPayload };
