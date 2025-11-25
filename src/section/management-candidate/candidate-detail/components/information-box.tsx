import { Grid, Paper, Typography } from '@mui/material';

type InfoRow = {
  label: string;
  value: string | number;
  fullWidth?: boolean;
};

interface InformationBoxProps {
  rows: InfoRow[];
  background?: boolean;
  title?: string;
  subTitle?: string;
}

const InformationBox = ({ rows, background, title, subTitle }: InformationBoxProps) => {
  return (
    <>
      {title && <Typography variant="subtitle1_bold">{title}</Typography>}
      {subTitle && <Typography variant="subtitle2_bold">{subTitle}</Typography>}
      <Paper
        elevation={0}
        background={background ? 1 : undefined}
        variant="elevation"
        sx={{ p: 2 }}
      >
        <Grid container spacing={1}>
          {rows.map((item, index) => (
            <Grid key={index} container size={{ md: item?.fullWidth ? 12 : 6 }} spacing={1}>
              <Grid size={{ md: item?.fullWidth ? 2.5 : 5 }}>
                <Typography variant="subtitle2_bold">{item.label}</Typography>
              </Grid>
              <Grid size={{ md: item?.fullWidth ? 8.5 : 7 }}>
                <Typography variant="subtitle2_regular" sx={{ whiteSpace: 'pre-line' }}>
                  {item.value ? item.value : '-'}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default InformationBox;
