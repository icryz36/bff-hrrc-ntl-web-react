import { SyntheticEvent, useCallback, useEffect, useMemo } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GROUP_LOCATION, OPTION_SOURCE_OF_RECRUITMENT, OPTION_VACANCY } from 'constant/enum';
import dayjs from 'dayjs';
import { useDebounce } from 'hooks/useDebounce';
import { useMasterDataQuery } from 'services/master-data/query';
import { TDepartment, TDistrict } from 'types/master-data';
import IconifyIcon from 'components/base/IconifyIcon';
import { Form } from 'components/hook-form';
import { Field } from 'components/hook-form/fields';
import { handleHeadcountKeyPress, handleHeadcountPaste } from '../helper';
import { CreateJobSchema, CreateJobSchemaType } from '../schema';
import { StyledFormContainerBox } from '../styles';

type CreateJobFormProps = {
  isDuplicate?: boolean;
  isEdit?: boolean;
  isLoading?: boolean;
  defaultValuesForm?: CreateJobSchemaType;
  onSubmit: (data: CreateJobSchemaType) => void;
};

const defaultValues: CreateJobSchemaType = {
  jobPostId: '',
  statusId: '',
  jobTitle: '',
  groupLocation: null,
  regionId: null,
  headCount: '',
  prNo: '',
  position: [],
  province: null,
  districtId: [],
  departmentId: null,
  sectionId: null,
  levelId: null,
  degreeId: null,
  employeeTypeId: null,
  startDate: '',
  endDate: '',
  acknowledgeDate: '',
  ownerUserId: '',
  recruiterUserId: [],
  jobDescription: '',
  jobSpecification: '',
  jobBenefit: '',
  isBigEvent: false,
};

