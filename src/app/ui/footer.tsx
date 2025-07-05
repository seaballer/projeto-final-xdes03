'use client';

import { Box, Typography, Link as MuiLink } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        py: 2,
        mt: 4,
        borderTop: '1px solid #ccc',
      }}
    >
      <Typography variant="body2">
        Feito por{' '}
        <MuiLink href="https://github.com/HenriqueBatista1" target="_blank" rel="noopener noreferrer">
          Henrique Oliveira Batista
        </MuiLink>{' '}
        e{' '}
        <MuiLink href="https://github.com/seaballer" target="_blank" rel="noopener noreferrer">
          Lucas Barbosa Pena
        </MuiLink>
      </Typography>
    </Box>
  );
}
