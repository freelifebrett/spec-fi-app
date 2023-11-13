import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Container } from '@mui/material';
import { updateField } from '../../../../redux/form/formSlice'; // Update with your actual path
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';


const StepSeven = () => {
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
    navigate('/step-6'); // Update with your actual route
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.info(formData, formData);

      const response = await fetch('http://localhost:5001/spec-fi-app/us-central1/submitFormData', { // Use the correct URL of your Firebase function
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully');
        // Handle successful submission here, e.g., navigate to the next step
      } else {
        console.error('Failed to submit form data', response);
        // Handle errors here
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle network errors here
    }
  };


  // Example check to enable the 'Next' button
  const canProceed = ['reference1FirstName', 'reference1LastName', 'reference1Phone', 'reference1Relationship',
    'reference2FirstName', 'reference2LastName', 'reference2Phone', 'reference2Relationship']
    .every(field => formData[field] && String(formData[field]).trim() !== '');

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Step 7: References</h2>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {[1, 2].map((refNumber) => (
            <Box key={`reference-${refNumber}`} sx={{ mb: 2 }}>
              <h3>Reference #{refNumber}</h3>
              <TextField
                fullWidth
                label="First Name"
                name={`reference${refNumber}FirstName`}
                value={formData[`reference${refNumber}FirstName`] || ''}
                onChange={(e) => handleChange(`reference${refNumber}FirstName`, e.target.value)}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last Name"
                name={`reference${refNumber}LastName`}
                value={formData[`reference${refNumber}LastName`] || ''}
                onChange={(e) => handleChange(`reference${refNumber}LastName`, e.target.value)}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                name={`reference${refNumber}Phone`}
                value={formData[`reference${refNumber}Phone`] || ''}
                onChange={(e) => handleChange(`reference${refNumber}Phone`, e.target.value)}
                required
                margin="normal"
                error={!!errors[`reference${refNumber}Phone`]}
                helperText={errors[`reference${refNumber}Phone`]}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Relationship</InputLabel>
                <Select
                  name={`reference${refNumber}Relationship`}
                  value={formData[`reference${refNumber}Relationship`] || ''}
                  onChange={(e) => handleChange(`reference${refNumber}Relationship`, e.target.value)}
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
          ))}
          <Box mt={2}>
            <FormButton
              onClick={goToPreviousStep}
              text="Back">
            </FormButton>
            <FormButton
              onClick={handleSubmit}
              text="Next"
              disabled={!canProceed}>
            </FormButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default StepSeven;
