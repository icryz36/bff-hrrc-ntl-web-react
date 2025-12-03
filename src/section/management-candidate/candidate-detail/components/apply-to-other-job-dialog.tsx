import { useForm, useWatch } from 'react-hook-form';
import { Box, Button, Dialog, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQuery } from '@tanstack/react-query';
import { GROUP_LOCATION } from 'constant/enum';
import { useBoolean } from 'hooks/useBoolean';
import { useJobpostQuery } from 'services/jobpost/query';
import { useMasterDataQuery } from 'services/master-data/query';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import { Form } from 'components/hook-form';
import { Field } from 'components/hook-form/fields';

interface ApplyToOtherJobDialogProps {
  open: boolean;
  onClose: () => void;
}

type ApplyToOtherJobFormValues = {
  groupLocation: string;
  province: string;
  department: string;
  jobTitle: string;
};

const defaultValues: ApplyToOtherJobFormValues = {
  groupLocation: '',
  province: '',
  department: '',
  jobTitle: '',
};

const ApplyToOtherJobDialog = ({ open, onClose }: ApplyToOtherJobDialogProps) => {
  const methods = useForm<ApplyToOtherJobFormValues>({
    defaultValues,
  });

  const { handleSubmit, reset, control, setValue } = methods;

  const isOpenSuccessDialog = useBoolean();
  const isOpenErrorDialog = useBoolean();
  const isOpenNetworkErrorDialog = useBoolean();

  const groupLocation = useWatch({ control, name: 'groupLocation' });
  const province = useWatch({ control, name: 'province' });
  const department = useWatch({ control, name: 'department' });
  const jobTitle = useWatch({ control, name: 'jobTitle' });

  // const { id = '' } = useParams<{ id: string }>();
  const id = 'e8f9a0b1-c2d3-4e5f-9a6b-7c8d9e0f1a2b';

  const { data: provinceList = [] } = useQuery(useMasterDataQuery.province());
  const { data: departmentList = [] } = useQuery(useMasterDataQuery.department());

  const { data: jobListData } = useQuery({
    ...useJobpostQuery.list({
      ownerUserId: id,
      recruiterUserId: id,
      pageNo: 1,
      pageSize: 1000,
      ...(province && { provinceId: province }),
      ...(department && { departments: [department] }),
    }),
    enabled: open && !!id,
  });

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = async (data: ApplyToOtherJobFormValues) => {
    console.log('submit form :', data);
    // try {
    //   console.log('submit form :', data);
    //   const mockSuccess = Math.random() > 0.3;

    //   if (mockSuccess) {
    //     handleClose();
    //     isOpenSuccessDialog.onTrue();
    //   } else {
    //     handleClose();
    //     isOpenErrorDialog.onTrue();
    //   }
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // } catch (error) {
    //   handleClose();
    //   isOpenNetworkErrorDialog.onTrue();
    // }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              p: 0,
              overflow: 'visible',
            },
          },
        }}
      >
        <Form key={open ? 'open' : 'closed'} methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box p={4} maxHeight="80vh">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5">Apply to other job</Typography>
              <IconButton aria-label="close" onClick={handleClose} sx={{ p: 0 }}>
                <IconifyIcon icon="material-symbols-light:close-rounded" fontSize="20px" />
              </IconButton>
            </Stack>

            <Typography variant="subtitle1" sx={{ mb: 2, mt: 1 }}>
              เลือกงานให้กับผู้สมัคร
            </Typography>

            <Stack spacing={1.5} direction="column">
              <Field.Select
                name="groupLocation"
                label="Group Location"
                onChange={(e) => {
                  setValue('groupLocation', e.target.value);
                  setValue('province', '');
                  setValue('department', '');
                  setValue('jobTitle', '');
                }}
              >
                {GROUP_LOCATION.map((location) => (
                  <MenuItem key={location.value} value={location.value}>
                    {location.label}
                  </MenuItem>
                ))}
              </Field.Select>

              <Field.Select
                name="province"
                label="Province"
                onChange={(e) => {
                  setValue('province', e.target.value);
                  setValue('jobTitle', '');
                }}
              >
                {provinceList.map((provinceItem) => (
                  <MenuItem key={provinceItem.provinceId} value={provinceItem.provinceId}>
                    {provinceItem.provinceNameTh || provinceItem.provinceNameEn}
                  </MenuItem>
                ))}
              </Field.Select>

              <Field.Select
                name="department"
                label="Department"
                onChange={(e) => {
                  setValue('department', e.target.value);
                  setValue('jobTitle', '');
                }}
              >
                {departmentList.map((dept) => (
                  <MenuItem key={dept.departmentId} value={dept.departmentId}>
                    {dept.departmentNameTh || dept.departmentNameEn}
                  </MenuItem>
                ))}
              </Field.Select>

              <Field.Select
                name="jobTitle"
                label="Job Title"
                disabled={!groupLocation && !province && !department}
              >
                {jobListData?.items?.map((job) => (
                  <MenuItem key={job.jobPostId} value={job.jobPostId}>
                    {job.jobTitle}
                  </MenuItem>
                ))}
              </Field.Select>
            </Stack>

            <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
              <Button
                type="button"
                variant="text"
                onClick={handleClose}
                sx={{
                  bgcolor: grey[200],
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: grey[300],
                  },
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={!jobTitle}>
                Confirm
              </Button>
            </Box>
          </Box>
        </Form>
      </Dialog>

      {/* Success Dialog */}
      <CustomConfirmDialog
        open={isOpenSuccessDialog.value}
        onClose={isOpenSuccessDialog.onFalse}
        title="สมัครงานงานสำเร็จ"
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ทำการสมัครงานให้ผู้สมัครเรียบร้อยแล้ว
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenSuccessDialog.onFalse}>
            Close
          </Button>
        }
      />

      {/* Error Dialog */}
      <CustomConfirmDialog
        open={isOpenErrorDialog.value}
        onClose={isOpenErrorDialog.onFalse}
        title="เกิดข้อผิดพลาด"
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenErrorDialog.onFalse}>
            Close
          </Button>
        }
      />

      {/* Network Error Dialog */}
      <CustomConfirmDialog
        open={isOpenNetworkErrorDialog.value}
        onClose={isOpenNetworkErrorDialog.onFalse}
        title="การเชื่อมต่ออินเทอร์เน็ตขัดข้อง"
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้ในขณะนี้ กรุณาตรวจสอบการเชื่อมต่อและลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenNetworkErrorDialog.onFalse}>
            Close
          </Button>
        }
      />
    </>
  );
};

export default ApplyToOtherJobDialog;
