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
  // const [localData, setLocalData] = useState({
  //   dob: formData.dob || '',
  //   ssn: formData.ssn || '',
  // });
  const [errors, setErrors] = useState({});
  const [ssnMasked, setSsnMasked] = useState(true);

  const toggleSsnMask = () => {
    setSsnMasked(!ssnMasked);
  };

  const getMaskedSsnValue = () => {
    if (!formData.ssn) {
      return ''; // Return empty string if no SSN has been entered
    }
    if (ssnMasked) {
      return '*'.repeat(formData.ssn.length); // Return asterisks based on the length of the input
    }
    return formData.ssn; // Return the actual SSN if not masked
  };

  const validate = (name, value) => {
    switch (name) {
      case 'dob':
        const dobRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        return dobRegex.test(value) && new Date(value) <= new Date() ? '' : 'Invalid Date of Birth';
      case 'ssn':
        const ssnRegex = /^\d{9}$/;
        return ssnRegex.test(value) ? '' : 'Invalid Social Security Number. Format: 123456789';
      default:
        return '';
    }
  };

  // Handle input changes without validating SSN
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ fieldName: name, fieldValue: value }));
  };

  // Handle blur event for SSN
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMessage = validate(name, value);
    setErrors({ ...errors, [name]: errorMessage });
  };

  const goToPreviousStep = () => {
    dispatch(updateCurrentStep(4));
    navigate('/step-4');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = {};

    ['dob', 'ssn'].forEach(field => {
      const error = validate(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    if (formIsValid) {
      dispatch(updateField({ dob: formData.dob, ssn: formData.ssn }));
      dispatch(updateCurrentStep(6));
      navigate('/step-6');
    }
  };

  const canProceed = Object.values(errors).every(error => error === '') &&
    ['dob', 'ssn'].every(field => formData[field] && formData[field].trim() !== '');

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
          value={formData.dob}
          onChange={handleFieldChange}
          error={!!errors.dob}
          helperText={errors.dob}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
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
          onBlur={handleBlur}
          onChange={handleFieldChange}
          error={!!errors.ssn}
          helperText={errors.ssn}
          inputProps={{ maxLength: 9 }}
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
