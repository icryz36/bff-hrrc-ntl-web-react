import { useForm, useWatch } from 'react-hook-form';
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
import { useQuery } from '@tanstack/react-query';
import { GROUP_LOCATION } from 'constant/enum';
import dayjs from 'dayjs';
import { useMasterDataQuery } from 'services/master-data/query';
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
  isLoading?: boolean;
  onSubmit: (data: CreateJobSchemaType) => void;
};

// ----------------------------------------------------------------------

const defaultValues: CreateJobSchemaType = {
  // Job Detail
  jobPostId: '',
  statusId: '',
  jobTitle: '',
  groupLocation: null,
  regionId: null,
  headCount: '',
  prNo: '',

  // Position
  position: [],

  // Work Location
  province: null,
  districtId: [],

  // Department
  departmentId: null,
  sectionId: null,

  // Type of Employee
  levelId: null,
  degreeId: null,
  employeeTypeId: null,

  // Date
  startDate: '',
  endDate: '',
  acknowledgeDate: '',

  ownerUserId: '',
  recruiterUserId: [],
  jobDescription: '',
  jobSpecification: '',
  jobBenefit: '',
};

// ----------------------------------------------------------------------

export const CreateJobForm = ({ onSubmit, isEdit, isLoading }: CreateJobFormProps) => {
  const theme = useTheme();

  // form -----------------------------------------------------------------

  const methods = useForm<CreateJobSchemaType>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues,
  });

  const { handleSubmit, control } = methods;

  const selectedProvince = useWatch<CreateJobSchemaType>({
    control,
    name: 'province',
  });

  const selectedDepartmentId = useWatch<CreateJobSchemaType>({
    control,
    name: 'departmentId',
  });

  // const selectedHeadCount = useWatch<CreateJobSchemaType>({
  //   control,
  //   name: 'headCount',
  // });

  const selectedGroupLocation = useWatch<CreateJobSchemaType>({
    control,
    name: 'groupLocation',
  });

  const selectedStartDate = useWatch<CreateJobSchemaType>({
    control,
    name: 'startDate',
  });

  // const {
  //   fields: fieldsPosition,
  //   append: appendPosition,
  //   remove: removePosition,
  // } = useFieldArray({ control, name: 'position' });

  // const debouncedHeadCount = useDebounce(String(headCount), 2000);

  // api ----------------------------------------------------------------

  const { data: postStatusList = [] } = useQuery(useMasterDataQuery.postStatus());
  const { data: ntlRegionList = [] } = useQuery(useMasterDataQuery.ntlRegion());
  const { data: provinceList = [] } = useQuery(useMasterDataQuery.province());
  const { data: departmentList = [] } = useQuery(useMasterDataQuery.department());
  const { data: jobLevelList = [] } = useQuery(useMasterDataQuery.jobLevel());
  const { data: degreeList = [] } = useQuery(useMasterDataQuery.degree());
  const { data: employeeTypeList = [] } = useQuery(useMasterDataQuery.employeeType());

  const { data: districtList = [] } = useQuery({
    ...useMasterDataQuery.district({ provinceId: selectedProvince?.provinceId }),
    enabled: !!selectedProvince,
  });

  const { data: sectionList = [] } = useQuery({
    ...useMasterDataQuery.section({ departmentId: selectedDepartmentId?.departmentId }),
    enabled: !!selectedDepartmentId,
  });

  // ขาดเส้น recruiterUserId , retaion of vacany, source of recruitment

  // ----------------------------------------------------------------------

  return (
    <Container maxWidth="md">
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack mb={3}>
          <Typography variant="subtitle2_bold">Job Detail</Typography>
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
              {postStatusList.map((option) => (
                <MenuItem key={option.statusId} value={option.statusId}>
                  {option.statusNameEn}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>

          <Grid size={12}>
            <Field.Text name="jobTitle" label="Job Title *" />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Autocomplete
              fullWidth
              name="groupLocation"
              label="Group Location *"
              getOptionLabel={(option) => option.label}
              options={GROUP_LOCATION.map((option) => option)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Autocomplete
              fullWidth
              name="regionId"
              label="NTL Regional"
              getOptionLabel={(option) => option.regionNameEn}
              options={ntlRegionList.map((option) => option)}
              isOptionEqualToValue={(option, value) => option.regionId === value.regionId}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Text name="headCount" label="Headcount *" />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Text name="prNo" label="PR Number" />
          </Grid>

          {/* Position */}

          {!!selectedGroupLocation && (
            <Grid size={12}>
              <StyledFormContainerBox>
                <Typography variant="subtitle1_bold">Position</Typography>

                <Grid container spacing={2} mt={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text name="" label="Position No. From HRMS" maxLength={20} />
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
          )}

          {/* Work Location */}

          <Grid size={12}>
            <StyledFormContainerBox>
              <Typography variant="subtitle1_bold">Work Location</Typography>

              <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="province"
                    label="Province *"
                    getOptionLabel={(option) => option.provinceNameEn}
                    options={provinceList.map((option) => option)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Autocomplete
                    multiple
                    fullWidth
                    name="districtId"
                    label="District *"
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.districtNameEn}
                    options={districtList.map((option) => option)}
                    slotProps={{ chip: { variant: 'outlined' } }}
                  />
                </Grid>
              </Grid>
            </StyledFormContainerBox>
          </Grid>

          {/* Department */}

          <Grid size={12}>
            <StyledFormContainerBox>
              <Typography variant="subtitle1_bold">Department</Typography>

              <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="departmentId"
                    label="Department *"
                    getOptionLabel={(option) => option.departmentNameEn}
                    options={departmentList.map((option) => option)}
                    isOptionEqualToValue={(option, value) =>
                      option.departmentId === value.departmentId
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="sectionId"
                    label="Section *"
                    getOptionLabel={(option) => option.sectionNameEn}
                    options={sectionList.map((option) => option)}
                    isOptionEqualToValue={(option, value) => option.sectionId === value.sectionId}
                  />
                </Grid>
              </Grid>
            </StyledFormContainerBox>
          </Grid>

          {/* Type of Employee */}

          <Grid size={12}>
            <StyledFormContainerBox>
              <Typography variant="subtitle1_bold">Type of Employee</Typography>

              <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="levelId"
                    label="Job Level *"
                    getOptionLabel={(option) => option.levelNameEn}
                    options={jobLevelList.map((option) => option)}
                    isOptionEqualToValue={(option, value) => option.levelId === value.levelId}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="degreeId"
                    label="Degree *"
                    options={degreeList.map((option) => option)}
                    getOptionLabel={(option) => option.degreeNameEn}
                    isOptionEqualToValue={(option, value) => option.degreeId === value.degreeId}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="employeeTypeId"
                    label="Employee Type *"
                    options={employeeTypeList.map((option) => option)}
                    getOptionLabel={(option) => option.employeeTypeEN}
                    isOptionEqualToValue={(option, value) =>
                      option.employeeTypeId === value.employeeTypeId
                    }
                  />
                </Grid>
              </Grid>
            </StyledFormContainerBox>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Field.DatePicker name="startDate" label="Start Date *" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Field.DatePicker
              name="endDate"
              label="End Date *"
              minDate={dayjs(selectedStartDate)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Field.DatePicker name="acknowledgeDate" label="Acknowledge Date *" />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Text name="ownerUserId" label="Owner" disabled />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Autocomplete
              multiple
              fullWidth
              name="recruiterUserId"
              label="Group Recruiter"
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              options={MOCK_OPTION.map((option) => option)}
              slotProps={{ chip: { variant: 'outlined' } }}
            />
          </Grid>

          <Grid size={12} mt={3}>
            <Stack direction="column" spacing={2.6}>
              <Typography variant="subtitle1_bold">Job Description</Typography>

              <Field.Editor name="jobDescription" />
            </Stack>
          </Grid>

          <Grid size={12} mt={3}>
            <Stack direction="column" spacing={2.6}>
              <Typography variant="subtitle1_bold">Job Specification</Typography>

              <Field.Editor name="jobSpecification" />
            </Stack>
          </Grid>

          <Grid size={12} mt={3}>
            <Stack direction="column" spacing={2.6}>
              <Typography variant="subtitle1_bold">Benefit</Typography>

              <Field.Editor name="jobBenefit" />
            </Stack>
          </Grid>
        </Grid>

        <Stack justifyContent="flex-end" mt={4.6} spacing={1.3}>
          {isEdit && (
            <Button variant="outlined" color="neutral">
              Cancel
            </Button>
          )}
          <Button variant="contained" type="submit" loading={isLoading}>
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