export const CreateJobForm = ({
  onSubmit,
  isDuplicate,
  isEdit,
  isLoading,
  defaultValuesForm,
}: CreateJobFormProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const methods = useForm<CreateJobSchemaType>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues,
  });

  const { handleSubmit, control, setValue, reset, formState } = methods;
  const { isDirty } = formState;

  const selectedProvince = useWatch<CreateJobSchemaType>({ control, name: 'province' });
  const selectedDepartmentId = useWatch<CreateJobSchemaType>({ control, name: 'departmentId' });
  const selectedHeadCount = useWatch<CreateJobSchemaType>({ control, name: 'headCount' });
  const selectedGroupLocation = useWatch<CreateJobSchemaType>({ control, name: 'groupLocation' });
  const selectedStartDate = useWatch<CreateJobSchemaType>({ control, name: 'startDate' });
  const selectedEndDate = useWatch<CreateJobSchemaType>({ control, name: 'endDate' });
  const selectedBigEvent = useWatch<CreateJobSchemaType>({ control, name: 'isBigEvent' });
  const { fields: fieldsPosition, replace: replacePosition } = useFieldArray({
    control,
    name: 'position',
  });

  const { data: postStatusList = [] } = useQuery(useMasterDataQuery.postStatus());
  const { data: ntlRegionList = [] } = useQuery(useMasterDataQuery.ntlRegion());
  const { data: provinceList = [] } = useQuery(useMasterDataQuery.province());
  const { data: departmentList = [] } = useQuery(useMasterDataQuery.department());
  const { data: jobLevelList = [] } = useQuery(useMasterDataQuery.jobLevel());
  const { data: degreeList = [] } = useQuery(useMasterDataQuery.degree());
  const { data: employeeTypeList = [] } = useQuery(useMasterDataQuery.employeeType());
  const { data: positionList = [] } = useQuery(useMasterDataQuery.position());
  const { data: usersList = [] } = useQuery(useMasterDataQuery.users());

  const { data: districtList = [] } = useQuery({
    ...useMasterDataQuery.district({ provinceId: selectedProvince?.provinceId }),
    enabled: !!selectedProvince,
  });

  const { data: sectionList = [] } = useQuery({
    ...useMasterDataQuery.section({ departmentId: selectedDepartmentId?.departmentId }),
    enabled: !!selectedDepartmentId,
  });

  const filterPostStatusList = useMemo(
    () => postStatusList.filter((item) => item.statusId !== '10265555-dc7c-4c12-8e02-e6b5c751e9ae'),
    [postStatusList],
  );

  const isHO = selectedGroupLocation?.value === 'HO';
  const isBranch = selectedGroupLocation?.value === 'BRANCH';

  const handleProvinceChange = useCallback(
    (_: SyntheticEvent<Element, Event>, value: TDistrict) => {
      setValue('province', value, { shouldValidate: true, shouldDirty: true });
      setValue('districtId', [], { shouldDirty: true });
    },
    [setValue],
  );

  const handleDepartmentChange = useCallback(
    (_: SyntheticEvent<Element, Event>, value: TDepartment) => {
      setValue('departmentId', value, { shouldValidate: true, shouldDirty: true });
      setValue('sectionId', null, { shouldDirty: true });
    },
    [setValue],
  );

  const debouncedHeadCount = useDebounce(selectedHeadCount, 300);

  useEffect(() => {
    if (isEdit && !isDirty) return;
    let newHeadCount = Number(debouncedHeadCount) || 0;
    if (isHO && newHeadCount > 10) {
      newHeadCount = 10;
      if (selectedHeadCount !== '10') {
        setValue('headCount', '10', {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    } else if (isBranch && newHeadCount > 100) {
      newHeadCount = 100;
      if (selectedHeadCount !== '100') {
        setValue('headCount', '100', {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }

    // if (newHeadCount < 1) {
    //   if (fieldsPosition.length !== 0) {
    //     replacePosition([]);
    //   }
    //   return;
    // }

    const targetCount = isBranch ? 1 : newHeadCount;

    if (targetCount === fieldsPosition.length) return;

    if (targetCount > fieldsPosition.length) {
      const diff = targetCount - fieldsPosition.length;
      const newItems: CreateJobSchemaType['position'] = Array.from({ length: diff }, () => ({
        positionId: null,
        vacancy: null,
        srcOfRecruitment: null,
      }));

      replacePosition([...fieldsPosition, ...newItems]);
    } else {
      replacePosition(fieldsPosition.slice(0, targetCount));
    }
  }, [
    debouncedHeadCount,
    fieldsPosition,
    replacePosition,
    isEdit,
    isDirty,
    isHO,
    isBranch,
    selectedHeadCount,
    setValue,
  ]);

  useEffect(() => {
    if (isEdit) return;
    if (!selectedGroupLocation) return;
    const newHeadCount = String(debouncedHeadCount) || '1';
    setValue('headCount', newHeadCount, { shouldValidate: true });
    if (ntlRegionList.length === 0) {
      setValue('regionId', null, { shouldValidate: true });
    }

    if (selectedGroupLocation.value === 'HO') {
      setValue(
        'regionId',
        {
          regionId: '628205f6-5f15-4e07-ba98-cff214433237',
          regionNameTh: 'สำนักงานใหญ่',
          regionNameEn: 'Head Office',
        },
        { shouldValidate: true },
      );
    }
  }, [selectedGroupLocation, isEdit, setValue]);

  useEffect(() => {
    if (defaultValuesForm) {
      reset(defaultValuesForm);
    }
  }, [defaultValuesForm, reset]);

  return (
    <Container maxWidth="md">
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack mb={3} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2_bold">Job Detail</Typography>
          <Controller
            name="isBigEvent"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={!!field.value}
                    disabled={isEdit || isDuplicate}
                    color="primary"
                    size="small"
                  />
                }
                label={
                  <Typography variant="subtitle2" color="text.secondary">
                    Big Event
                  </Typography>
                }
              />
            )}
          />
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
            <Field.Select name="statusId" label="Job Status" required={true}>
              {filterPostStatusList.map((option) => (
                <MenuItem key={option.statusId} value={option.statusId}>
                  {option.statusNameTh}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>

          <Grid size={12}>
            <Field.Text name="jobTitle" maxLength={250} label="Job Title" required={true} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Autocomplete
              fullWidth
              name="groupLocation"
              label="Group Location"
              required={true}
              getOptionLabel={(option) => option.label}
              options={GROUP_LOCATION}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              disabled={isEdit && !isDuplicate}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Autocomplete
              fullWidth
              disabled={selectedGroupLocation?.value === 'HO' || (isEdit && !isDuplicate)}
              name="regionId"
              label="NTL Regional"
              getOptionLabel={(option) => option.regionNameTh}
              options={ntlRegionList}
              isOptionEqualToValue={(option, value) => option.regionId === value.regionId}
              required={selectedGroupLocation?.value === 'BRANCH' || !selectedGroupLocation?.value}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Text
              name="headCount"
              label="Headcount"
              required={true}
              disabled={isEdit && !isDuplicate}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                const numeric = Number(value);
                if (isHO && numeric > 10) {
                  value = '10';
                } else if (isBranch && numeric > 100) {
                  value = '100';
                }
                setValue('headCount', value, { shouldDirty: true, shouldValidate: true });
              }}
              slotProps={{
                input: {
                  inputProps: {
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    onKeyPress: handleHeadcountKeyPress,
                    onPaste: handleHeadcountPaste,
                    maxLength: isHO ? 2 : 3,
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Text
              name="prNo"
              label="PR Number"
              required={selectedGroupLocation?.value === 'BRANCH' && !selectedBigEvent}
              maxLength={20}
            />
          </Grid>

          {!!selectedGroupLocation && (
            <Grid size={12}>
              <StyledFormContainerBox>
                <Typography variant="subtitle1_bold">Position</Typography>

                <Grid container spacing={2} mt={2}>
                  {fieldsPosition.map((field, index) => (
                    <Grid key={field.id} container spacing={2} size={12}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Field.Autocomplete
                          fullWidth
                          name={`position.${index}.positionId`}
                          label="Position No. From HRMS"
                          getOptionLabel={(option) => option.positionCode}
                          options={positionList}
                          isOptionEqualToValue={(option, value) =>
                            option.positionId === value.positionId
                          }
                          disabled={isBranch}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Field.Autocomplete
                          fullWidth
                          name={`position.${index}.vacancy`}
                          label={`Rationale of Vacancy`}
                          getOptionLabel={(option) => option.label}
                          options={OPTION_VACANCY}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          disabled={isBranch}
                          required={!selectedBigEvent && isHO}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Field.Autocomplete
                          fullWidth
                          label={`Source of Recruitment`}
                          name={`position.${index}.srcOfRecruitment`}
                          getOptionLabel={(option) => option.label}
                          options={OPTION_SOURCE_OF_RECRUITMENT}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          disabled={isBranch}
                          required={!selectedBigEvent && isHO}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </StyledFormContainerBox>
            </Grid>
          )}

          <Grid size={12}>
            <StyledFormContainerBox>
              <Typography variant="subtitle1_bold">Work Location</Typography>

              <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="province"
                    label="Province"
                    required={!selectedBigEvent}
                    onChange={handleProvinceChange}
                    options={provinceList}
                    getOptionLabel={(option) => option.provinceNameTh}
                    isOptionEqualToValue={(option, value) => option.provinceId === value.provinceId}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Autocomplete
                    multiple
                    fullWidth
                    name="districtId"
                    label="District"
                    required={!selectedBigEvent}
                    disableCloseOnSelect
                    disabled={!selectedProvince}
                    options={districtList}
                    getOptionLabel={(option) => option.districtNameTh}
                    slotProps={{ chip: { variant: 'outlined' } }}
                    isOptionEqualToValue={(option, value) => option.districtId === value.districtId}
                  />
                </Grid>
              </Grid>
            </StyledFormContainerBox>
          </Grid>

          <Grid size={12}>
            <StyledFormContainerBox>
              <Typography variant="subtitle1_bold">Department</Typography>

              <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="departmentId"
                    label="Department"
                    required={!selectedBigEvent}
                    onChange={handleDepartmentChange}
                    options={departmentList}
                    getOptionLabel={(option) => option.departmentNameTh}
                    isOptionEqualToValue={(option, value) =>
                      option.departmentId === value.departmentId
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="sectionId"
                    label="Section"
                    required={isHO && !selectedBigEvent}
                    disabled={!selectedDepartmentId}
                    options={sectionList}
                    getOptionLabel={(option) => option.sectionNameTh}
                    isOptionEqualToValue={(option, value) => option.sectionId === value.sectionId}
                  />
                </Grid>
              </Grid>
            </StyledFormContainerBox>
          </Grid>

          <Grid size={12}>
            <StyledFormContainerBox>
              <Typography variant="subtitle1_bold">Type of Employee</Typography>

              <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="levelId"
                    label="Job Level"
                    required={!selectedBigEvent}
                    options={jobLevelList}
                    getOptionLabel={(option) => option.levelNameTh}
                    isOptionEqualToValue={(option, value) => option.levelId === value.levelId}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="degreeId"
                    label="Degree"
                    required={!selectedBigEvent}
                    options={degreeList}
                    getOptionLabel={(option) => option.degreeNameTh}
                    isOptionEqualToValue={(option, value) => option.degreeId === value.degreeId}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Field.Autocomplete
                    fullWidth
                    name="employeeTypeId"
                    label="Employee Type"
                    required={!selectedBigEvent}
                    options={employeeTypeList}
                    getOptionLabel={(option) => option.employeeTypeTH}
                    isOptionEqualToValue={(option, value) =>
                      option.employeeTypeId === value.employeeTypeId
                    }
                  />
                </Grid>
              </Grid>
            </StyledFormContainerBox>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Field.DatePicker
              name="startDate"
              label="Start Date"
              format="DD/MM/YYYY"
              required={true}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Field.DatePicker
              name="endDate"
              label="End Date"
              minDate={dayjs(selectedStartDate)}
              format="DD/MM/YYYY"
              required={true}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Field.DatePicker
              name="acknowledgeDate"
              label="Acknowledge Date"
              maxDate={dayjs(selectedEndDate)}
              format="DD/MM/YYYY"
              required={true}
            />
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
              options={usersList}
              slotProps={{ chip: { variant: 'outlined' } }}
              getOptionLabel={(option) => `${option?.name} ${option?.surname}`}
              isOptionEqualToValue={(option, value) => option.userId === value.userId}
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
            <Button variant="outlined" color="neutral" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          )}
          <LoadingButton variant="contained" type="submit" loading={isLoading}>
            Post
          </LoadingButton>
        </Stack>
      </Form>
    </Container>
  );
};
