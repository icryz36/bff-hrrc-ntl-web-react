const bffHrrecGateway = `bff-hrrec-gateway/v1`;
const bffHrrecUsersGateway = `bff-hrrec-users-gateway/v1`;
const bffHrrecJobpostGateway = `bff-hrrec-jobpost-gateway/v1`;
const bffHrrecCandidatesGateway = `bff-hrrec-candidates-gateway/v1`;
const bffHrrecMasterdataGateway = `bff-hrrec-masterdata-gateway/v1`;

const endpoint = {
  masterData: {
    postStatus: `${bffHrrecMasterdataGateway}/get-poststatus-master-xapi`,
    ntlRegion: `${bffHrrecMasterdataGateway}/get-ntlregion-master-xapi`,
    position: `${bffHrrecMasterdataGateway}/get-position-master-xapi`,
    district: `${bffHrrecMasterdataGateway}/get-district-master-xapi`,
    department: `${bffHrrecMasterdataGateway}/get-department-master-xapi`,
    section: `${bffHrrecMasterdataGateway}/get-section-master-xapi`,
    province: `${bffHrrecMasterdataGateway}/get-province-master-xapi`,
    jobLevel: `${bffHrrecMasterdataGateway}/get-joblevel-master-xapi`,
    degree: `${bffHrrecMasterdataGateway}/get-degree-master-xapi`,
    employeeType: `${bffHrrecMasterdataGateway}/get-employeetype-master-xapi`,
    skill: `${bffHrrecMasterdataGateway}/get-skill-master-xapi`,
    titleName: `${bffHrrecMasterdataGateway}/get-title-name-master-xapi`,
    documentType: `${bffHrrecMasterdataGateway}/get-document-type-master-xapi`,
  },
  batch: {
    byId: `${bffHrrecGateway}/batch/get-batch-records-xapi`,
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
    import: `${bffHrrecGateway}/import-candidates-xapi`,
    downloadTemplate: `${bffHrrecCandidatesGateway}/get-document-xapi`,
    batchList: `${bffHrrecGateway}/batch/get-batch-status-list-xapi`,
    downloadCandidateFail: `${bffHrrecGateway}/get-batch-records-candidatefile-xapi`,
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
