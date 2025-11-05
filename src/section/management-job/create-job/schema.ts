import { z } from 'zod';

// ----------------------------------------------------------------------

export type CreateJobSchemaType = z.infer<typeof CreateJobSchema>;

export const CreateJobSchema = z.object({
  district: z.array(z.any()),
  test: z.string().min(1, { error: 'required!' }),
  jobTitle: z.string().trim().min(1, { error: 'This field is required' }),
});
