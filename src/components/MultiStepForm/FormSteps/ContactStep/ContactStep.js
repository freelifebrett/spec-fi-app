import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';

const ContactStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector(state => state.form);
  const [errors, setErrors] = React.useState({});

  // Validation logic
  const validate = (name, value) => {
    let error = '';
    switch (name) {
      case 'phoneNumber':
        if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) {
          error = 'Invalid phone number. Format: 123-456-7890';
        }
        break;
      case 'email':
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          error = 'Invalid email address.';
        }
        break;
      default:
        break;
    }
    return error;
  };
  

  // Handle field change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validate(name, value);
    setErrors({ ...errors, [name]: errorMessage });
    dispatch(updateField({ fieldName: name, fieldValue: value }));
  };

  const canProceed = Object.values(errors).every(x => x === '') &&
    ['phoneNumber', 'email'].every(field => formData[field] && formData[field].trim() !== '');

  // Navigation functions
  const goToPreviousStep = () => {
    dispatch(updateCurrentStep(3));
    navigate('/step-3');
  };

  const goToNextStep = () => {
    let formIsValid = true;
    let newErrors = {};

    ['phoneNumber', 'email'].forEach(field => {
      const error = validate(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);

    if (formIsValid) {
      dispatch(updateCurrentStep(5));
      navigate('/step-5');
    }
  };

  return (
    <Container>
      <Box>
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
          type="tel"
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
          type="email"
        />
        <Box mt={2}>
          <FormButton
            onClick={goToPreviousStep}
            text="Back">
          </FormButton>
          <FormButton
            onClick={goToNextStep}
            text="Next"
            disabled={!canProceed}>
          </FormButton>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactStep;
