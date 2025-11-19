import { z } from 'zod';

// ----------------------------------------------------------------------

const REQUIRED_MESSAGE = 'This field is required';

// ----------------------------------------------------------------------

type TEditCandidateSchema = z.infer<typeof EditCandidateSchema>;

export const CandidateInfoSchema = z.object({
  title: z.string().min(1, { error: REQUIRED_MESSAGE }),
  name: z.string().min(1, { error: REQUIRED_MESSAGE }),
  surName: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  nickName: z.string().trim().min(1, { error: REQUIRED_MESSAGE }),
  candidateId: z.string().optional(),
});

export const CandidateBasicInformationSchema = z.object({
  gender: z.string().min(1, { error: REQUIRED_MESSAGE }),
  age: z.string().min(1, { error: REQUIRED_MESSAGE }),
  contactNo: z.string().min(1, { error: REQUIRED_MESSAGE }),
});

const EditCandidateSchema = z
  .object({})
  .merge(CandidateInfoSchema)
  .merge(CandidateBasicInformationSchema);

export { EditCandidateSchema };
export type { TEditCandidateSchema };
