import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useBoolean } from 'hooks/useBoolean';
import { pathsNavigate } from 'routes/paths';
import { useUpdateCandidateMutation } from 'services/candidate/mutation';
import { useCandidateQuery } from 'services/candidate/query';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import DefaultLoader from 'components/loading/DefaultLoader';
import { EditCandidateForm } from '../components/edit-candidate-form';
import { convertDefaultValuesForm } from '../helper';

// ----------------------------------------------------------------------

const EditCandidateView = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();

  const isSubmitSuccess = useBoolean();
  const isOpenUpdateFailedDialog = useBoolean();
  const isOpenUpdateSuccessDialog = useBoolean();

  // api ---------------------------------------------------------------

  const { data: candidateDetail, isLoading } = useQuery({
    ...useCandidateQuery.detail({ candidateId: id }),
    enabled: !!id,
  });

  const result = candidateDetail?.documents?.filter(
    (doc) => doc.documentType.documentTypeKey === 'profile_picture',
  );
  const firstFilePath = result?.[0]?.filePath || '';

  const { data: fileImageData } = useQuery({
    ...useCandidateQuery.document({ filePath: firstFilePath }),
    enabled: !!firstFilePath,
  });

  const { mutate: updateCandidate, isPending: isLoadingUpdateCandidate } =
    useUpdateCandidateMutation();

  // func ----------------------------------------------------------------

  const onSubmit = (data: FormData) => {
    updateCandidate(data, {
      onSuccess: (response) => {
        if (response.status) {
          isOpenUpdateSuccessDialog.onToggle();
          isSubmitSuccess.onTrue();
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
    () => convertDefaultValuesForm(candidateDetail, fileImageData?.binaryBase64),
    [candidateDetail, fileImageData],
  );

  // ----------------------------------------------------------------------

  if (isLoading) {
    return <DefaultLoader />;
  }

  return (
    <>
      <EditCandidateForm
        onSubmitForm={onSubmit}
        defaultValuesForm={defaultValuesForm}
        isLoading={isLoadingUpdateCandidate}
        isSubmitSuccess={isSubmitSuccess.value}
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
          <Button variant="contained" onClick={() => navigate(pathsNavigate.candidate.list)}>
            Go to List Candidate
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
