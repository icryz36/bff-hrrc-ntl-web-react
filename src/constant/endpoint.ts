const bffHrrecGateway = `bff-hrrec-gateway/v1`;
const bffHrrecUsersGateway = `bff-hrrec-users-gateway/v1`;
const bffHrrecJobpostGateway = `bff-hrrec-jobpost-gateway/v1`;
const bffHrrecCandidatesGateway = `bff-hrrec-candidates-gateway/v1`;

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
    skill: `get-skill-master-xapi`,
    titleName: `get-title-name-master-xapi`,
    documentType: `get-document-type-master-xapi`,
  },
  jobpost: {
    list: `${bffHrrecJobpostGateway}/get-jobpost-list-xapi`,
    listAll: `${bffHrrecJobpostGateway}/get-all-jobpost-list-xapi`,
    create: `${bffHrrecJobpostGateway}/create-jobpost-xapi`,
    detail: `${bffHrrecJobpostGateway}/get-jobpost-xapi`,
    updateStatus: `${bffHrrecJobpostGateway}/update-jobpost-status-xapi`,
    update: `${bffHrrecJobpostGateway}/update-jobpost-xapi`,
  },
  user: {
    list: `${bffHrrecUsersGateway}/get-users-xapi`,
  },
  candidate: {
    list: `${bffHrrecCandidatesGateway}/get-candidates-list-xapi`,
    detail: `${bffHrrecCandidatesGateway}/get-candidate-xapi`,
    updateInfo: `${bffHrrecCandidatesGateway}/update-candidate-xapi`,
    updateStatus: `${bffHrrecCandidatesGateway}/update-candidate-status-xapi`,
    updateBlacklist: `${bffHrrecCandidatesGateway}/update-candidate-blacklist-xapi`,
    updateNote: `${bffHrrecCandidatesGateway}/update-candidate-note-xapi`,
    document: `${bffHrrecCandidatesGateway}/get-document-xapi`,
    validate: `${bffHrrecGateway}/validate-candidates-xapi`,
    import: `${bffHrrecCandidatesGateway}/import-candidates-xapi`,
    downloadTemplate: `${bffHrrecCandidatesGateway}/get-document-xapi`,
  },
  jobApplication: {
    create: `${bffHrrecGateway}/create-job-application-xapi`,
    createJobBulk: `${bffHrrecGateway}/create-job-application-bulk-xapi`,
    board: `${bffHrrecGateway}/get-job-application-board-xapi`,
    list: `${bffHrrecGateway}/get-job-application-list-xapi`,
    checkStatus: `${bffHrrecGateway}/check-job-application-status-xapi`,
  },
};

export { endpoint };
