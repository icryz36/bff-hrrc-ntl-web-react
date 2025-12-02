export type FilterState = {
  jobTitle: string;
  department: string[];
  region: string;
  province: string;
  district: string;
  jobStatus: string;
  owner: string;
  startDate: Date | null;
  activeDay: string;
};
