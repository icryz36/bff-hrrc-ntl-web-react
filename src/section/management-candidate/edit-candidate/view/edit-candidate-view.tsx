import { useMemo } from 'react';
import { useParams } from 'react-router';
import { Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useBoolean } from 'hooks/useBoolean';
import { useUpdateCandidateMutation } from 'services/candidate/mutation';
import { useCandidateQuery } from 'services/candidate/query';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import { EditCandidateForm } from '../components/edit-candidate-form';
import { convertDefaultValuesForm } from '../helper';

// ----------------------------------------------------------------------

const EditCandidateView = () => {
  const { id = '' } = useParams();

  const isOpenUpdateFailedDialog = useBoolean();
  const isOpenUpdateSuccessDialog = useBoolean();

  // api ---------------------------------------------------------------

  const { data: candidateDetail } = useQuery({
    ...useCandidateQuery.detail({ candidateId: id }),
    enabled: !!id,
  });

  const { mutate: updateCandidate, isPending: isLoadingUpdateCandidate } =
    useUpdateCandidateMutation();

  // func ----------------------------------------------------------------

  const onSubmit = (data: FormData) => {
    updateCandidate(data, {
      onSuccess: (response) => {
        if (response.status) {
          isOpenUpdateSuccessDialog.onToggle();

          return;
        }

        isOpenUpdateFailedDialog.onToggle();
      },
      onError: () => {
        isOpenUpdateFailedDialog.onToggle();
      },
    });
  };

  // ----------------------------------------------------------------------

  const defaultValuesForm = useMemo(
    () => convertDefaultValuesForm(candidateDetail),
    [candidateDetail],
  );

  // ----------------------------------------------------------------------

  return (
    <>
      <EditCandidateForm
        onSubmitForm={onSubmit}
        defaultValuesForm={defaultValuesForm}
        isLoading={isLoadingUpdateCandidate}
      />

      {/* dialog */}

      <CustomConfirmDialog
        title="แก้ไขข้อมูลสำเร็จ"
        open={isOpenUpdateSuccessDialog.value}
        onClose={isOpenUpdateSuccessDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ระบบทำการแก้ไขข้อมูลสำเร็จ
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenUpdateSuccessDialog.onFalse}>
            Close
          </Button>
        }
      />

      <CustomConfirmDialog
        title="เกิดข้อผิดพลาด"
        open={isOpenUpdateFailedDialog.value}
        onClose={isOpenUpdateFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ไม่สามารถแก้ไขข้อมูลได้ กรุณาลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenUpdateFailedDialog.onFalse}>
            Close
          </Button>
        }
      />
    </>
  );
};

export { EditCandidateView };
