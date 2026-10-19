import type { ReactNode } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface Breadcrumb {
  title: string;
  path?: string;
}

interface PageContainerProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  actions?: ReactNode;
  children: ReactNode;
}

export default function PageContainer({
  title,
  breadcrumbs,
  actions,
  children,
}: PageContainerProps) {
  return (
    <Stack spacing={2} sx={{ minWidth: 0, width: '100%' }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          {breadcrumbs.map((breadcrumb, index) =>
            breadcrumb.path ? (
              <Link key={`${breadcrumb.title}-${index}`} href={breadcrumb.path}>
                {breadcrumb.title}
              </Link>
            ) : (
              <Typography key={`${breadcrumb.title}-${index}`} color="text.primary">
                {breadcrumb.title}
              </Typography>
            ),
          )}
        </Breadcrumbs>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
        >
          <Typography component="h1" variant="h4">
            {title}
          </Typography>
          {actions}
        </Stack>
      </Box>
      {children}
    </Stack>
  );
}
