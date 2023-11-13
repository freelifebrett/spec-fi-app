import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StepOne = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form); // Adjust the path according to your store setup

  const [errors, setErrors] = useState({});

  // Validation function
  const validate = (name, value) => {
    if ((name === 'firstName' || name === 'lastName') && !value.trim()) {
      return 'This field is required';
    } else if (value.trim() && !/^[a-zA-Z]+$/i.test(value.trim())) {
      return 'Only letters are allowed';
    }
    return '';
  };

  // Handle input changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validate(name, value);
    setErrors({ ...errors, [name]: errorMessage });
    dispatch(updateField({ fieldName: name, fieldValue: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data, etc.
    // If validation passes, go to the next step
    dispatch(updateCurrentStep(2)); // Assuming '2' represents StepTwo

    // Navigate to StepTwo
    navigate('/step-2');
  };

  // Check if the form can proceed to the next step
  const canProceed = !errors.firstName && !errors.lastName && formData.firstName && formData.lastName;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Step 1: Name
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name (Required)"
          value={formData.firstName || ''}
          onChange={handleFieldChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          id="middleName"
          name="middleName"
          label="Middle Name"
          value={formData.middleName || ''}
          onChange={handleFieldChange}
          margin="normal"
        />

        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name (Required)"
          value={formData.lastName || ''}
          onChange={handleFieldChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          margin="normal"
          required
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!canProceed}
          sx={{ mt: 2 }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default StepOne;
