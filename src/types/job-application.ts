import { TStatusResponse } from './common';

export type TApplyjobPayload = {
  jobPostId: string;
  candidates: string[];
};

export type TApplyjobResponse = TStatusResponse & {
  jobPostId: string;
};
