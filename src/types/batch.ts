import { TStatusResponse } from './common';

export type TGetBatchByIdPayload = {
  pageNo: number;
  pageSize: number;
  batchId: string;
};
export type TGetBatchByIdItems = {
  recordId: string;
  batchId: string;
  validationStatus: string;
  errorMsg: {
    field: string;
    errorMsg: string;
  }[];
  title: {
    titleId: string;
    nameTh: string;
    nameEn: string;
  };
  name: string;
  surname: string;
  age: number;
  mobileNo: string;
  email: string;
  desiredLocation: string;
  desiredProvince: {
    provinceId: string;
    provinceNameTh: string;
    provinceNameEn: string;
  }[];
  highestDegree: string;
  workExperience: string;
  canDriveMotorcycle: string;
  canDriveCar: string;
  jobPostNo: string | null;
  applicationSource: string;
  applicationDate: string;
};

export type TGetBatchByIdResponse = TStatusResponse & {
  total: number;
  page: number;
  items: TGetBatchByIdItems[];
};
