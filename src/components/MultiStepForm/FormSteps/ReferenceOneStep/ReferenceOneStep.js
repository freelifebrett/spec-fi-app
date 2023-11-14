import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Container } from '@mui/material';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice'; // Update with your actual path
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';


const ReferenceOneStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form);
  const [errors, setErrors] = useState({});

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber.replace(/[\s-()]/g, ''));
  };

  const handleChange = (fieldName, value) => {
    dispatch(updateField({ fieldName, fieldValue: value }));

    if (fieldName.includes('Phone') && !validatePhoneNumber(value)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: 'Invalid phone number format. Use 5551234567.',
      }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
    }
  };

  const goToPreviousStep = () => {
    dispatch(updateCurrentStep(9));
    navigate('/step-9'); // Update with your actual route
  };

  const goToNextStep = () => {
    dispatch(updateCurrentStep(11));
    navigate('/step-11'); // Update with your actual route
  };


  // Example check to enable the 'Next' button
  const canProceed = ['reference1FirstName', 'reference1LastName', 'reference1Phone', 'reference1Relationship']
    .every(field => formData[field] && String(formData[field]).trim() !== '');

  return (
    <Container>
      <h2>Reference #1</h2>
      <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="First Name"
              name={`reference1FirstName`}
              value={formData[`reference1FirstName`] || ''}
              onChange={(e) => handleChange(`reference1FirstName`, e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              name={`reference1LastName`}
              value={formData[`reference1LastName`] || ''}
              onChange={(e) => handleChange(`reference1LastName`, e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone Number"
              name={`reference1Phone`}
              value={formData[`reference1Phone`] || ''}
              onChange={(e) => handleChange(`reference1Phone`, e.target.value)}
              required
              margin="normal"
              error={!!errors[`reference1Phone`]}
              helperText={errors[`reference1Phone`]}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Relationship</InputLabel>
              <Select
                name={`reference1Relationship`}
                value={formData[`reference1Relationship`] || ''}
                onChange={(e) => handleChange(`reference1Relationship`, e.target.value)}
                required
              >
                <MenuItem value="parent">Parent</MenuItem>
                <MenuItem value="sibling">Sibling</MenuItem>
                <MenuItem value="friend">Friend</MenuItem>
                <MenuItem value="colleague">Colleague</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
        <Box mt={2}>
          <FormButton
            onClick={goToPreviousStep}
            text="Back">
          </FormButton>
          <FormButton
            onClick={goToNextStep}
            text="Submit"
            disabled={!canProceed}>
          </FormButton>
        </Box>    
    </Container>
  );
};

export default ReferenceOneStep;
