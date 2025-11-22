import { Grid, Paper, Typography } from '@mui/material';

interface InfoRow {
  label: string;
  value: string;
  fullWidth?: boolean;
}

interface InformationBoxProps {
  rows: InfoRow[];
}

const InformationBox = ({ rows }: InformationBoxProps) => {
  return (
    <Paper elevation={0} background={1} variant="elevation" sx={{ p: 2 }}>
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
  );
};

export default InformationBox;
