import { endpoint } from 'constant/endpoint';
import axiosInstance from 'services/axios/axiosInstance';
import { TGetBatchByIdPayload, TGetBatchByIdResponse } from 'types/batch';

export const fetchBatchById = async (
  payload: TGetBatchByIdPayload,
): Promise<TGetBatchByIdResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.batch.byId,
    data: payload,
  });

  return data;
};
