import { Grid, MenuItem, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMasterDataQuery } from 'services/master-data/query';
import { Field } from 'components/hook-form/fields';

// ----------------------------------------------------------------------

export const CandidateInfoForm = () => {
  const { data: titleNameList } = useQuery(useMasterDataQuery.titleName());

  return (
    <Stack spacing={2}>
      <Stack sx={{ width: 72 }}>
        <Field.UploadAvatar name="profile" sx={{ width: 72, height: 72 }} />
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Field.Select name="title" label="Title" required>
              {titleNameList?.map((option) => (
                <MenuItem key={option.titleId} value={option.titleId}>
                  {option.titleNameTh}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Field.Text name="name" label="Name" required />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Field.Text name="surName" label="Surname" required />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Field.Text name="nickName" label="Nickname" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Field.Text name="candidateId" label="Candidate ID" disabled />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};
