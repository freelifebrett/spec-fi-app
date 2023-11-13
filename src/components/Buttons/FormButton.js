import React from 'react';
import Button from '@mui/material/Button';

const FormButton = ({ onClick, text }) => (
    <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    sx={{ mt: 2, fontSize: 'large', padding: '10px 20px', width: '150px', margin: '10px' }}
  >
    {text}
  </Button>
);

export default FormButton;