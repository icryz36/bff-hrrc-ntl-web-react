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

    //  Position // TODO: waiting api
    position: [
      {
        positionId: 'b1925c49-ac3a-41b8-862e-905e36b31c7a',
        vacancy: 1,
        srcOfRecruitment: 'INTERNAL',
      },
    ],

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
    recruiterUserId: ['e8f9a0b1-c2d3-4e5f-9a6b-7c8d9e0f1a2b'], // TODO: waiting api
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
