// ThankYouPage.js
import React from 'react';
import { Container, Typography, Checkbox, FormControlLabel } from '@mui/material';

const ThankYouStep = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '20px', textAlign: 'center' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Thank You!
      </Typography>
      <Typography variant="h6">
        Your application has been matched with the lender Special Financing Company! They can be reached at 757-825-0450.
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={true} color="primary" />}
        label="Application Submitted"
        style={{ marginTop: '20px' }}
      />
    </Container>
  );
};

export default ThankYouStep;
