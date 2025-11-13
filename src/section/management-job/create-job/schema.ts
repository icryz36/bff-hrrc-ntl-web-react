import {
  TDegree,
  TDepartment,
  TEmployeeType,
  TGroupLocation,
  TJobLevel,
  TNtlRegion,
  TPosition,
  TSection,
  TSourceOfRecruitment,
  TVacancy,
} from 'types/master-data';
import { z } from 'zod';
import { schemaHelper } from 'components/hook-form';

// ----------------------------------------------------------------------

const REQUIRED_MESSAGE = 'This field is required';

// ----------------------------------------------------------------------

export type CreateJobSchemaType = z.infer<typeof CreateJobSchema>;

export const CreateJobSchema = z.object({
  // Job Detail
  jobPostId: z.string().optional(),
  statusId: z.string().min(1, { error: REQUIRED_MESSAGE }),
  jobTitle: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  groupLocation: schemaHelper.objectOrNull<TGroupLocation>({
    message: { required_error: REQUIRED_MESSAGE },
  }),

  regionId: schemaHelper.objectOrNull<TNtlRegion>({
    message: { required_error: REQUIRED_MESSAGE },
  }),
  headCount: z.string().min(1, { error: REQUIRED_MESSAGE }),
  prNo: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),

  //  Position
  position: z.array(
    z.object({
      positionId: schemaHelper.objectOrNull<TPosition>(),
      vacancy: schemaHelper.objectOrNull<TVacancy>({
        message: { required_error: REQUIRED_MESSAGE },
      }),
      srcOfRecruitment: schemaHelper.objectOrNull<TSourceOfRecruitment>({
        message: { required_error: REQUIRED_MESSAGE },
      }),
    }),
  ),

  // Work Location
  province: schemaHelper.objectOrNull({ message: { required_error: REQUIRED_MESSAGE } }),
  districtId: z
    .array(
      z.object({
        districtId: z.string(),
        districtNameTh: z.string(),
        districtNameEn: z.string().nullable(),
      }),
    )
    .min(1, { error: REQUIRED_MESSAGE }),

  // Department
  departmentId: schemaHelper.objectOrNull<TDepartment>({
    message: { required_error: REQUIRED_MESSAGE },
  }),
  sectionId: schemaHelper.objectOrNull<TSection>({ message: { required_error: REQUIRED_MESSAGE } }),

  // Type of Employee
  levelId: schemaHelper.objectOrNull<TJobLevel>({ message: { required_error: REQUIRED_MESSAGE } }),
  degreeId: schemaHelper.objectOrNull<TDegree>({ message: { required_error: REQUIRED_MESSAGE } }),
  employeeTypeId: schemaHelper.objectOrNull<TEmployeeType>({
    message: { required_error: REQUIRED_MESSAGE },
  }),

  // Date
  startDate: z.string().min(1, { error: REQUIRED_MESSAGE }),
  endDate: z.string().min(1, { error: REQUIRED_MESSAGE }),
  acknowledgeDate: z.string().min(1, { error: REQUIRED_MESSAGE }),

  ownerUserId: z.string().optional(),

  recruiterUserId: z.array(z.any()),
  jobDescription: z.string(),
  jobSpecification: z.string(),
  jobBenefit: z.string(),
});
