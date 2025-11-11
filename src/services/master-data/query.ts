import { queryOptions } from '@tanstack/react-query';
import { endpoint } from 'constant/endpoint';
import { TGetDistrictPayload, TGetSectionPayload } from 'types/master-data';
import {
  fetchDegree,
  fetchDepartment,
  fetchDistrict,
  fetchEmployeeType,
  fetchJobLevel,
  fetchNtlRegion,
  fetchPosition,
  fetchPostStatus,
  fetchProvince,
  fetchSection,
} from './services';

// ----------------------------------------------------------------------

const useMasterDataQuery = {
  keys: () => ['master-data'] as const,

  postStatus: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.postStatus],
      queryFn: () => fetchPostStatus(),
    }),

  ntlRegion: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.ntlRegion],
      queryFn: () => fetchNtlRegion(),
    }),

  position: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.position],
      queryFn: () => fetchPosition(),
    }),

  district: (payload: TGetDistrictPayload) =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.district, payload],
      queryFn: () => fetchDistrict(payload),
    }),

  department: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.department],
      queryFn: () => fetchDepartment(),
    }),

  section: (payload: TGetSectionPayload) =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.section, payload],
      queryFn: () => fetchSection(payload),
    }),

  province: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.province],
      queryFn: () => fetchProvince(),
    }),

  jobLevel: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.jobLevel],
      queryFn: () => fetchJobLevel(),
    }),

  degree: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.degree],
      queryFn: () => fetchDegree(),
    }),

  employeeType: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.employeeType],
      queryFn: () => fetchEmployeeType(),
    }),
};

export { useMasterDataQuery };
