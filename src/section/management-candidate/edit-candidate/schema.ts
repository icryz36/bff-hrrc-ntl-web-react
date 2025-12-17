import { REQUIRED_MESSAGE } from 'constant/error-message';
import { z } from 'zod';
import { schemaHelper } from 'components/hook-form';

// ----------------------------------------------------------------------

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const MAX_FILE_SIZE_RESUME = 2 * 1024 * 1024;

// ----------------------------------------------------------------------

type TEditCandidate = z.infer<typeof EditCandidateSchema>;

// info -----------------------------------------------------------------

export const CandidateInfoSchema = z.object({
  profile: z.custom<File | string | null>().optional(),
  title: z.string().min(1, { error: REQUIRED_MESSAGE }),
  name: z.string().min(1, { error: REQUIRED_MESSAGE }),
  surName: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  nickName: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  candidateId: z.string().optional(),
});

// basic information -----------------------------------------------------

export const CandidateBasicInformationSchema = z.object({
  gender: z.string().min(1, { error: REQUIRED_MESSAGE }),
  age: z.number().min(1, { error: REQUIRED_MESSAGE }),
  contactNo: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  email: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  desiredLocation: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  desiredProvince: z.array(z.any()).min(1, { error: REQUIRED_MESSAGE }),
  highestEducation: z.string().optional(),
  workExperience: z.string().trim().optional(),
  motorcycleDriving: z.string().min(1, { error: REQUIRED_MESSAGE }),
  carDriving: z.string().min(1, { error: REQUIRED_MESSAGE }),
});

// application documents --------------------------------------------------

const RemoteFileSchema = z.object({
  id: z.string(),
  url: z.string(),
  name: z.string(),
  fromServer: z.literal(true),
});

export const CandidateApplicationDocumentsSchema = z.object({
  documents: z
    .record(z.string(), z.array(z.union([z.custom<File>(), RemoteFileSchema])).optional())
    .optional(),
  files: z.custom<File | string | null>().optional(),
});

// link reference ----------------------------------------------------------

export const CandidateLinkReferenceSchema = z.object({
  link: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
});

// note --------------------------------------------------------------------

export const CandidateNoteSchema = z.object({
  note: z.string().trim().optional(),
});

// personal data -----------------------------------------------------------

export const PersonalDataSchema = z.object({
  address: z.string().trim().optional(),
  lineId: z.string().trim().optional(),
  dateOfBirth: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  nationality: z.string().optional(),
  religion: z.string().optional(),
  bloodGroup: z.string().optional(),
  placeofBirthId: z.string().optional(),
  idNo: z.string().optional(),
  cardissuedProvinceId: schemaHelper.objectOrNull().nullable().optional(),
  cardissuedDate: z.string().optional(),
  cardexpiredDate: z.string().optional(),
  militaryStatus: z.string().optional(),
  maritalStatus: z.string().optional(),
  familys: z
    .array(
      z.object({
        relationship: z.string().optional(),
        name: z.string().optional(),
        age: z.number().optional(),
        mobileNo: z.string().optional(),
        occupation: z.string().optional(),
        workplace: z.string().optional(),
      }),
    )
    .optional(),
  emergency: z
    .array(
      z.object({
        relationship: z.string().optional(),
        name: z.string().optional(),
        mobileNo: z.string().optional(),
      }),
    )
    .optional(),
});

// personal references -----------------------------------------------------

export const PersonalReferencesSchema = z.object({
  referencePersons: z
    .array(
      z.object({
        name: z.string().optional(),
        position: z.string().optional(),
        relation: z.string().optional(),
        workplace: z.string().optional(),
        mobileNo: z.string().optional(),
      }),
    )
    .optional(),
});

// educations ---------------------------------------------------------------

export const EducationSchema = z.object({
  educations: z
    .array(
      z.object({
        degreeId: z.string().optional(),
        institutionName: z.string().optional(),
        startYear: z.string().optional(),
        endYear: z.string().optional(),
        degreeConferred: z.string().optional(),
        major: z.string().optional(),
        gpa: z.string().optional(),
      }),
    )
    .optional(),
});

