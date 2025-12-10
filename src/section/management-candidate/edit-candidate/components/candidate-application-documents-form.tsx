import { Box, Grid, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMasterDataQuery } from 'services/master-data/query';
import { Field } from 'components/hook-form/fields';

// ----------------------------------------------------------------------

export const CandidateApplicationDocumentsForm = () => {
  const { data: documentTypeList } = useQuery(useMasterDataQuery.documentType());

  // ----------------------------------------------------------------------

  const filterDocTypeKey =
    documentTypeList?.filter((item) => item.documentTypeKey !== 'profile_picture') || [];

  // ----------------------------------------------------------------------

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="body2_regular" color="text.secondary">
        Supporting documents such as resume, transcript, or certificates.
      </Typography>

      <Grid container spacing={2}>
        {filterDocTypeKey?.map((item) => (
          <Grid size={{ xs: 12, md: 6 }} key={item.documentTypeId}>
            <Stack direction="column" spacing={2}>
              <Typography variant="subtitle2_medium">{item.documentTypeNameEn}</Typography>
              <Box sx={{ position: 'relative' }}>
                <Field.Upload
                  sx={{ height: 82 }}
                  hideInputIfHaveValue
                  name={`documents[${item.documentTypeKey}]`}
                  accept={{
                    'application/pdf': ['.pdf'],
                    'application/msword': ['.doc'],
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
                      '.docx',
                    ],
                  }}
                />
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
