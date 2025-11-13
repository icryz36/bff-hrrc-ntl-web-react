import { FC } from 'react';
import { Checkbox, Chip, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { useQuery } from '@tanstack/react-query';
import { useJobpostQuery } from 'services/jobpost/query';
import { fDate } from 'utils/format-time';
import IconifyIcon from 'components/base/IconifyIcon';

interface IListJobDetailComponentProps {
  open: boolean;
  onClose: () => void;
  jobPostId: string | null;
}

const ListJobDetailComponent: FC<IListJobDetailComponentProps> = ({ open, onClose, jobPostId }) => {
  const query = useJobpostQuery.detail({
    jobPostId: jobPostId ?? '',
  });

  const { data: jobData } = useQuery(query);

  const InfoRow = ({
    label,
    value,
    gap = 1,
  }: {
    label: string;
    value: React.ReactNode;
    gap?: number;
  }) => (
    <Stack direction="row" gap={gap}>
      <Typography variant="subtitle2" color="text.primary" sx={{ whiteSpace: 'pre-line' }}>
        {label} :{' '}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
        {value}
      </Typography>
    </Stack>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <Typography variant="subtitle1">{title}</Typography>
  );

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: '100vh',
        },
      }}
    >
      <IconifyIcon
        icon="material-symbols-light:close-rounded"
        fontSize="32px"
        color="text.secondary"
        sx={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer' }}
        onClick={onClose}
      />
      <Stack
        sx={{
          height: '100%',
          width: '820px',
          margin: 'auto',
          py: 6,
          position: 'relative',
        }}
        spacing={3}
        direction="column"
      >
        <Typography variant="h5" color="text.primary">
          Job Post Detail : {jobData?.jobPostNo}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" color="text.primary">
            Job Detail
          </Typography>

          <FormControlLabel
            control={<Checkbox name="checked" color="primary" size="small" />}
            label={
              <Typography variant="subtitle2" color="text.secondary">
                Big Event
              </Typography>
            }
          />
        </Stack>

        <Stack spacing={2} direction="column" px={3} py={0}>
          <InfoRow label="Job Title" value={jobData?.jobTitle} />
          <Grid container spacing={2}>
            <Grid size={{ md: 6 }}>
              <InfoRow label="Group Location" value={jobData?.groupLocation} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <InfoRow label="NTL Regional" value={jobData?.regionName} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <InfoRow label="Headcount" value={jobData?.headCount} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <InfoRow label="PR Number" value={jobData?.prNo} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <InfoRow label="Job Post ID" value={jobData?.jobPostId} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <InfoRow
                label="Job Status"
                value={<Chip label={jobData?.statusName} color="success" variant="soft" />}
              />
            </Grid>
          </Grid>
        </Stack>

        <Stack px={3} py={2} bgcolor={'#F7FAFC'} spacing={2} direction="column">
          <SectionTitle title="Position" />
          {jobData?.jobPostPositions?.map((item) => (
            <Grid container spacing={2} key={item?.positionId}>
              <Grid size={{ md: 4 }}>
                <InfoRow label={`Position No.\nFrom HRMS`} value={item?.positionName} gap={4} />
              </Grid>
              <Grid size={{ md: 4 }}>
                <InfoRow label={`Rationale of\nVacancy`} value={item?.vacancy} gap={4} />
              </Grid>
              <Grid size={{ md: 4 }}>
                <InfoRow label={`Source of\nRecruitment`} value={item?.srcOfRecruitment} gap={4} />
              </Grid>
            </Grid>
          ))}
        </Stack>

        <Stack px={3} py={2} bgcolor={'#F7FAFC'} spacing={2} direction="column">
          <SectionTitle title="Work Location" />
          {jobData?.workLocations?.map((item, index) => (
            <Grid container spacing={2} key={index}>
              <Grid size={{ md: 6 }}>
                <InfoRow label="Province" value={item?.provinceName} />
              </Grid>
              <Grid size={{ md: 6 }}>
                <InfoRow label="District" value={item?.districtName} />
              </Grid>
            </Grid>
          ))}
        </Stack>

        <Stack px={3} py={2} bgcolor={'#F7FAFC'} spacing={2} direction="column">
          <SectionTitle title="Department" />
          <Grid container spacing={2}>
            <Grid size={{ md: 6 }}>
              <InfoRow label="Department" value={jobData?.departmentName} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <InfoRow label="Section" value={jobData?.sectionName} />
            </Grid>
          </Grid>
        </Stack>

        <Stack px={3} py={2} bgcolor={'#F7FAFC'} spacing={2} direction="column">
          <SectionTitle title="Type of Employee" />
          <Grid container spacing={2}>
            <Grid size={{ md: 4 }}>
              <InfoRow label="Job Level" value={jobData?.levelName} />
            </Grid>
            <Grid size={{ md: 4 }}>
              <InfoRow label="Degree" value={jobData?.degreeName} />
            </Grid>
            <Grid size={{ md: 4 }}>
              <InfoRow label="Employee Type" value={jobData?.employeeTypeName} />
            </Grid>
          </Grid>
        </Stack>

        <Stack px={3} py={2} spacing={2} direction="column">
          <Grid container spacing={2}>
            <Grid size={{ md: 4 }}>
              <InfoRow label="Start Date" value={fDate(jobData?.startDate)} />
            </Grid>
            <Grid size={{ md: 4 }}>
              <InfoRow label="End Date" value={fDate(jobData?.endDate)} />
            </Grid>
            <Grid size={{ md: 4 }}>
              <InfoRow label="Acknowledge Date" value={fDate(jobData?.acknowledgeDate)} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <InfoRow label="Owner" value="-" />
            </Grid>
            <Grid size={{ md: 6 }}>
              <InfoRow label="Group Recruiter" value="-" />
            </Grid>
          </Grid>
        </Stack>

        <Stack pt={2} spacing={2} direction="column">
          <SectionTitle title="Job Description" />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            px={4}
            component="div"
            dangerouslySetInnerHTML={{ __html: jobData?.jobDescription || '' }}
          />
        </Stack>

        <Stack pt={2} spacing={2} direction="column">
          <SectionTitle title="Job Specification" />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            px={4}
            component="div"
            dangerouslySetInnerHTML={{ __html: jobData?.jobSpecification || '' }}
          />
        </Stack>
        <Stack pt={2} pb={6} spacing={2} direction="column">
          <SectionTitle title="Benefit" />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            px={4}
            component="div"
            dangerouslySetInnerHTML={{ __html: jobData?.jobBenefit || '' }}
          />
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default ListJobDetailComponent;
