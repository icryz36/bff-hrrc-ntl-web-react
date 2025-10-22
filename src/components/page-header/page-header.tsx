import { JSX, PropsWithChildren } from 'react';
import { Stack, SxProps, Typography } from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';
import PageContent from 'components/sections/common/PageContent';

interface PageHeaderProps {
  title: string;
  breadcrumb?: { label: string; url?: string; active?: boolean }[];
  actionComponent?: JSX.Element;
  sx?: SxProps;
}

const PageHeader = ({
  title,
  breadcrumb,
  actionComponent,
  sx,
}: PropsWithChildren<PageHeaderProps>) => {
  const { down } = useBreakpoints();
  const downLg = down('lg');
  return (
    <PageContent>
      <Stack
        sx={{
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'flex-end' },
          justifyContent: 'space-between',
          ...sx,
        }}
      >
        <div>
          {breadcrumb && <PageBreadcrumb items={breadcrumb} sx={{ mb: 1 }} />}
          <Typography variant="h4" sx={[downLg && { fontSize: 'h5.fontSize' }]}>
            {title}
          </Typography>
        </div>

        {actionComponent}
      </Stack>
    </PageContent>
  );
};

export default PageHeader;
