import { endpoint } from 'constant/endpoint';
import axiosInstance from 'services/axios/axiosInstance';
import {
  TCreateExamplePayload,
  TCreateExampleResponse,
  TGetExampleResponse,
} from 'types/example/get-example';

// Query ---------------------------------------------------------------

export const fetchExampleApi = async (id: string): Promise<TGetExampleResponse> => {
  const { data } = await axiosInstance({
    method: 'GET',
    url: endpoint.exampleFeature.detail(id),
  });

  return data;
};

// Mutation ---------------------------------------------------------------

export const postCreateExample = async (
  payload: TCreateExamplePayload,
): Promise<TCreateExampleResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    data: payload,
    url: endpoint.exampleFeature.create,
  });

  return data;
};
