import { Grid, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { DOCUMENT_TYPES } from 'data/document';
import { useMasterDataQuery } from 'services/master-data/query';
import { Field } from 'components/hook-form/fields';

// ----------------------------------------------------------------------

export const CandidateApplicationDocumentsForm = () => {
  const { data: documentTypeList } = useQuery(useMasterDataQuery.documentType());
  console.log('documentTypeList', documentTypeList);

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="body2_regular" color="text.secondary">
        Supporting documents such as resume, transcript, or certificates.
      </Typography>

      <Grid container spacing={2} alignItems="center">
        {DOCUMENT_TYPES.map((item) => (
          <Grid size={{ xs: 12, md: 6 }} key={item.documentTypeId}>
            <Stack direction="column" spacing={2}>
              <Typography variant="subtitle2_medium">{item.documentTypeNameTh}</Typography>
              <Field.Upload
                sx={{ height: 82 }}
                hideInputIfHaveValue
                name={`documents.${item.documentTypeKey}`}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
