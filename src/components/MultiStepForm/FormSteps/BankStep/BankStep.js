import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Typography, Box } from '@mui/material';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';

const BankStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(updateCurrentStep(7));
    navigate('/step-7'); // Update with your actual route
  };

  const goToNextStep = () => {
    dispatch(updateCurrentStep(9));
    navigate('/step-9'); // Update with your actual route
  };

  const canProceed = Object.values(errors).every(x => x === '') &&
    ['bankName', 'accountNumber', 'routingNumber']
      .every(field => formData[field] && String(formData[field]).trim() !== '');

  return (
    <Container>
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

export default BankStep;
