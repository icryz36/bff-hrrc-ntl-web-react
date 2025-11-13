const endpoint = {
  masterData: {
    postStatus: `3001/bff-hrrec-masterdata-gateway/v1/get-poststatus-master-xapi`,
    ntlRegion: `3001/bff-hrrec-masterdata-gateway/v1/get-ntlregion-master-xapi`,
    position: `3001/bff-hrrec-masterdata-gateway/v1/get-position-master-xapi`,
    district: `3001/bff-hrrec-masterdata-gateway/v1/get-district-master-xapi`,
    department: `3001/bff-hrrec-masterdata-gateway/v1/get-department-master-xapi`,
    section: `3001/bff-hrrec-masterdata-gateway/v1/get-section-master-xapi`,
    province: `3001/bff-hrrec-masterdata-gateway/v1/get-province-master-xapi`,
    jobLevel: `3001/bff-hrrec-masterdata-gateway/v1/get-joblevel-master-xapi`,
    degree: `3001/bff-hrrec-masterdata-gateway/v1/get-degree-master-xapi`,
    employeeType: `3001/bff-hrrec-masterdata-gateway/v1/get-employeetype-master-xapi`,
  },
  jobpost: {
    list: `3002/bff-hrrec-jobpost-gateway/v1/get-jobpost-list-xapi`,
    create: `3002/bff-hrrec-jobpost-gateway/v1/create-jobpost-xapi`,
  },
};

export { endpoint };
