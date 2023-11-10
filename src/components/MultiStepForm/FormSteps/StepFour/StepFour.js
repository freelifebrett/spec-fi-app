import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { useNavigate } from 'react-router-dom';

const StepFour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector(state => state.form);
  const [errors, setErrors] = React.useState({});

  // Validation logic
  const validatePhoneNumber = (number) => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle field change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;

    // Validate fields
    if (name === 'phoneNumber') {
      isValid = validatePhoneNumber(value);
      setErrors({ ...errors, phoneNumber: isValid ? '' : 'Invalid phone number.' });
    } else if (name === 'email') {
      isValid = validateEmail(value);
      setErrors({ ...errors, email: isValid ? '' : 'Invalid email address.' });
    }

    if (isValid) {
      dispatch(updateField({ [name]: value }));
    }
  };

  // Navigation functions
  const goToPreviousStep = () => {
    navigate('/step-three'); // Update with your actual route
  };

  const goToNextStep = () => {
    navigate('/step-five'); // Update with your actual route
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <h2>Step 4: Contact Information</h2>
        <form>
          <TextField
            fullWidth
            margin="normal"
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number (Required)"
            value={formData.phoneNumber}
            onChange={handleFieldChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email Address (Required)"
            value={formData.email}
            onChange={handleFieldChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={goToPreviousStep}>
              Previous
            </Button>
            <Button variant="contained" color="primary" onClick={goToNextStep} style={{ marginLeft: '10px' }}>
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default StepFour;
