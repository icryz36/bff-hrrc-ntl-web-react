import { TStatusResponse } from './common';

// post status --------------------------------------------------------------

export type TGetPostStatusResponse = TStatusResponse & {
  data: TPostStatus[];
};

export type TPostStatus = {
  statusId: string;
  statusNameTh: string;
  statusNameEn: string;
};

// ntl region ---------------------------------------------------------------

export type TGetNtlRegionResponse = TStatusResponse & {
  data: TNtlRegion[];
};

export type TNtlRegion = {
  regionId: string;
  regionNameTh: string;
  regionNameEn: string;
};

// position -----------------------------------------------------------------

export type TGetPositionResponse = TStatusResponse & {
  data: TPosition[];
};

export type TPosition = {
  positionId: string;
  positionNameTh: string;
  positionNameEn: string;
};

// district -----------------------------------------------------------------

export type TGetDistrictPayload = {
  provinceId: string;
};

export type TGetDistrictResponse = TStatusResponse & {
  data: TDistrict[];
};

export type TDistrict = {
  districtId: string;
  districtNameTh: string;
  districtNameEn: string;
};

// department ---------------------------------------------------------------

export type TGetDepartmentResponse = TStatusResponse & {
  data: TDepartment[];
};

export type TDepartment = {
  departmentId: string;
  departmentNameTh: string;
  departmentNameEn: string;
};

// section -------------------------------------------------------------------

export type TGetSectionPayload = {
  departmentId: string;
};

export type TGetSectionResponse = TStatusResponse & {
  data: TSection[];
};

export type TSection = {
  sectionId: string;
  sectionNameTh: string;
  sectionNameEn: string;
};

// province ------------------------------------------------------------------

export type TGetProvinceResponse = TStatusResponse & {
  data: TProvince[];
};

export type TProvince = {
  provinceId: string;
  provinceNameTh: string;
  provinceNameEn: string;
};

// job level ------------------------------------------------------------------

export type TGetJobLevelResponse = TStatusResponse & {
  data: TJobLevel[];
};

export type TJobLevel = {
  levelId: string;
  levelNameTh: string;
  levelNameEn: string;
};

// degree ---------------------------------------------------------------------

export type TGetDegreeResponse = TStatusResponse & {
  data: TDegree[];
};

export type TDegree = {
  degreeId: string;
  degreeNameTh: string;
  degreeNameEn: string;
};

// employee type --------------------------------------------------------------

export type TGetemployeeTypeResponse = TStatusResponse & {
  data: TEmployeeType[];
};

export type TEmployeeType = {
  employeeTypeId: string;
  employeeTypeTH: string;
  employeeTypeEN: string;
};

// group location --------------------------------------------------------------

export type TGroupLocation = {
  label: string;
  value: string;
};

// Vacancy ---------------------------------------------------------------------

export type TVacancy = {
  label: string;
  value: string;
};

//  Source Of Recruitment ------------------------------------------------------

export type TSourceOfRecruitment = {
  label: string;
  value: string;
};

// users -----------------------------------------------------------------------

export type TGetUserResponse = TStatusResponse & {
  data: TUser[];
};

export type TUser = {
  userId: string;
  name: string;
  surname: string;
};

// skill ------------------------------------------------------------------------

export type TGetSkillResponse = TStatusResponse & {
  data: TSkill[];
};

export type TSkill = {
  skillId: string;
  skillNameTh: string;
  skillNameEn: string;
  skillCategory: string;
  skillOptionType: 'Dropdown' | 'Checkbox' | 'Radio';
  isSkillFreeText: boolean;
  skillOptions: TSkillOptions[];
};

export type TSkillOptions = {
  skillOptionId: string;
  skillTextTh: string;
  skillTextEn: string;
};

// title name ------------------------------------------------------------------

export type TGetTitleNameResponse = TStatusResponse & {
  data: TitleName[];
};

export type TitleName = {
  titleId: string;
  titleNameTh: string;
  titleNameEn: string;
};

// document type ----------------------------------------------------------------

export type TGetDocumentTypeResponse = TStatusResponse & {
  data: TDocumentType[];
};

export type TDocumentType = {
  documentTypeId: string;
  documentTypeNameTh: string;
  documentTypeNameEn: string;
  documentTypeKey: string;
};

// MAP master data --------------------------------------------------------------

export type MasterDataMaps = {
  postStatusMap: Map<TPostStatus['statusId'], TPostStatus>;
  regionMap: Map<TNtlRegion['regionId'], TNtlRegion>;
  provinceMap: Map<TProvince['provinceId'], TProvince>;
  departmentMap: Map<TDepartment['departmentId'], TDepartment>;
  jobLevelMap: Map<TJobLevel['levelId'], TJobLevel>;
  degreeMap: Map<TDegree['degreeId'], TDegree>;
  employeeTypeMap: Map<TEmployeeType['employeeTypeId'], TEmployeeType>;
  positionMap: Map<TPosition['positionId'], TPosition>;
  usersMap: Map<TUser['userId'], TUser>;
  districtMap: Map<TDistrict['districtId'], TDistrict>;
  sectionMap: Map<TSection['sectionId'], TSection>;
};
