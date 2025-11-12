import { z } from 'zod';

// ----------------------------------------------------------------------

const REQUIRED_MESSAGE = 'This field is required';

// ----------------------------------------------------------------------

export type CreateJobSchemaType = z.infer<typeof CreateJobSchema>;

export const CreateJobSchema = z.object({
  // Job Detail
  jobPostId: z.string().optional(),
  statusId: z.string().min(1, { error: REQUIRED_MESSAGE }),
  jobTitle: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  groupLocation: z.string().min(1, { error: REQUIRED_MESSAGE }),
  regionId: z.string().min(1, { error: REQUIRED_MESSAGE }),
  headCount: z.string().min(1, { error: REQUIRED_MESSAGE }),
  prNo: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),

  //  Position
  position: z.array(
    z.object({
      positionId: z.string().trim().optional(),
      vacancy: z.string().min(1, { error: REQUIRED_MESSAGE }),
      srcOfRecruitment: z.string().min(1, { error: REQUIRED_MESSAGE }),
    }),
  ),

  // Province
  province: z.string().min(1, { error: REQUIRED_MESSAGE }),

  // Work Location
  districtId: z.array(z.any()),

  // Department
  department: z.string().min(1, { error: REQUIRED_MESSAGE }),
  sectionId: z.string().min(1, { error: REQUIRED_MESSAGE }),

  // Type of Employee
  levelId: z.string().min(1, { error: REQUIRED_MESSAGE }),
  degreeId: z.string().min(1, { error: REQUIRED_MESSAGE }),
  employeeTypeId: z.string().min(1, { error: REQUIRED_MESSAGE }),

  // Date
  startDate: z.string().min(1, { error: REQUIRED_MESSAGE }),
  endDate: z.string().min(1, { error: REQUIRED_MESSAGE }),
  acknowledgeDate: z.string().min(1, { error: REQUIRED_MESSAGE }),

  owner: z.string().optional(),
  recruiterUserId: z.array(z.any()),
  jobDescription: z.string().min(1, { error: REQUIRED_MESSAGE }),
  jobSpecification: z.string().min(1, { error: REQUIRED_MESSAGE }),
  jobBenefit: z.string().min(1, { error: REQUIRED_MESSAGE }),
});
