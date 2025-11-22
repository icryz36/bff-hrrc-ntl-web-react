import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

interface AccordionCustomProps {
  icon?: string;
  title: string;
  children: React.ReactNode;
  panelId: string | number;
}

const AccordionCustom: React.FC<AccordionCustomProps> = ({ icon, title, children, panelId }) => {
  return (
    <Accordion>
      <AccordionSummary
        aria-controls={`${panelId}-content`}
        id={`${panelId}-header`}
        sx={{ flexDirection: 'row', px: 0 }}
      >
        <Stack gap={1} direction="row" alignItems="center">
          {icon && <IconifyIcon icon={icon} fontSize="24px" color="primary" />}
          <Typography variant="h6">{title}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionCustom;
