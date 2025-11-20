import { Avatar, Box, Container, Stack, Typography } from '@mui/material';
import AccordionCustom from 'components/common/AccordionCustom';

const CandidateDetailView = () => {
  const accordionData = [
    {
      icon: 'mdi:account-outline',
      title: 'Applied Job',
      children: '',
    },
    {
      icon: 'mdi:account-outline',
      title: 'Basic information',
      children: '',
    },
    {
      icon: 'mdi:note-text-outline',
      title: 'Application Documents',
      children: '',
    },
    {
      icon: 'mdi:note-text-outline',
      title: 'Link Reference',
      children: '',
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
          <Typography variant="h5">Mr. Viru Sahastrabudhhe (Ake)</Typography>
          <Typography variant="subtitle2">Candidate Id : 000001 </Typography>
        </Stack>
      </Stack>
      <Box mt={2}>
        {accordionData.map((item, index) => (
          <AccordionCustom icon={item.icon} title={item.title} panelId={index}>
            <div>5555</div>
          </AccordionCustom>
        ))}
      </Box>
    </Container>
  );
};

export default CandidateDetailView;
