const GROUP_LOCATION = [
  { label: 'HO', value: 'HO' },
  { label: 'Branch', value: 'BRANCH' },
] as const;

const OPTION_VACANCY = [
  { label: 'Replacement', value: 'Replacement' },
  { label: 'Additional', value: 'Additional' },
] as const;

const OPTION_SOURCE_OF_RECRUITMENT = [
  { label: 'Internal & External', value: 'Internal & External' },
  { label: 'Internal Only', value: 'Internal Only' },
  { label: 'External Only', value: 'External Only' },
] as const;

const OPTION_YES_NO = [
  { label: 'มี', value: 'YES' },
  { label: 'ไม่มี', value: 'NO' },
] as const;

const OPTION_TRANSMISSION_TYPE = [
  { label: 'Manual', value: 'Manual' },
  { label: 'Automatic', value: 'Automatic' },
] as const;

const OPTION_HAS_EXPERIENCE = [
  { label: 'เคย', value: 'YES' },
  { label: 'ไม่เคย', value: 'NO' },
] as const;

const OPTION_CONFIRM = [
  { label: 'ใช่', value: 'YES' },
  { label: 'ไม่ใช่', value: 'NO' },
] as const;

const OPTION_GENDER = [
  { label: 'ชาย', value: 'm' },
  { label: 'หญืง', value: 'f' },
] as const;

const OPTION_VEHICLE = [
  { label: 'ได้ มีใบขับขี่', value: 'yes_licensed' },
  { label: 'ได้ ไม่มีใบขับขี่', value: 'yes_unlicensed' },
  { label: 'ไม่ได้', value: 'no' },
] as const;

export {
  GROUP_LOCATION,
  OPTION_VACANCY,
  OPTION_SOURCE_OF_RECRUITMENT,
  OPTION_YES_NO,
  OPTION_TRANSMISSION_TYPE,
  OPTION_HAS_EXPERIENCE,
  OPTION_CONFIRM,
  OPTION_GENDER,
  OPTION_VEHICLE,
};
