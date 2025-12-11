import { queryOptions } from '@tanstack/react-query';
import { endpoint } from 'constant/endpoint';
import { TGetDistrictPayload, TGetSectionPayload } from 'types/master-data';
import {
  fetchDegree,
  fetchDepartment,
  fetchDistrict,
  fetchDocumentType,
  fetchEmployeeType,
  fetchJobLevel,
  fetchNtlRegion,
  fetchPosition,
  fetchPostStatus,
  fetchProvince,
  fetchSection,
  fetchSkill,
  fetchTitleName,
  fetchUsers,
} from './services';

// ----------------------------------------------------------------------

const useMasterDataQuery = {
  keys: () => ['master-data'] as const,

  postStatus: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.postStatus],
      queryFn: () => fetchPostStatus(),
      select: (response) => response.data,
    }),

  ntlRegion: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.ntlRegion],
      queryFn: () => fetchNtlRegion(),
      select: (response) => response.data,
    }),

  position: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.position],
      queryFn: () => fetchPosition(),
      select: (response) => response.data,
    }),

  district: (payload: TGetDistrictPayload) =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.district, payload],
      queryFn: () => fetchDistrict(payload),
      select: (response) => response.data,
    }),

  department: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.department],
      queryFn: () => fetchDepartment(),
      select: (response) => response.data,
    }),

  section: (payload: TGetSectionPayload) =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.section, payload],
      queryFn: () => fetchSection(payload),
      select: (response) => response.data,
    }),

  province: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.province],
      queryFn: () => fetchProvince(),
      select: (response) => response.data,
    }),

  jobLevel: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.jobLevel],
      queryFn: () => fetchJobLevel(),
      select: (response) => response.data,
    }),

  degree: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.degree],
      queryFn: () => fetchDegree(),
      select: (response) => response.data,
    }),

  employeeType: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.employeeType],
      queryFn: () => fetchEmployeeType(),
      select: (response) => response.data,
    }),

  users: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.user.list],
      queryFn: () => fetchUsers(),
      select: (response) => response.data,
    }),

  skill: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.skill],
      queryFn: () => fetchSkill(),
      select: (response) => response.data,
    }),

  titleName: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.titleName],
      queryFn: () => fetchTitleName(),
      select: (response) => response.data,
    }),

  documentType: () =>
    queryOptions({
      queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.documentType],
      queryFn: () => fetchDocumentType(),
      select: (response) => response.data,
    }),
};

export { useMasterDataQuery };
