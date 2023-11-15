import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';

const NameStep = () => {
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
    dispatch(updateField({ fieldName: name, fieldValue: value }));
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = {};

    ['firstName', 'middleName', 'lastName'].forEach(field => {
      const error = validate(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    if (formIsValid) {    
      dispatch(updateField({ firstName: formData.firstName, middleName: formData.middleName, lastName: formData.lastName }));
      dispatch(updateCurrentStep(2)); // Update to the correct next step number
      navigate('/step-2'); // Update to the correct next step path
    }
  };

  // Check if the form can proceed to the next step
  const canProceed = Object.values(errors).every(error => error === '') &&
    ['firstName', 'lastName'].every(field => formData[field] && formData[field].trim() !== '');

  return (
    <Container>
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
        <Box mt={2}>        
          <FormButton
            onClick={handleSubmit}
            text="Next"
            disabled={!canProceed}>
          </FormButton>
        </Box>
      </Box>
    </Container>
  );
};

export default NameStep;
