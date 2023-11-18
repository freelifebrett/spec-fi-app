import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import states from '../../../../constants/states';
import { TextField, FormHelperText, Container, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';


const AddressStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector(state => state.form);
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = (name, value) => {
    let error = '';
    const trimmedValue = value.trim();

    switch (name) {
      case 'address':
        if (!trimmedValue) {
          error = 'Address is required';
        }
        break;
      case 'city':
        if (!trimmedValue) {
          error = 'City is required';
        } else if (!/^[a-zA-Z\s]+$/i.test(trimmedValue)) {
          error = 'City should only contain letters and spaces';
        }
        break;
      case 'state':
        if (!trimmedValue) {
          error = 'State is required';
        }
        break;
      case 'zipCode':
        if (!trimmedValue) {
          error = 'Zip Code is required';
        } else if (!/^\d{5}$/.test(trimmedValue)) {
          error = 'Zip Code must be 5 digits';
        }
        break;    
      default:
        break;
    }
    return error;
  };


  // Handle input changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'zipCode') {
      const errorMessage = validate(name, value);
      setErrors({ ...errors, [name]: errorMessage });
    }
    dispatch(updateField({ fieldName: name, fieldValue: value }));
  };

  // Handle blur event for zip code
  const handleZipCodeBlur = (e) => {
    const { name, value } = e.target;
    const errorMessage = validate(name, value);
    setErrors({ ...errors, [name]: errorMessage });
  };

  const goToPreviousStep = () => {
    dispatch(updateCurrentStep(2));
    navigate('/step-2');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = {};

    // List of fields to validate in this step
    const fieldsToValidate = ['address', 'city', 'state', 'zipCode'];

    // Validate only the fields in this step
    fieldsToValidate.forEach(field => {
      const error = validate(field, formData[field] || '');
      if (error) {
        newErrors[field] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    if (formIsValid) {
      // Update Redux state if needed
      dispatch(updateCurrentStep(4));
      // Navigate to the next step
      navigate('/step-4');
    }
  };

  // Check if the form can proceed to the next step
  const canProceed = Object.values(errors).every(x => x === '') &&
    ['address', 'city', 'state', 'zipCode']
      .every(field => formData[field] && formData[field].trim() !== '');

  return (
    <Container>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          id="address"
          name="address"
          label="Address (Required)"
          value={formData.address || ''}
          onChange={handleFieldChange}
          error={!!errors.address}
          helperText={errors.address}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          id="city"
          name="city"
          label="City (Required)"
          value={formData.city || ''}
          onChange={handleFieldChange}
          error={!!errors.city}
          helperText={errors.city}
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal" error={!!errors.state}>
          <InputLabel id="state-label" required>State (Required)</InputLabel>
          <Select
            labelId="state-label"
            id="state"
            name="state"
            value={formData.state || ''}
            onChange={handleFieldChange}
            label="State (Required)"
            required
          >
            {states.map(state => (
              <MenuItem key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.state}</FormHelperText>
        </FormControl>

        <TextField
          fullWidth
          id="zipCode"
          name="zipCode"
          label="Zip Code (Required)"
          value={formData.zipCode || ''}
          onBlur={handleZipCodeBlur}
          onChange={handleFieldChange}
          error={!!errors.zipCode}
          helperText={errors.zipCode}
          margin="normal"
          type="number"
          required
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

export default AddressStep;
