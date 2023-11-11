import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Container } from '@mui/material';
import { updateField } from '../../../../redux/form/formSlice'; // Update with your actual path

const StepSeven = () => {
  const dispatch = useDispatch();
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

  const handleSubmit = () => {
    console.info(formData);
  }

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
          <Button variant="contained" color="primary" onClick={() => {/* dispatch previous step action */}} sx={{ mr: 1 }}>
            Previous
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={!canProceed} onClick={() => handleSubmit}>
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default StepSeven;
