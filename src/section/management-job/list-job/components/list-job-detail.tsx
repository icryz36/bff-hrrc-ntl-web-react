import { FC, useEffect, useState } from 'react';
import { Checkbox, Chip, FormControlLabel, Grid, Paper, Stack, Typography } from '@mui/material';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { useQuery } from '@tanstack/react-query';
import { useJobpostQuery } from 'services/jobpost/query';
import { useMasterDataQuery } from 'services/master-data/query';
import { fDate } from 'utils/format-time';
import IconifyIcon from 'components/base/IconifyIcon';
import { getStatusBadgeColor } from '../view/list-job-table-view';

interface IListJobDetailComponentProps {
  open: boolean;
  onClose: () => void;
  jobPostId: string | null;
}

const ListJobDetailComponent: FC<IListJobDetailComponentProps> = ({ open, onClose, jobPostId }) => {
  // api ---------------------------------------------------------------
  const [isBigEvent, setIsBigEvent] = useState(false);

  const query = useJobpostQuery.detail({
    jobPostId: jobPostId ?? '',
  });

  const { data } = useQuery({ ...query, enabled: !!jobPostId });

  const { data: usersList = [] } = useQuery(useMasterDataQuery.users());

  const jobData = data?.data;
  // value ---------------------------------------------------------------

  const recruiterNames = usersList
    ?.filter((user) => jobData?.recruiterUserId?.includes(user?.userId))
    ?.map((user) => `${user?.name} ${user?.surname}`)
    ?.join(', ');

  useEffect(() => {
    if (jobData?.isBigEvent !== undefined) {
      console.log('jobData.isBigEvent', jobData.isBigEvent);
      setIsBigEvent(jobData.isBigEvent);
    }
  }, [jobData]);

  // ---------------------------------------------------------------------

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
      <Typography
        variant="subtitle2_bold"
        color="text.primary"
        sx={{ whiteSpace: 'pre-line', minWidth: '65px' }}
      >
        {label} :
      </Typography>
      <Typography
        variant="subtitle2_regular"
        color="text.secondary"
        sx={{ whiteSpace: 'pre-line' }}
      >
        {value ? value : '-'}
      </Typography>
    </Stack>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <Typography variant="subtitle1_bold">{title}</Typography>
  );

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          height: '100vh',
        },
      }}
    >
      <IconifyIcon
        icon="material-symbols-light:close-rounded"
        fontSize="25px"
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
          cursor: 'pointer',
        }}
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
          <Typography variant="subtitle1_bold" color="text.primary">
            Job Detail
          </Typography>

          <FormControlLabel
            control={<Checkbox name="checked" checked={isBigEvent} color="default" disabled />}
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
              <InfoRow label="Job Post ID" value={jobData?.jobPostNo} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <InfoRow
                label="Job Status"
                value={
                  <Chip
                    label={jobData?.statusName}
                    color={getStatusBadgeColor(jobData?.statusName || '')}
                    variant="soft"
                  />
                }
              />
            </Grid>
          </Grid>
        </Stack>
        <Paper elevation={0} background={1} variant="elevation">
          <Stack px={3} py={2} spacing={2} direction="column">
            <SectionTitle title="Position" />
            {jobData?.jobPostPositions?.length ? (
              jobData.jobPostPositions.map((item) => (
                <Grid container spacing={2} key={item?.positionId}>
                  <Grid size={{ md: 4 }}>
                    <InfoRow label={`Position No.\nFrom HRMS`} value={item?.positionName} gap={4} />
                  </Grid>
                  <Grid size={{ md: 4 }}>
                    <InfoRow label={`Rationale of\nVacancy`} value={item?.vacancy} gap={4} />
                  </Grid>
                  <Grid size={{ md: 4 }}>
                    <InfoRow
                      label={`Source of\nRecruitment`}
                      value={item?.srcOfRecruitment}
                      gap={4}
                    />
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid container spacing={2}>
                <Grid size={{ md: 4 }}>
                  <InfoRow label={`Position No.\nFrom HRMS`} value="-" gap={4} />
                </Grid>
                <Grid size={{ md: 4 }}>
                  <InfoRow label={`Rationale of\nVacancy`} value="-" gap={4} />
                </Grid>
                <Grid size={{ md: 4 }}>
                  <InfoRow label={`Source of\nRecruitment`} value="-" gap={4} />
                </Grid>
              </Grid>
            )}
          </Stack>
        </Paper>
        <Paper elevation={0} background={1} variant="elevation">
          <Stack px={3} py={2} spacing={2} direction="column">
            <SectionTitle title="Work Location" />
            {jobData?.workLocations?.length ? (
              jobData.workLocations.map((item, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid size={{ md: 6 }}>
                    <InfoRow label="Province" value={item?.provinceName} />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Stack direction="row" gap={1}>
                      <Typography
                        variant="subtitle2_bold"
                        color="text.primary"
                        sx={{ whiteSpace: 'pre-line' }}
                      >
                        District :{' '}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ whiteSpace: 'pre-line' }}
                      >
                        {item.district.map((d) => d.districtName).join('\n')}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Typography variant="subtitle2_bold" color="text.primary">
                -
              </Typography>
            )}
          </Stack>
        </Paper>
        <Paper elevation={0} background={1} variant="elevation">
          <Stack px={3} py={2} spacing={2} direction="column">
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
        </Paper>
        <Paper elevation={0} background={1} variant="elevation">
          <Stack px={3} py={2} spacing={2} direction="column">
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
        </Paper>
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
              <InfoRow label="Owner" value={jobData?.ownerName} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <InfoRow label="Group Recruiter" value={recruiterNames} />
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
            dangerouslySetInnerHTML={{ __html: jobData?.jobDescription || '-' }}
          />
        </Stack>

        <Stack pt={2} spacing={2} direction="column">
          <SectionTitle title="Job Specification" />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            px={4}
            component="div"
            dangerouslySetInnerHTML={{ __html: jobData?.jobSpecification || '-' }}
          />
        </Stack>
        <Stack pt={2} pb={6} spacing={2} direction="column">
          <SectionTitle title="Benefit" />

          <Typography
            variant="subtitle2"
            color="text.secondary"
            px={4}
            component="div"
            dangerouslySetInnerHTML={{ __html: jobData?.jobBenefit || '-' }}
          />
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default ListJobDetailComponent;
