import { TStatusResponse } from './common';

// apply job ---------------------------------------------------------------

export type TApplyJobPayload = {
  jobPostId: string;
  candidates: string[];
};

export type TApplyJobResponse = TStatusResponse & {
  jobPostId: string;
};

// change job status --------------------------------------------------------

export type TChangeJobStatus = {
  statusId: string;
  note?: string;
};

export type TChangeJobResponse = TStatusResponse;

// create job application -----------------------------------------------------

export type TCreateJobApplicationPayload = {
  candidateId: string;
  jobPostId: string;
  stageId: string;
  statusId: string;
  applicationDate: string;
};

export type TCreateJobApplicationResponse = TStatusResponse & {
  data: {
    jobAppId: string;
  };
};

// count job application -----------------------------------------------------

export type TGetCountApplicationPayload = {
  jobPostId: string;
};

export type TGetCountApplicationResponse = TStatusResponse & {
  data: {
    new: number;
    cv: number;
    first_interview: number;
    second_interview: number;
    final_interview: number;
    offer: number;
    sign_contract: number;
    on_board: number;
  };
};
