import { useParams } from 'react-router';
import { Avatar, Box, Container, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useCandidateQuery } from 'services/candidate/query';
import { TCandidateData } from 'types/candidate';
import AccordionCustom from 'components/common/AccordionCustom';
import AppliedJobTable from '../components/applied-job-table';
import FileDownloadBox from '../components/file-download-box';
import InformationBox from '../components/information-box';

const CandidateDetailView = () => {
  const { id = '' } = useParams();

  const { data: candidateDetail } = useQuery({
    ...useCandidateQuery.detail({ candidateId: id }),
    enabled: !!id,
  });

  console.log('candidateDetail > ', candidateDetail);

  const { jobApplications, candidate, ducuments } = candidateDetail || ({} as TCandidateData);

  const accordionData = [
    {
      icon: 'mdi:account-outline',
      title: 'Applied Job',
      children: <AppliedJobTable tableData={jobApplications ?? []} />,
    },
    {
      icon: 'mdi:account-outline',
      title: 'Basic information',
      children: (
        <InformationBox
          background
          rows={[
            { label: 'Gender', value: candidate?.gender },
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
              value: candidate?.hasmotorcycleLicense,
              fullWidth: true,
            },
            { label: 'Car Driving', value: candidate?.hascarLicense, fullWidth: true },
          ]}
        />
      ),
    },
    {
      icon: 'mdi:note-text-outline',
      title: 'Application Documents',
      children: <FileDownloadBox data={ducuments} />,
    },
    {
      icon: 'mdi:note-text-outline',
      title: 'Link Reference',
      children: <Typography variant="subtitle2_regular">{candidate?.linkReference}</Typography>,
    },
    {
      icon: 'mdi:note-text-outline',
      title: 'Note (Optional)',
      children: '',
    },
    {
      icon: 'mdi:account-outline',
      title: 'Personal Data',
      children: '',
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
    <Container maxWidth="md">
      <Stack gap={2} alignItems={'center'} py={1}>
        <Avatar
          src=""
          sx={{
            height: 72,
            width: 72,
            borderRadius: 150,
          }}
        />
        <Stack direction={'column'} gap={1}>
          <Typography variant="h5">
            {candidateDetail?.candidate?.title?.titleNameEn} {candidateDetail?.candidate?.nameEn}{' '}
            {candidateDetail?.candidate?.surnameEn} ({candidateDetail?.candidate?.nickname})
          </Typography>
          <Typography variant="subtitle2">
            Candidate Id : {candidateDetail?.candidate?.idNo}{' '}
          </Typography>
        </Stack>
      </Stack>
      <Box mt={2}>
        {accordionData.map((item, index) => (
          <AccordionCustom icon={item.icon} title={item.title} panelId={index}>
            {item.children ? item.children : <Typography>-</Typography>}
          </AccordionCustom>
        ))}
      </Box>
    </Container>
  );
};

export default CandidateDetailView;