// language -----------------------------------------------------------------

export const LanguageSchema = z.object({
  languages: z
    .array(
      z.object({
        language: schemaHelper.objectOrNull().nullable().optional(),
        speaking: z.string().optional(),
        reading: z.string().optional(),
        writing: z.string().optional(),
      }),
    )
    .optional(),
});

// office skill & special ability -------------------------------------------

export const SkillSchema = z.object({
  skills: z
    .array(
      z.object({
        skillId: z.string().optional(),
        skillText: z.string().optional(),
        selectedOptionId: z.union([z.string(), z.array(z.string())]).optional(),
      }),
    )
    .optional(),

  hasNlInsBrokerLicenseNo: z.string().optional(),
  nlInsBrokerLicenseNo: z.string().optional(),

  hasNlInsAgentLicenseNo: z.string().optional(),
  nlInsAgentLicenseNo: z.string().optional(),

  hasLInsBrokerLicenseNo: z.string().optional(),
  lInsBrokerLicenseNo: z.string().optional(),

  hasLInsAgentLicenseNo: z.string().optional(),
  lInsAgentLicenseNo: z.string().optional(),

  transmissionTypeCar: z.array(z.string()).optional(),
  ownCar: z.string().optional(),

  transmissionTypeMotorcycle: z.array(z.string()).optional(),
  ownMotorcycle: z.string().optional(),
});

// employment history -------------------------------------------------------

export const EmploymentHistorySchema = z.object({
  isWorkedBefore: z.string().optional(),
  workHistorys: z
    .array(
      z.object({
        companyName: z.string().optional(),
        officePhoneNo: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        businessType: z.string().optional(),
        lastPosition: z.string().optional(),
        responsibilities: z.string().optional(),
        salary: z.string().optional(),
        otherIncome: z.string().optional(),
        leavingReason: z.string().optional(),
      }),
    )
    .optional(),

  isAnyoneRecommend: z.string().optional(),
  recommender: z
    .object({
      name: z.string().optional(),
      relation: z.string().optional(),
      position: z.string().optional(),
      mobileNo: z.string().optional(),
    })
    .optional(),
});

// other information --------------------------------------------------------

export const OtherInformationSchema = z.object({
  questions: z
    .array(
      z.object({
        questionId: z.string().optional(),
        answerText: z.string().optional(),
        answerOptionId: z.string().optional(),
      }),
    )
    .optional(),
});

// --------------------------------------------------------------------------

const EditCandidateSchema = CandidateInfoSchema.extend({
  ...CandidateBasicInformationSchema.shape,
  ...CandidateApplicationDocumentsSchema.shape,
  ...CandidateLinkReferenceSchema.shape,
  ...CandidateNoteSchema.shape,
  ...PersonalDataSchema.shape,
  ...PersonalReferencesSchema.shape,
  ...EducationSchema.shape,
  ...LanguageSchema.shape,
  ...SkillSchema.shape,
  ...EmploymentHistorySchema.shape,
  ...OtherInformationSchema.shape,
}).superRefine((data, ctx) => {
  if (!data.documents) return;

  for (const [key, files] of Object.entries(data.documents)) {
    if (!files) continue;

    const maxSize = key === 'resume' ? MAX_FILE_SIZE_RESUME : MAX_FILE_SIZE;
    const maxSizeMB = maxSize / 1024 / 1024;

    files.forEach((file) => {
      if (file instanceof File && file.size > maxSize) {
        ctx.addIssue({
          code: 'custom',
          message: `ไฟล์มีขนาดใหญ่เกินไป (สูงสุด ${maxSizeMB}MB)`,
          path: ['documents', key],
        });
      }
    });
  }
});

// --------------------------------------------------------------------------

export { EditCandidateSchema };
export type { TEditCandidate };
