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
    province: schemaHelper.objectOrNull().nullable().optional(),
    districtId: z.array(z.any()),

    // Department
    departmentId: schemaHelper.objectOrNull<TDepartment>().nullable().optional(),
    sectionId: schemaHelper.objectOrNull<TSection>().nullable().optional(),

    // Type of Employee
    levelId: schemaHelper.objectOrNull<TJobLevel>().nullable().optional(),
    degreeId: schemaHelper.objectOrNull<TDegree>().nullable().optional(),
    employeeTypeId: schemaHelper.objectOrNull<TEmployeeType>().nullable().optional(),

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
    const isBigEvent = data.isBigEvent;

    if (!isGroupLocationEmpty && !isHO && !isBigEvent && (!data.prNo || data.prNo.trim() === '')) {
      ctx.addIssue({
        code: 'custom',
        path: ['prNo'],
        message: REQUIRED_MESSAGE,
      });
    }
    if (!isBranch && !isBigEvent) {
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
    if (!isBigEvent) {
      if (!data.province) {
        ctx.addIssue({
          code: 'custom',
          path: ['province'],
          message: REQUIRED_MESSAGE,
        });
      }

      if (!data.districtId || data.districtId.length === 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['districtId'],
          message: REQUIRED_MESSAGE,
        });
      }

      if (!data.departmentId) {
        ctx.addIssue({
          code: 'custom',
          path: ['departmentId'],
          message: REQUIRED_MESSAGE,
        });
      }

      if (!data.levelId) {
        ctx.addIssue({
          code: 'custom',
          path: ['levelId'],
          message: REQUIRED_MESSAGE,
        });
      }

      if (!data.degreeId) {
        ctx.addIssue({
          code: 'custom',
          path: ['degreeId'],
          message: REQUIRED_MESSAGE,
        });
      }

      if (!data.employeeTypeId) {
        ctx.addIssue({
          code: 'custom',
          path: ['employeeTypeId'],
          message: REQUIRED_MESSAGE,
        });
      }
      if (!isGroupLocationEmpty && !data.sectionId) {
        ctx.addIssue({
          code: 'custom',
          path: ['sectionId'],
          message: REQUIRED_MESSAGE,
        });
      }
    }
  });
