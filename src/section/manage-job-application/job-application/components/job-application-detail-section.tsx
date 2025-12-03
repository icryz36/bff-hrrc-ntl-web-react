import { useParams } from 'react-router';
import { Grid, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useJobpostQuery } from 'services/jobpost/query';

// ----------------------------------------------------------------------

type JobDataItemProps = {
  label?: string;
  value?: string | number;
};

const JobApplicationDetailSection = () => {
  const { id = '' } = useParams();

  const { data } = useQuery(useJobpostQuery.detail({ jobPostId: id }));

  const jobData = data?.data;

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <JobDataItem label="Job Post ID" value={jobData?.jobPostNo} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <JobDataItem label="Job Title" value={jobData?.jobTitle} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <JobDataItem label="Group Location" value={jobData?.groupLocation} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <JobDataItem label="NTL Regional" value={jobData?.regionName} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <JobDataItem label="Headcount" value={jobData?.headCount} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <JobDataItem label="PR Number" value={jobData?.prNo} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <JobDataItem label="Department" value={jobData?.departmentName} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <JobDataItem label="Section" value={jobData?.sectionName} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <JobDataItem label="Job Level" value={jobData?.levelName} />
        </Grid>
      </Grid>
    </>
  );
};

export default JobApplicationDetailSection;

// ----------------------------------------------------------------------

const JobDataItem = ({ label, value }: JobDataItemProps) => {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2_bold" sx={{ whiteSpace: 'pre-line' }}>
        {label} :
      </Typography>
      <Typography
        color="text.secondary"
        variant="subtitle2_regular"
        sx={{ whiteSpace: 'pre-line' }}
      >
        {value || '-'}
      </Typography>
    </Stack>
  );
};
