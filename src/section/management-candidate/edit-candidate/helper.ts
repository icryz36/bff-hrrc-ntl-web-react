import { TCandidateData, TCandidateDocumentsItem, TCreateCandidatePayload } from 'types/candidate';
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
const convertCreateEditCandidatePostPayload = (data: TEditCandidate): TCreateCandidatePayload => {
  const docs = data.documents ?? {};

  const candidateDocuments: Array<TCandidateDocumentsItem> = [];
  const dynamicFiles: Record<string, File> = {};

  Object.entries(docs).forEach(([docTypeKey, files]) => {
    if (!files || files.length === 0) return;

    files.forEach((file) => {
      candidateDocuments.push({
        documentId: '',
        operation: 'CREATE',
        fileName: file.name,
        docTypeKey,
      });
      if (!dynamicFiles[docTypeKey]) {
        dynamicFiles[docTypeKey] = file;
      }
    });
  });

  return {
    payload: {
      candidateId: data.candidateId || '',
      idNo: data.idNo || '',
      titleId: data.title,
      nameTh: data.name,
      surnameTh: data.surName,
      nickname: data.nickName,
      gender: data.gender,
      age: data.age,
      email: data.email,
      desiredProvinces: data.desiredProvince.map((p) => ({ provinceId: p.provinceId })),
      desiredLocation: data.desiredLocation,
      mobileNo: data.contactNo,
      canDriveCar: data.carDriving,
      canDriveMotorcycle: data.motorcycleDriving,
      linkReference: data.link,
      note: data.note || '',
      candidateDocuments,
    },
    ...dynamicFiles,
  };
};
const buildCreateCandidateFormData = (payload: TCreateCandidatePayload) => {
  const formData = new FormData();

  // ใส่ payload JSON
  formData.append('payload', JSON.stringify(payload.payload));

  // วนทุก key ที่เหลือ (ไฟล์)
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'payload') return; // ข้าม payload
    if (value instanceof File) {
      formData.append(key, value); // ใส่ไฟล์ตาม docTypeKey
    }
  });

  return formData;
};
export {
  convertDefaultValuesForm,
  convertCreateEditCandidatePostPayload,
  buildCreateCandidateFormData,
};
