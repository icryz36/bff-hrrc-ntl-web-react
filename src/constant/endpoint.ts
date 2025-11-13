const endpoint = {
  masterData: {
    postStatus: `get-poststatus-master-xapi`,
    ntlRegion: `get-ntlregion-master-xapi`,
    position: `get-position-master-xapi`,
    district: `get-district-master-xapi`,
    department: `get-department-master-xapi`,
    section: `get-section-master-xapi`,
    province: `get-province-master-xapi`,
    jobLevel: `get-joblevel-master-xapi`,
    degree: `get-degree-master-xapi`,
    employeeType: `get-employeetype-master-xapi`,
  },
  jobpost: {
    list: `get-jobpost-list-xapi`,
    create: `create-jobpost-xapi`,
  },
};

export { endpoint };
