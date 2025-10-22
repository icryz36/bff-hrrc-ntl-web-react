import { Paper } from '@mui/material';

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent = ({ children }: PageContentProps) => {
  return <Paper sx={{ px: { xs: 3, md: 5 }, py: 3 }}>{children}</Paper>;
};

export default PageContent;
