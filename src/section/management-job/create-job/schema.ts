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

export const CreateJobSchema = z
  .object({
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
    prNo: z.string().trim().optional(),
    isBigEvent: z.boolean().default(false).optional(),

    //  Position
    position: z.array(
      z.object({
        positionId: schemaHelper.objectOrNull<TPosition>().optional().nullable(),
        vacancy: schemaHelper
          .objectOrNull<TVacancy>({
            message: { required_error: REQUIRED_MESSAGE },
          })
          .optional()
          .nullable(),
        srcOfRecruitment: schemaHelper
          .objectOrNull<TSourceOfRecruitment>({
            message: { required_error: REQUIRED_MESSAGE },
          })
          .optional()
          .nullable(),
      }),
    ),

    // Work Location
    province: schemaHelper.objectOrNull({ message: { required_error: REQUIRED_MESSAGE } }),
    districtId: z.array(z.any()).min(1, { error: REQUIRED_MESSAGE }),

    // Department
    departmentId: schemaHelper.objectOrNull<TDepartment>({
      message: { required_error: REQUIRED_MESSAGE },
    }),
    sectionId: schemaHelper.objectOrNull<TSection>().nullable().optional(),

    // Type of Employee
    levelId: schemaHelper.objectOrNull<TJobLevel>({
      message: { required_error: REQUIRED_MESSAGE },
    }),
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
  })
  .superRefine((data, ctx) => {
    const isBranch = data.groupLocation?.value === 'BRANCH';
    const isHO = data.groupLocation?.value === 'HO';
    const isGroupLocationEmpty = !data.groupLocation?.value;

    if (!isGroupLocationEmpty && !isHO && (!data.prNo || data.prNo.trim() === '')) {
      ctx.addIssue({
        code: 'custom',
        path: ['prNo'],
        message: REQUIRED_MESSAGE,
      });
    }
    if (!isBranch) {
      data.position.forEach((pos, index) => {
        if (!pos.vacancy) {
          ctx.addIssue({
            code: 'custom',
            path: ['position', index, 'vacancy'],
            message: REQUIRED_MESSAGE,
          });
        }
        if (!pos.srcOfRecruitment) {
          ctx.addIssue({
            code: 'custom',
            path: ['position', index, 'srcOfRecruitment'],
            message: REQUIRED_MESSAGE,
          });
        }
      });

      if (!isGroupLocationEmpty && !data.sectionId) {
        ctx.addIssue({
          code: 'custom',
          path: ['sectionId'],
          message: REQUIRED_MESSAGE,
        });
      }
    }
  });
