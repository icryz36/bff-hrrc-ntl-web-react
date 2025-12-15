import {
  TCandidateData,
  TCandidateDocumentsItem,
  TDocumentItem,
  TUpdateCandidatePayload,
} from 'types/candidate';
import { RemoteFile, UploadFile } from 'components/hook-form';
import { TEditCandidate } from './schema';

// ----------------------------------------------------------------------

const PROFILE_DOC_TYPE_KEY = 'profile_picture';

// ----------------------------------------------------------------------

const getBase64Src = (base64?: string) => {
  if (!base64) return '';
  return `data:image/*;base64,${base64}`;
};

const convertDefaultValuesForm = (
  data?: TCandidateData,
  fileImageData?: string,
): TEditCandidate => {
  const profile = getBase64Src(fileImageData);

  return {
    title: data?.candidate.title.titleId || '',
    name: data?.candidate.nameTh || '',
    surName: data?.candidate.surnameTh || '',
    nickName: data?.candidate.nickname || '',
    candidateId: data?.candidate.candidateId || '',
    gender: data?.candidate.gender || '',
    age: data?.candidate.age || 0,
    contactNo: data?.candidate.mobileNo || '',
    email: data?.candidate.email || '',
    desiredLocation: data?.candidate.desiredLocation || '',
    desiredProvince: data?.candidate.desiredProvinces || [],
    highestEducation: data?.candidate.highestdegreeId || '',
    workExperience: data?.candidate.workExperience || '',
    motorcycleDriving: data?.candidate.canDriveMotorcycle || '',
    carDriving: data?.candidate.canDriveCar || '',
    link: data?.candidate.linkReference || '',
    documents: mapDocumentsToForm(data?.documents || []),
    note: data?.candidate.note || '',
    profile,
  };
};

const mapDocumentsToForm = (documents: TDocumentItem[]) => {
  const result: Record<string, UploadFile[]> = {};

  documents.forEach((doc) => {
    const key = doc.documentType.documentTypeKey;

    const remoteFile: RemoteFile = {
      id: doc.documentId,
      url: doc.filePath,
      name: doc.fileName,
      fromServer: true,
    };

    if (!result[key]) result[key] = [];
    result[key].push(remoteFile);
  });

  return result;
};

// ----------------------------------------------------------------------

const groupApiDocumentsByKey = (apiDocs: TDocumentItem[]) => {
  return apiDocs.reduce<Record<string, TDocumentItem[]>>((acc, doc) => {
    const key = doc.documentType.documentTypeKey;
    if (!acc[key]) acc[key] = [];
    acc[key].push(doc);
    return acc;
  }, {});
};

const isRemoteFile = (file: UploadFile): file is RemoteFile => !(file instanceof File);

const processDeletedDocumentTypes = (
  docs: Record<string, UploadFile[] | undefined>,
  originalByKey: Record<string, TDocumentItem[]>,
): TCandidateDocumentsItem[] => {
  const operations: TCandidateDocumentsItem[] = [];

  Object.entries(originalByKey).forEach(([docTypeKey, originals]) => {
    if (docTypeKey === PROFILE_DOC_TYPE_KEY) return;

    if (docs[docTypeKey] === undefined) {
      originals.forEach((ori) => {
        operations.push({
          documentId: ori.documentId,
          operation: 'delete',
          fileName: ori.fileName,
          docTypeKey,
        });
      });
    }
  });

  return operations;
};

const getDeletedDocuments = (
  originals: TDocumentItem[],
  currentRemoteIds: Set<string>,
  hasNewFiles: boolean,
  docTypeKey: string,
): TCandidateDocumentsItem[] => {
  return originals
    .filter((ori) => {
      const isReplacedByNewFile = hasNewFiles && ori.documentId === originals[0].documentId;
      return !currentRemoteIds.has(ori.documentId) && !isReplacedByNewFile;
    })
    .map((ori) => ({
      documentId: ori.documentId,
      operation: 'delete' as const,
      fileName: ori.fileName,
      docTypeKey,
    }));
};

