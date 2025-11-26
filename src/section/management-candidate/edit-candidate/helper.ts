import { TCandidateData } from 'types/candidate';
import { TEditCandidate } from './schema';

const convertDefaultValuesForm = (data?: TCandidateData): TEditCandidate => {
  console.log('data aaaaaa', data?.candidate);

  return {
    title: data?.candidate.title.titleId || '',
    name: data?.candidate.nameTh || '',
    surName: data?.candidate.surnameTh || '',
    nickName: data?.candidate.nickname || '',
    candidateId: data?.candidate.candidateId || '',
    //
    gender: data?.candidate.gender || '',
    age: data?.candidate.age || 0, //TODO: ทำ number
    contactNo: data?.candidate.mobileNo || '',
    email: data?.candidate.email || '',
    desiredLocation: data?.candidate.desiredLocation || '',
    desiredProvince: data?.candidate.desiredProvinces || [],
    highestEducation: data?.candidate.highestdegreeId || '',
    workExperience: data?.candidate.workExperience || '',
    motorcycleDriving: data?.candidate.hasmotorcycleLicense || '',
    carDriving: data?.candidate.hascarLicense || '',
    link: data?.candidate.linkReference || '',
  };
};

export { convertDefaultValuesForm };
