import { endpoint } from 'constant/endpoint';
import { axiosMasterDataInstance } from 'services/axios/axiosInstance';
import {
  TGetDegreeResponse,
  TGetDepartmentResponse,
  TGetDistrictPayload,
  TGetDistrictResponse,
  TGetJobLevelResponse,
  TGetNtlRegionResponse,
  TGetPositionResponse,
  TGetPostStatusResponse,
  TGetProvinceResponse,
  TGetSectionPayload,
  TGetSectionResponse,
  TGetUserResponse,
  TGetemployeeTypeResponse,
} from 'types/master-data';

// query ---------------------------------------------------------------

export const fetchPostStatus = async (): Promise<TGetPostStatusResponse> => {
  console.log('axiosMasterDataInstance', axiosMasterDataInstance.defaults.baseURL);
  const { data } = await axiosMasterDataInstance({
    method: 'POST',
    url: endpoint.masterData.postStatus,
  });

  return data;
};

export const fetchNtlRegion = async (): Promise<TGetNtlRegionResponse> => {
  const { data } = await axiosMasterDataInstance({
    method: 'POST',
    url: endpoint.masterData.ntlRegion,
  });

  return data;
};

export const fetchPosition = async (): Promise<TGetPositionResponse> => {
  const { data } = await axiosMasterDataInstance({
    method: 'POST',
    url: endpoint.masterData.position,
  });

  return data;
};

export const fetchDistrict = async (
  payload: TGetDistrictPayload,
): Promise<TGetDistrictResponse> => {
  const { data } = await axiosMasterDataInstance({
    method: 'POST',
    url: endpoint.masterData.district,
    data: payload,
  });

  return data;
};

export const fetchDepartment = async (): Promise<TGetDepartmentResponse> => {
  const { data } = await axiosMasterDataInstance({
    method: 'POST',
    url: endpoint.masterData.department,
  });

  return data;
};

export const fetchSection = async (payload: TGetSectionPayload): Promise<TGetSectionResponse> => {
  const { data } = await axiosMasterDataInstance({
    method: 'POST',
    url: endpoint.masterData.section,
    data: payload,
  });

  return data;
};

export const fetchProvince = async (): Promise<TGetProvinceResponse> => {
  const { data } = await axiosMasterDataInstance({
    method: 'POST',
    url: endpoint.masterData.province,
  });

  return data;
};

export const fetchJobLevel = async (): Promise<TGetJobLevelResponse> => {
  const { data } = await axiosMasterDataInstance({
    method: 'POST',
    url: endpoint.masterData.jobLevel,
  });

  return data;
};

export const fetchDegree = async (): Promise<TGetDegreeResponse> => {
  const { data } = await axiosMasterDataInstance({
    method: 'POST',
    url: endpoint.masterData.degree,
  });

  return data;
};

export const fetchEmployeeType = async (): Promise<TGetemployeeTypeResponse> => {
  const { data } = await axiosMasterDataInstance({
    method: 'POST',
    url: endpoint.masterData.employeeType,
  });

  return data;
};

export const fetchUsers = async (): Promise<TGetUserResponse> => {
  const { data } = await axiosMasterDataInstance({
    method: 'POST',
    url: endpoint.masterData.users,
  });

  return data;
};