const processDocumentOperations = (
  docTypeKey: string,
  files: UploadFile[] | undefined,
  originals: TDocumentItem[],
): {
  operations: TCandidateDocumentsItem[];
  newFile?: File;
} => {
  if (!files) {
    return { operations: [] };
  }

  const newFiles = files.filter((f) => f instanceof File) as File[];
  const currentRemoteFiles = files.filter(isRemoteFile);
  const operations: TCandidateDocumentsItem[] = [];

  // กรณีไม่มีไฟล์เดิม - insert ใหม่
  if (originals.length === 0) {
    newFiles.forEach((file) => {
      operations.push({
        documentId: null,
        operation: 'insert',
        fileName: file.name,
        docTypeKey,
      });
    });

    return {
      operations,
      newFile: newFiles[0],
    };
  }

  // กรณีมีไฟล์ใหม่ - update ไฟล์
  if (newFiles.length > 0) {
    const targetOriginal = originals[0];
    operations.push({
      documentId: targetOriginal.documentId,
      operation: 'update',
      fileName: newFiles[0].name,
      docTypeKey,
    });
  }

  // หาไฟล์ที่ถูกลบ
  const currentRemoteIds = new Set(currentRemoteFiles.map((f) => f.id));
  const deletedOperations = getDeletedDocuments(
    originals,
    currentRemoteIds,
    newFiles.length > 0,
    docTypeKey,
  );

  return {
    operations: [...operations, ...deletedOperations],
    newFile: newFiles[0],
  };
};

const buildCandidatePayload = (
  data: TEditCandidate,
): Omit<TUpdateCandidatePayload['payload'], 'candidateDocuments'> => ({
  candidateId: data.candidateId || '',
  idNo: data.idNo || '',
  titleId: data.title,
  nameTh: data.name,
  surnameTh: data.surName,
  nickname: data.nickName,
  gender: data.gender,
  age: data.age,
  email: data.email,
  desiredLocation: data.desiredLocation,
  mobileNo: data.contactNo,
  canDriveCar: data.carDriving,
  canDriveMotorcycle: data.motorcycleDriving,
  linkReference: data.link,
  note: data.note || '',
  desiredProvinces: data.desiredProvince.map((item) => ({
    provinceId: item.provinceId,
    desiredLocation: item.provinceName,
  })),
  workExperience: data.workExperience || '',
});

const convertCreateEditCandidatePostPayload = (
  data: TEditCandidate,
  originalDocuments: TDocumentItem[],
): TUpdateCandidatePayload => {
  const docs = data.documents ?? {};
  const originalByKey = groupApiDocumentsByKey(originalDocuments);

  const candidateDocuments: TCandidateDocumentsItem[] = [];
  const dynamicFiles: Record<string, File> = {};

  Object.entries(docs).forEach(([docTypeKey, files]) => {
    const { operations, newFile } = processDocumentOperations(
      docTypeKey,
      files,
      originalByKey[docTypeKey] ?? [],
    );

    candidateDocuments.push(...operations);

    if (newFile) {
      dynamicFiles[docTypeKey] = newFile;
    }
  });

  // uplaod new profile  -------------------------------------

  const originalProfileDocs = originalByKey[PROFILE_DOC_TYPE_KEY] ?? [];
  const profileValue = data.profile;

  if (profileValue instanceof File) {
    const files: UploadFile[] = [profileValue];

    const { operations, newFile } = processDocumentOperations(
      PROFILE_DOC_TYPE_KEY,
      files,
      originalProfileDocs,
    );

    candidateDocuments.push(...operations);

    if (newFile) {
      dynamicFiles[PROFILE_DOC_TYPE_KEY] = newFile;
    }
  }

  // delete image profile -------------------------------------

  if (profileValue === null && originalProfileDocs.length > 0) {
    const currentRemoteIds = new Set<string>();
    const deletedOps = getDeletedDocuments(
      originalProfileDocs,
      currentRemoteIds,
      false,
      PROFILE_DOC_TYPE_KEY,
    );
    candidateDocuments.push(...deletedOps);
  }

  // --------------------------------------------------------------

  // ลบ docType ที่หายไป
  const deletedOperations = processDeletedDocumentTypes(docs, originalByKey);
  candidateDocuments.push(...deletedOperations);

  return {
    payload: {
      ...buildCandidatePayload(data),
      candidateDocuments,
    },
    ...dynamicFiles,
  };
};

const buildCreateCandidateFormData = (payload: TUpdateCandidatePayload) => {
  const formData = new FormData();

  formData.append('payload', JSON.stringify(payload.payload));

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
