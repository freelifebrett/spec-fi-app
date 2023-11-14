import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Typography, Box } from '@mui/material';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';

const CreditCardStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector(state => state.form);
  const [errors, setErrors] = React.useState({});

  const validate = (name, value) => {
    let error = '';
    switch (name) {
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

  // Navigation functions
  const goToPreviousStep = () => {
    dispatch(updateCurrentStep(8));
    navigate('/step-8'); // Update with your actual route
  };

  const goToNextStep = () => {
    dispatch(updateCurrentStep(10));
    navigate('/step-10'); // Update with your actual route
  };

  const canProceed = Object.values(errors).every(x => x === '') &&
    ['bankName', 'accountNumber', 'routingNumber', 'cardNumber', 'cardCVV', 'cardExpMonth', 'cardExpYear']
      .every(field => formData[field] && String(formData[field]).trim() !== '');

  return (
    <Container>
        <h2>Credit Card Info</h2>
        <Box component="form" noValidate sx={{ mt: 1 }}>
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
          <Box mt={2}>
            <FormButton
              onClick={goToPreviousStep}
              text="Back">
            </FormButton>
            <FormButton
              onClick={goToNextStep}
              text="Next"
              disabled={!canProceed}>
            </FormButton>
          </Box>
        </Box>
    </Container>
  );
};

export default CreditCardStep;
