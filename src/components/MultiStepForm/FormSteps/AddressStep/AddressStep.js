import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import states from '../../../../constants/states';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
        // Add more complex address validation if necessary
        break;
      case 'city':
        if (!trimmedValue) {
          error = 'City is required';
        } else if (!/^[a-zA-Z\s]+$/i.test(trimmedValue)) {
          error = 'City should only contain letters and spaces';
        }
        break;
      case 'state':
        // Assuming state is a dropdown and a value is always selected
        break;
      case 'zipCode':
        if (!trimmedValue) {
          error = 'Zip Code is required';
        } else if (!/^\d{5}$/.test(trimmedValue)) {
          error = 'Zip Code must be 5 digits';
        }
        break;
      case 'ownOrRent':
        if (!trimmedValue) {
          error = 'Please select whether you own or rent your home';
        }
        break;
      case 'timeAtAddress':
        if (!trimmedValue) {
          error = 'Time at address is required';
        } else if (!/^\d+$/.test(trimmedValue) || parseInt(trimmedValue, 10) < 0 || parseInt(trimmedValue, 10) > 99) {
          error = 'Invalid number of years';
        }
        break;
      case 'housingPayment':
        if (!trimmedValue) {
          error = 'Housing payment is required';
        } else if (!/^\d+(\.\d{1,2})?$/.test(trimmedValue) || parseFloat(trimmedValue) < 0) {
          error = 'Invalid housing payment amount';
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
    const errorMessage = validate(name, value);
    setErrors({ ...errors, [name]: errorMessage });
    dispatch(updateField({ fieldName: name, fieldValue: value }));
  };

  const goToPreviousStep = () => {
    dispatch(updateCurrentStep(1));
    navigate('/step-1'); // Update with your actual route
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your validation and other logic here

    // Update Redux state if neededs
    dispatch(updateCurrentStep(3));

    // Navigate to StepThree
    navigate('/step-3');
  };

  // Check if the form can proceed to the next step
  const canProceed = Object.values(errors).every(x => x === '') &&
    ['address', 'city', 'state', 'zipCode', 'ownOrRent', 'timeAtAddress', 'housingPayment']
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

        <FormControl fullWidth margin="normal">
          <InputLabel id="state-label">State (Required)</InputLabel>
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
        </FormControl>

        <TextField
          fullWidth
          id="zipCode"
          name="zipCode"
          label="Zip Code (Required)"
          value={formData.zipCode || ''}
          onChange={handleFieldChange}
          error={!!errors.zipCode}
          helperText={errors.zipCode}
          margin="normal"
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