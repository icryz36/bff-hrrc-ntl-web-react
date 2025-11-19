import { REQUIRED_MESSAGE } from 'constant/error-message';
import { z } from 'zod';
import { schemaHelper } from 'components/hook-form';

// ----------------------------------------------------------------------

type TEditCandidateSchema = z.infer<typeof EditCandidateSchema>;

// info -----------------------------------------------------------------

export const CandidateInfoSchema = z.object({
  title: z.string().min(1, { error: REQUIRED_MESSAGE }),
  name: z.string().min(1, { error: REQUIRED_MESSAGE }),
  surName: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  nickName: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  candidateId: z.string().optional(),
});

// basic information -----------------------------------------------------

export const CandidateBasicInformationSchema = z.object({
  gender: z.string().min(1, { error: REQUIRED_MESSAGE }),
  age: z.string().min(1, { error: REQUIRED_MESSAGE }),
  contactNo: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  email: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  desiredLocation: schemaHelper.objectOrNull({
    message: { required_error: REQUIRED_MESSAGE },
  }),
  desiredProvince: schemaHelper.objectOrNull({
    message: { required_error: REQUIRED_MESSAGE },
  }),
  highestEducation: schemaHelper.objectOrNull({
    message: { required_error: REQUIRED_MESSAGE },
  }),
  workExperience: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  motorcycleDriving: z.string().min(1, { error: REQUIRED_MESSAGE }),
  carDriving: z.string().min(1, { error: REQUIRED_MESSAGE }),
});

// application documents --------------------------------------------------

export const CandidateApplicationDocumentsSchema = z.object({
  documents: z.string().min(1, { error: REQUIRED_MESSAGE }),
  files: schemaHelper.files(),
});

// link reference ----------------------------------------------------------

export const CandidateLinkReferenceSchema = z.object({
  link: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
});

// note --------------------------------------------------------------------

export const CandidateNoteSchema = z.object({
  note: z.string().trim().optional(),
});

// -------------------------------------------------------------------------

const EditCandidateSchema = CandidateInfoSchema.extend({
  ...CandidateBasicInformationSchema.shape,
  ...CandidateApplicationDocumentsSchema.shape,
  ...CandidateLinkReferenceSchema.shape,
  ...CandidateNoteSchema.shape,
});

// --------------------------------------------------------------------------

export { EditCandidateSchema };
export type { TEditCandidateSchema };
