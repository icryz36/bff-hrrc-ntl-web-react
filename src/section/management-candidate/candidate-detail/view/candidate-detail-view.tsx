import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const CandidateDetailView = () => {
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
        <Accordion>
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            <Stack gap={1}>
              <IconifyIcon icon={'mdi:account-outline'} fontSize="24px" color="primary" />
              <Typography variant="h6">Applied Job</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default CandidateDetailView;
