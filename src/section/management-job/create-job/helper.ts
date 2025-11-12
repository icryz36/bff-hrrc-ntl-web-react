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

    //  Position
    position: [
      // TODO: ทำต่อ
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
    // endDate: toEndOfDay(data.endDate), // TODO: ส่ง format 23:59 ไปไม่ได้
    endDate: data.endDate,
    acknowledgeDate: data.acknowledgeDate,

    ownerUserId: 'e8f9a0b1-c2d3-4e5f-9a6b-7c8d9e0f1a2b', // TODO: ทำต่อ
    recruiterUserId: ['e8f9a0b1-c2d3-4e5f-9a6b-7c8d9e0f1a2b'], // TODO: ไม่เจอเส้น master
    jobDescription: data.jobDescription,
    jobSpecification: data.jobSpecification,
    jobBenefit: data.jobBenefit,
  };
};

export { convertCreateJobPostPayload };
