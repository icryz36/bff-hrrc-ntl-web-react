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

// ✅ Helper function: ตรวจสอบ PR No
const validatePrNo = (data: any, ctx: z.RefinementCtx, isBigEvent: boolean) => {
  const isHO = data.groupLocation?.value === 'HO';
  const isGroupLocationEmpty = !data.groupLocation?.value;
  const shouldValidatePrNo = !isGroupLocationEmpty && !isHO && !isBigEvent;
  const isPrNoEmpty = !data.prNo || data.prNo.trim() === '';

  if (shouldValidatePrNo && isPrNoEmpty) {
    ctx.addIssue({
      code: 'custom',
      path: ['prNo'],
      message: REQUIRED_MESSAGE,
    });
  }
};

// ✅ Helper function: ตรวจสอบ Position array
const validatePositions = (
  data: any,
  ctx: z.RefinementCtx,
  isBranch: boolean,
  isBigEvent: boolean,
) => {
  if (isBranch || isBigEvent) return;

  data.position.forEach((pos: any, index: number) => {
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
};

// ✅ Helper function: ตรวจสอบ Required fields เมื่อไม่ใช่ Big Event
const validateRequiredFields = (data: any, ctx: z.RefinementCtx) => {
  const requiredFields = [
    { field: 'province', path: ['province'] },
    { field: 'districtId', path: ['districtId'], checkLength: true },
    { field: 'departmentId', path: ['departmentId'] },
    { field: 'levelId', path: ['levelId'] },
    { field: 'degreeId', path: ['degreeId'] },
    { field: 'employeeTypeId', path: ['employeeTypeId'] },
  ];

  requiredFields.forEach(({ field, path, checkLength }) => {
    const value = data[field];
    const isEmpty = checkLength ? !value || value.length === 0 : !value;

    if (isEmpty) {
      ctx.addIssue({
        code: 'custom',
        path,
        message: REQUIRED_MESSAGE,
      });
    }
  });
};

// ✅ Helper function: ตรวจสอบ Section
const validateSection = (data: any, ctx: z.RefinementCtx, isBranch: boolean) => {
  const isGroupLocationEmpty = !data.groupLocation?.value;
  const shouldValidateSection = !isGroupLocationEmpty && !isBranch && !data.sectionId;

  if (shouldValidateSection) {
    ctx.addIssue({
      code: 'custom',
      path: ['sectionId'],
      message: REQUIRED_MESSAGE,
    });
  }
};

export const CreateJobSchema = z
  .object({
    // Job Detail
    jobPostId: z.string().optional(),
    statusId: z.string().min(1, { message: REQUIRED_MESSAGE }),
    jobTitle: z.string().trim().min(1, { message: REQUIRED_MESSAGE }),
    groupLocation: schemaHelper.objectOrNull<TGroupLocation>({
      message: { required_error: REQUIRED_MESSAGE },
    }),
    regionId: schemaHelper.objectOrNull<TNtlRegion>({
      message: { required_error: REQUIRED_MESSAGE },
    }),
    headCount: z.string().min(1, { message: REQUIRED_MESSAGE }),
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
    startDate: z.string().min(1, { message: REQUIRED_MESSAGE }),
    endDate: z.string().min(1, { message: REQUIRED_MESSAGE }),
    acknowledgeDate: z.string().min(1, { message: REQUIRED_MESSAGE }),
    ownerUserId: z.string().optional(),
    recruiterUserId: z.array(z.any()),
    jobDescription: z.string(),
    jobSpecification: z.string(),
    jobBenefit: z.string(),
  })
  .superRefine((data, ctx) => {
    // Extract flags
    const isBranch = data.groupLocation?.value === 'BRANCH';
    const isBigEvent = data.isBigEvent ?? false;

    // Validate PR No
    validatePrNo(data, ctx, isBigEvent);

    // Validate Positions
    validatePositions(data, ctx, isBranch, isBigEvent);

    // Validate required fields (only if not big event)
    if (!isBigEvent) {
      validateRequiredFields(data, ctx);
      validateSection(data, ctx, isBranch);
    }
  });
