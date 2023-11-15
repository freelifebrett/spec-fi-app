import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';

const IndentityStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form); // Updated to use state.form
  const [localData, setLocalData] = useState({
    dob: formData.dob || '',
    ssn: formData.ssn || '',
  });
  const [errors, setErrors] = useState({});
  const [ssnMasked, setSsnMasked] = useState(true);

  const toggleSsnMask = () => {
    setSsnMasked(!ssnMasked);
  };

  const getMaskedSsnValue = () => {
    return ssnMasked ? "***-**-****" : formData.ssn;
  };

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
    dispatch(updateCurrentStep(4));
    navigate('/step-4');
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
      dispatch(updateCurrentStep(6)); // Assuming the next step is 4
      navigate('/step-6'); // Navigate to the next step
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLocalData({ ...localData, [id]: value });
  };

  const canProceed = Object.values(errors).every(error => error === '') &&
    ['dob', 'ssn'].every(field => localData[field] && localData[field].trim() !== '');

  return (
    <Container>
      <Box component="form" noValidate autoComplete="off">
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
          value={getMaskedSsnValue()}
          onChange={handleInputChange}
          error={!!errors.ssn}
          helperText={errors.ssn}
        />
        <Button 
          onClick={toggleSsnMask} 
          style={{ 
            marginTop: '5px', 
            marginBottom: '10px', 
            marginLeft: 'auto', 
            fontSize: '0.75rem' 
          }}>
          {ssnMasked ? 'Show SSN' : 'Hide SSN'}
        </Button>
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
    </Container>
  );
};

export default IndentityStep;
