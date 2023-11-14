// src/components/Footer.js
import React from 'react';
import { Box, Typography, Container, AppBar, Toolbar } from '@mui/material';
import FlipSecretsLogo from '../images/flip_secrets_logo.png';

const Footer = () => {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ minHeight: '48px' }}> {/* Adjust the height here */}
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>        
          <Typography variant="subtitle1" color="inherit">
            Free Life Funding 2023
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
