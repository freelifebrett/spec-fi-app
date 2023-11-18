import React from 'react';
import { Typography } from '@mui/material';

const PaymentHelperText = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      Your first month's payment will be processed today using Credit/Debit card but from next month forward it will be processed through ACH.
    </Typography>
  );
};

export default PaymentHelperText;
