import { useForm } from 'react-hook-form';
// import { useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { GROUP_LOCATION } from 'constant/enum';
// import { useDebounce } from 'hooks/useDebounce';
import IconifyIcon from 'components/base/IconifyIcon';
import { DirtyFormLeaveGuardDialog } from 'components/dirty-leave-guard-dialog/DirtyLeaveGuard';
import { Form } from 'components/hook-form';
import { Field } from 'components/hook-form/fields';
import { CreateJobSchema, CreateJobSchemaType } from '../schema';
import { StyledFormContainerBox } from '../styles';

// ----------------------------------------------------------------------

type CreateJobFormProps = {
  isEdit?: boolean;
  onSubmit: (data: CreateJobSchemaType) => void;
};

export const CreateJobForm = ({ onSubmit, isEdit }: CreateJobFormProps) => {
  const theme = useTheme();

  // Form ---------------------------------------------------------------

  const defaultValues: CreateJobSchemaType = {
    // Job Detail
    jobPostId: '',
    statusId: '',
    jobTitle: '',
    groupLocation: '',
    regionId: '',
    headCount: '',
    prNo: '',

    // Position
    position: [],

    // Work Location
    province: '',
    districtId: [],

    // Department
    department: '',
    sectionId: '',

    // Type of Employee
    levelId: '',
    degreeId: '',
    employeeTypeId: '',

    // Date
    startDate: '',
    endDate: '',
    acknowledgeDate: '',

    owner: '',
    recruiterUserId: [],
    jobDescription: '',
    jobSpecification: '',
    jobBenefit: '',
  };

  const methods = useForm({
    resolver: zodResolver(CreateJobSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  // const {
  //   fields: fieldsPosition,
  //   append: appendPosition,
  //   remove: removePosition,
  // } = useFieldArray({ control, name: 'position' });

  // const debouncedHeadCount = useDebounce(String(headCount), 2000);

  // console.log('debouncedHeadCount', debouncedHeadCount);

  // ----------------------------------------------------------------------

  return (
    <Container maxWidth="md">
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack mb={3}>
          <Typography variant="subtitle2" fontWeight={700}>
            Job Detail
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Text
              disabled
              name="jobPostId"
              label="Job post ID"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        arrow
                        title={
                          <Typography variant="caption" whiteSpace="pre-wrap">
                            {'Job ID จะถูกสร้างโดยอัตโนมัติ\nหลังจาก Create Job Post สำเร็จ'}
                          </Typography>
                        }
                        slotProps={{
                          arrow: { sx: { color: theme.palette.grey[100] } },
                          tooltip: {
                            sx: {
                              backgroundColor: theme.palette.grey[100],
                              color: 'text.primary',
                            },
                          },
                        }}
                      >
                        <IconifyIcon icon="lucide:info" />
                      </Tooltip>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Select name="statusId" label="Job Status *">
              {MOCK_OPTION.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>

          <Grid size={12}>
            <Field.Text name="jobTitle" label="Job Title *" />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Select name="groupLocation" label="Group Location *">
              {GROUP_LOCATION.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Select name="regionId" label="NTL Regional">
              {MOCK_OPTION.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Text name="headCount" label="Headcount *" />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Text name="prNo" label="PR Number" />
          </Grid>

          {/* Position */}

          <Grid size={12}>
            <StyledFormContainerBox>
              <Typography variant="subtitle1" fontWeight={700}>
                Position
              </Typography>

              <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Select name="" label="Position No. From HRMS">
                    {MOCK_OPTION.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Select name="" label="Rationale of Vacancy *">
                    {MOCK_OPTION.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Select name="" label="Source of Recruitment *">
                    {MOCK_OPTION.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
              </Grid>
            </StyledFormContainerBox>
          </Grid>

          {/* Work Location */}

          <Grid size={12}>
            <StyledFormContainerBox>
              <Typography variant="subtitle1" fontWeight={700}>
                Work Location
              </Typography>

              <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Select name="" label="Province *">
                    {MOCK_OPTION.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Autocomplete
                    multiple
                    fullWidth
                    name="districtId"
                    label="District *"
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.label}
                    options={MOCK_OPTION.map((option) => option)}
                    slotProps={{ chip: { variant: 'outlined' } }}
                  />
                </Grid>
              </Grid>
            </StyledFormContainerBox>
          </Grid>

          {/* Department */}

          <Grid size={12}>
            <StyledFormContainerBox>
              <Typography variant="subtitle1" fontWeight={700}>
                Department
              </Typography>

              <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Select name="" label="Department *">
                    {MOCK_OPTION.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Select name="" label="Section *">
                    {MOCK_OPTION.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
              </Grid>
            </StyledFormContainerBox>
          </Grid>

          {/* Type of Employee */}

          <Grid size={12}>
            <StyledFormContainerBox>
              <Typography variant="subtitle1" fontWeight={700}>
                Type of Employee
              </Typography>

              <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Select name="" label="Job Level *">
                    {MOCK_OPTION.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Select name="" label="Degree *">
                    {MOCK_OPTION.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Select name="" label="Employee Type *">
                    {MOCK_OPTION.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
              </Grid>
            </StyledFormContainerBox>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Field.DatePicker name="" label="Start Date *" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Field.DatePicker name="" label="End Date *" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Field.DatePicker name="" label="Acknowledge Date *" />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Text name="" label="Owner" disabled />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Autocomplete
              multiple
              fullWidth
              name=""
              label="Group Recruiter"
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              options={MOCK_OPTION.map((option) => option)}
              slotProps={{ chip: { variant: 'outlined' } }}
            />
          </Grid>

          <Grid size={12} mt={3}>
            <Stack direction="column" spacing={2.6}>
              <Typography variant="subtitle1" fontWeight={700}>
                Job Description
              </Typography>

              <Field.Editor name="" />
            </Stack>
          </Grid>

          <Grid size={12} mt={3}>
            <Stack direction="column" spacing={2.6}>
              <Typography variant="subtitle1" fontWeight={700}>
                Job Specification
              </Typography>

              <Field.Editor name="" />
            </Stack>
          </Grid>

          <Grid size={12} mt={3}>
            <Stack direction="column" spacing={2.6}>
              <Typography variant="subtitle1" fontWeight={700}>
                Benefit
              </Typography>

              <Field.Editor name="" />
            </Stack>
          </Grid>
        </Grid>

        <Stack justifyContent="flex-end" mt={4.6} spacing={1.3}>
          {isEdit && (
            <Button variant="outlined" color="neutral">
              Cancel
            </Button>
          )}
          <Button variant="contained" type="submit">
            Post
          </Button>
        </Stack>

        <DirtyFormLeaveGuardDialog />
      </Form>
    </Container>
  );
};

const MOCK_OPTION = [
  { label: 'Option 1', value: 'OPTION_1' },
  { label: 'Option 2', value: 'OPTION_2' },
  { label: 'Option 3', value: 'OPTION_3' },
  { label: 'Option 4', value: 'OPTION_4' },
];
