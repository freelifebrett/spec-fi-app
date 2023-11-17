import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';

const IdentityStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form);
  const [errors, setErrors] = useState({});

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

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ fieldName: name, fieldValue: value }));
  };

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
          onBlur={handleBlur}
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
          value={formData.ssn}
          onBlur={handleBlur}
          onChange={handleFieldChange}
          error={!!errors.ssn}
          helperText={errors.ssn}
          inputProps={{ maxLength: 9 }}
          type='number'
        />
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

export default IdentityStep;
