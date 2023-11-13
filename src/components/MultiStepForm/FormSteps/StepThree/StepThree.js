import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StepThree = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form); // Updated to use state.form
  const [localData, setLocalData] = useState({
    dob: formData.dob || '',
    ssn: formData.ssn || '',
  });
  const [errors, setErrors] = useState({});

  // Existing validation logic from your original StepThree.js
  const validateDOB = (dob) => {
    const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(dob) && new Date(dob) <= new Date();
  };


  const validateSSN = (ssn) => {
    const regex = /^\d{3}-\d{2}-\d{4}$/;
    return regex.test(ssn);
  };

  const goToPreviousStep = () => {
    navigate('/step-2');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = {};

    if (!validateDOB(localData.dob)) {
      newErrors.dob = 'Invalid Date of Birth';
      formIsValid = false;
    }

    if (!validateSSN(localData.ssn)) {
      newErrors.ssn = 'Invalid Social Security Number';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      dispatch(updateField({ dob: localData.dob, ssn: localData.ssn }));
      dispatch(updateCurrentStep(4)); // Assuming the next step is 4
      navigate('/step-4'); // Navigate to the next step
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLocalData({ ...localData, [id]: value });
  };

  const canProceed = Object.values(errors).every(error => error === '') &&
    ['dob', 'ssn'].every(field => localData[field] && localData[field].trim() !== '');

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Step 3
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="dob"
            label="Date of Birth"
            name="dob"
            autoComplete="dob"
            autoFocus
            value={localData.dob}
            onChange={handleInputChange}
            error={!!errors.dob}
            helperText={errors.dob}
            type="date"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="ssn"
            label="Social Security Number"
            name="ssn"
            autoComplete="ssn"
            value={localData.ssn}
            onChange={handleInputChange}
            error={!!errors.ssn}
            helperText={errors.ssn}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={goToPreviousStep}>
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginLeft: '10px' }}
              disabled={!canProceed}  // Disable the button if canProceed is false
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default StepThree;
