import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Typography, Box } from '@mui/material';
import { updateField } from '../../../../redux/form/formSlice';

const StepSix = () => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.form);
  const [errors, setErrors] = React.useState({});

  const validate = (name, value) => {
    let error = '';
    switch (name) {
      case 'bankName':
        if (!value.trim()) error = 'Bank name is required';
        break;
      case 'accountNumber':
        if (!/^\d+$/.test(value)) error = 'Account number must be numeric';
        break;
      case 'routingNumber':
        if (!/^\d+$/.test(value)) error = 'Routing number must be numeric';
        break;
      case 'cardNumber':
        if (!/^\d+$/.test(value)) error = 'Card number must be numeric';
        break;
      case 'cardCVV':
        if (!/^\d+$/.test(value)) error = 'CVV must be numeric';
        break;
      case 'cardExpMonth':
        if (!value) error = 'Expiration month is required';
        break;
      case 'cardExpYear':
        if (!value) error = 'Expiration year is required';
        break;
      default:
        break;
    }

    return error;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ fieldName: name, fieldValue: value }));

    // Call validate and handle the error
    const error = validate(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const canProceed = Object.values(errors).every(x => x === '') &&
    ['bankName', 'accountNumber', 'routingNumber', 'cardNumber', 'cardCVV', 'cardExpMonth', 'cardExpYear']
      .every(field => formData[field] && formData[field].trim() !== '');

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Step 6: Payment Details</h2>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Bank Name"
            name="bankName"
            value={formData.bankName || ''}
            onChange={handleFieldChange}
            error={!!errors.bankName}
            helperText={errors.bankName}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Account Number"
            name="accountNumber"
            value={formData.accountNumber || ''}
            onChange={handleFieldChange}
            error={!!errors.accountNumber}
            helperText={errors.accountNumber}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Routing Number"
            name="routingNumber"
            value={formData.routingNumber || ''}
            onChange={handleFieldChange}
            error={!!errors.routingNumber}
            helperText={errors.routingNumber}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber || ''}
            onChange={handleFieldChange}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Card CVV"
            name="cardCVV"
            value={formData.cardCVV || ''}
            onChange={handleFieldChange}
            error={!!errors.cardCVV}
            helperText={errors.cardCVV}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Expiration Month</InputLabel>
            <Select
              name="cardExpMonth"
              value={formData.cardExpMonth || ''}
              onChange={handleFieldChange}
              error={!!errors.cardExpMonth}
            >
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i} value={i + 1}>
                  {`${i + 1}`.padStart(2, '0')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Expiration Year</InputLabel>
            <Select
              name="cardExpYear"
              value={formData.cardExpYear || ''}
              onChange={handleFieldChange}
              error={!!errors.cardExpYear}
            >
              {[...Array(20)].map((_, i) => (
                <MenuItem key={i} value={new Date().getFullYear() + i}>
                  {new Date().getFullYear() + i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!canProceed}
            onClick={() => {/* handle next step */}}
            sx={{ mt: 3, mb: 2 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default StepSix;
