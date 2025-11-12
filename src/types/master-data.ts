// common response
export type TStatusResponse = {
  transactionNo: string;
  timestamp: string;
  status: boolean;
};

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
