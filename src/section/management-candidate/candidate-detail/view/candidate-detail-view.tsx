import { Avatar, Box, Container, Stack, Typography } from '@mui/material';
import AccordionCustom from 'components/common/AccordionCustom';
import AppliedJobTable from '../components/applied-job-table';
import InformationBox from '../components/information-box';
import NoteBox from '../components/note-box';

const CandidateDetailView = () => {
  const accordionData = [
    {
      icon: 'mdi:account-outline',
      title: 'Applied Job',
      children: <AppliedJobTable />,
    },
    {
      icon: 'mdi:account-outline',
      title: 'Basic information',
      children: (
        <InformationBox
          rows={[
            { label: 'Gender', value: 'Male' },
            { label: 'Age', value: '28' },
            { label: 'Contact No.', value: '089-765-4321' },
            { label: 'Email', value: 'viru@example.com' },
            { label: 'Desired Location', value: 'Head Office' },
            { label: 'Desired Province', value: 'Bangkok' },
            { label: 'Highest Education', value: 'Master', fullWidth: true },
            {
              label: 'Work Experience',
              value: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
              fullWidth: true,
            },
            { label: 'Motorcycle Driving', value: 'ไม่ได้', fullWidth: true },
            { label: 'Car Driving', value: 'ได้ มีใบขับขี่', fullWidth: true },
          ]}
        />
      ),
    },
    {
      icon: 'mdi:note-text-outline',
      title: 'Application Documents',
      children: '',
    },
    {
      icon: 'mdi:note-text-outline',
      title: 'Link Reference',
      children: (
        <Typography variant="subtitle2_regular" color="secondary">
          www.canva.com/Presentation
        </Typography>
      ),
    },
    {
      icon: 'mdi:note-text-outline',
      title: 'Note (Optional)',
      children: <NoteBox />,
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
          <Typography variant="h5">Mr. Viru Sahastrabudhhe (Ake)</Typography>
          <Typography variant="subtitle2">Candidate Id : 000001 </Typography>
        </Stack>
      </Stack>
      <Box mt={2}>
        {accordionData.map((item, index) => (
          <AccordionCustom icon={item.icon} title={item.title} panelId={index}>
            {item.children ? item.children : <div>6666</div>}
          </AccordionCustom>
        ))}
      </Box>
    </Container>
  );
};

export default CandidateDetailView;
