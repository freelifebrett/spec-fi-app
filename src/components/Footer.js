// src/components/Footer.js
import React from 'react';
import { Box, Typography, Container, AppBar, Toolbar } from '@mui/material';

const Footer = () => {
    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar sx={{ minHeight: '48px' }}> {/* Adjust the height here */}
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="subtitle1" color="inherit" sx={{ fontWeight: 'bold' }}>
                        © 2023 Free Life Funding
                    </Typography>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
