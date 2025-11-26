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
    users: `get-users-xapi`,
  },
  jobpost: {
    list: `get-jobpost-list-xapi`,
    create: `create-jobpost-xapi`,
    detail: `get-jobpost-xapi`,
    updateStatus: `update-jobpost-status-xapi`,
    update: `update-jobpost-xapi`,
  },
  user: {
    list: `get-users-xapi`,
  },
  candidate: {
    list: `get-candidates-list-xapi`,
    detail: `get-candidate-xapi`,
    updateStatus: `update-candidate-status-xapi`,
    updateBlacklist: `update-candidate-blacklist-xapi`,
  },
};

export { endpoint };
