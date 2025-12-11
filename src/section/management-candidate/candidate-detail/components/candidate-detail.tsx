import { Avatar, Box, Container, Link, Stack, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useQuery } from '@tanstack/react-query';
import { OPTION_VEHICLE } from 'constant/enum';
import { useCandidateQuery } from 'services/candidate/query';
import { TCandidateData } from 'types/candidate';
import IconifyIcon from 'components/base/IconifyIcon';
import AccordionCustom from 'components/common/AccordionCustom';
import DefaultLoader from 'components/loading/DefaultLoader';
import AppliedJobTable from './applied-job-table';
import FileDownloadBox from './file-download-box';
import InformationBox from './information-box';
import NoteBox from './note-box';

type CandidateDetailProps = {
  candidateId: string;
};

export const CandidateDetail = ({ candidateId }: CandidateDetailProps) => {
  const { data: candidateDetail, isLoading } = useQuery({
    ...useCandidateQuery.detail({ candidateId: candidateId }),
    enabled: !!candidateId,
  });

  const profileDocument = candidateDetail?.documents?.find(
    (doc) => doc.documentType.documentTypeKey === 'profile_picture',
  );

  const filePath = profileDocument?.filePath;

  const { data: fileData, isLoading: fileLoading } = useQuery({
    ...useCandidateQuery.document({ filePath: filePath || '' }),
    enabled: !!filePath,
  });
  const { jobApplications, candidate, documents } = candidateDetail || ({} as TCandidateData);

  const getBase64Src = (base64?: string) => {
    if (!base64) return '';
    return `data:image/*;base64,${base64}`;
  };

  const carDrivingCar = OPTION_VEHICLE.find((item) => item.value === candidate?.canDriveCar);
  const canDriveMotorcycle = OPTION_VEHICLE.find(
    (item) => item.value === candidate?.canDriveMotorcycle,
  );

  if (isLoading) {
    return <DefaultLoader />;
  }
  if (!candidateDetail?.candidate) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center', mt: 10 }}>
        <Typography>ไม่พบข้อมูล</Typography>
      </Box>
    );
  }

  const accordionData = [
    {
      icon: 'mdi:account-outline',
      title: 'Applied Job',
      children: <AppliedJobTable tableData={jobApplications ?? []} />,
      defaultExpanded: !(jobApplications?.length === 0),
    },
    {
      icon: 'mdi:account-outline',
      title: 'Basic information',
      children: (
        <InformationBox
          background
          rows={[
            { label: 'Gender', value: candidate?.gender === 'm' ? 'ชาย' : 'หญิง' },
            { label: 'Age', value: candidate?.age },
            { label: 'Contact No.', value: candidate?.mobileNo },
            { label: 'Email', value: candidate?.email },
            { label: 'Desired Location', value: candidate?.desiredLocation },
            {
              label: 'Desired Province',
              value: candidate?.desiredProvinces.map((i) => i.provinceName).join('\n'),
            },
            { label: 'Highest Education', value: '', fullWidth: true },
            {
              label: 'Work Experience',
              value: '-',
              fullWidth: true,
            },
            {
              label: 'Motorcycle Driving',
              value: canDriveMotorcycle?.label || '-',
              fullWidth: true,
            },
            { label: 'Car Driving', value: carDrivingCar?.label || '-', fullWidth: true },
          ]}
        />
      ),
      defaultExpanded: true,
    },
    {
      icon: 'mdi:note-text-outline',
      title: 'Application Documents',
      children: <FileDownloadBox data={documents} />,
      defaultExpanded: true,
    },
    {
      icon: 'mdi:note-text-outline',
      title: 'Link Reference',
      children: (
        <Box>
          <Typography
            sx={{
              wordBreak: 'break-all',
            }}
            variant="subtitle2_regular"
          >
            <Link href={candidate?.linkReference} target="_blank" rel="noopener noreferrer">
              {candidate?.linkReference}
            </Link>
          </Typography>
        </Box>
      ),
      defaultExpanded: true,
    },
    {
      icon: 'mdi:note-text-outline',
      title: 'Note (Optional)',
      children: <NoteBox candidateId={candidate?.candidateId} data={candidate?.note} />,
      defaultExpanded: true,
    },
    {
      icon: 'mdi:account-outline',
      title: 'Personal Data',
      children: (
        <InformationBox
          rows={[
            { label: 'Present Address', value: '', fullWidth: true },
            { label: 'Line ID', value: '' },
            { label: 'Date of Birth', value: '' },
            { label: 'Height (cm.)', value: '' },
            { label: 'Weight (kg.)', value: '' },
            { label: 'Nationality', value: '' },
            { label: 'Blood Group', value: '' },
            { label: 'Religion', value: '' },
            { label: 'Place of Birth', value: '' },
            { label: 'ID Card No.', value: '' },
            { label: 'Issued by Province', value: '' },
            { label: 'Issued Date', value: '' },
            { label: 'Expired Date', value: '' },
            { label: 'Military Service', value: '', fullWidth: true },
            { label: 'Family Details', value: '', fullWidth: true },
            { label: 'Marital Detail', value: '', fullWidth: true },
            { label: 'Contact in case emergency', value: '', fullWidth: true },
          ]}
        />
      ),
      defaultExpanded: true,
    },
    {
      icon: 'mdi:account-box-outline',
      title: 'Personal References',
      children: '',
    },
    {
      icon: 'mdi:education-outline',
      title: 'Education',
      children: '',
    },
    {
      icon: 'material-symbols:language',
      title: 'Language',
      children: '',
    },
    {
      icon: 'mdi:folder-outline',
      title: 'Office Skill & Special Ability',
      children: '',
    },
    {
      icon: 'line-md:briefcase',
      title: 'Employment History',
      children: '',
    },
    {
      icon: 'mdi:shape-outline',
      title: 'Hobby And Interest',
      children: '',
    },
    {
      icon: 'mdi:list-box-outline',
      title: 'Other Information',
      children: '',
    },
    {
      icon: 'ic:outline-checklist',
      title: 'Score',
      children: '',
    },
  ];

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1111px', mx: 'auto' }}>
      {candidate?.isBlacklist && (
        <Box sx={{ bgcolor: red[700], p: 1.5, borderRadius: 2, mb: 2, color: 'white' }}>
          <Stack spacing={1}>
            <IconifyIcon
              icon="tdesign:close-octagon"
              fontSize="20px"
              style={{ verticalAlign: 'middle', marginRight: 8 }}
            />
            <Typography variant="subtitle2_bold">
              Black List : {candidate?.blacklistReason || '-'}
            </Typography>
          </Stack>
        </Box>
      )}
      <Stack gap={2} alignItems={'center'} mt={2} py={1}>
        <Avatar
          src={getBase64Src(fileData?.binaryBase64)}
          sx={{
            height: 72,
            width: 72,
            borderRadius: 150,
          }}
        >
          {fileLoading && <IconifyIcon icon="line-md:loading-twotone-loop" fontSize={72} />}
        </Avatar>
        <Stack direction={'column'} gap={1}>
          <Typography variant="h5">
            {candidateDetail?.candidate?.title?.titleNameTh} {candidateDetail?.candidate?.nameTh}{' '}
            {candidateDetail?.candidate?.surnameTh} ({candidateDetail?.candidate?.nickname})
          </Typography>
          <Typography variant="subtitle2">
            Candidate Id : {candidateDetail?.candidate.candidateId}
          </Typography>
        </Stack>
      </Stack>
      <Box mt={2}>
        {accordionData.map((item, index) => (
          <AccordionCustom
            icon={item.icon}
            title={item.title}
            panelId={index}
            defaultExpanded={item.defaultExpanded}
          >
            {item.children ? item.children : <Typography>-</Typography>}
          </AccordionCustom>
        ))}
      </Box>
    </Container>
  );
};
