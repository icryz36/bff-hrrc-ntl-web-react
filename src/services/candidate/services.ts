import { CANDIDATES } from 'data/candidate';
import { TGetCandidateListPayload, TGetCandidateListResponse } from 'types/candidate';

export const fetchCandidateList = async (
  payload: TGetCandidateListPayload,
): Promise<TGetCandidateListResponse> => {
  //   const { data } = await axiosJobPostInstance({
  //     method: 'POST',
  //     url: endpoint.jobpost.list,
  //     data: payload,
  //   });

  console.log('payload ==> ', payload);

  const data = {
    data: {
      items: CANDIDATES,
      pagination: {
        pageNo: 1,
        pageSize: 10,
        totalRecords: 12,
        totalPages: 2,
      },
    },
    transactionNo: 'string',
    timestamp: 'string',
    status: true,
  };

  return data;
};
