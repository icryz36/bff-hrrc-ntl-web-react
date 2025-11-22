import { Grid, Paper, Typography } from '@mui/material';

interface InfoRow {
  label: string;
  value: string;
  fullWidth?: boolean;
}

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
        <Grid container spacing={2}>
          {rows.map((item, index) => (
            <Grid key={index} container size={{ md: item?.fullWidth ? 12 : 6 }} spacing={1}>
              <Grid size={{ md: 4 }}>
                <Typography variant="subtitle2_bold">{item.label}</Typography>
              </Grid>
              <Grid size={{ md: 8 }}>
                <Typography variant="subtitle2_regular">{item.value}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default InformationBox;
