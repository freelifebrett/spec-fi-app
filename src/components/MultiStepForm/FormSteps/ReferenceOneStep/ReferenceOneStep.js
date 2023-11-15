import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, FormHelperText, FormControl, InputLabel, Select, MenuItem, Box, Container } from '@mui/material';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice'; // Update with your actual path
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';


const ReferenceOneStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case 'reference1FirstName':
      case 'reference1LastName':
        return value.trim() !== '' ? '' : 'This field is required';
      case 'reference1Phone':
        return /^\d{10}$/.test(value) ? '' : 'Invalid phone number. Format: 1234567890';
      case 'reference1Relationship':
        return value !== '' ? '' : 'Please select a relationship';
      default:
        return '';
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ fieldName: name, fieldValue: value }));

    // Call validate and handle the error
    const error = validate(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const goToNextStep = () => {
    let formIsValid = true;
    let newErrors = {};

    ['reference1FirstName', 'reference1LastName', 'reference1Phone', 'reference1Relationship'].forEach(field => {
      const error = validate(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    if (formIsValid) {
      dispatch(updateCurrentStep(11)); // Update to the correct next step number
      navigate('/step-11'); // Update to the correct next step path
    }
  };

  const goToPreviousStep = () => {
    dispatch(updateCurrentStep(9));
    navigate('/step-9'); // Update with your actual route
  };

  // Example check to enable the 'Next' button
  const canProceed = ['reference1FirstName', 'reference1LastName', 'reference1Phone', 'reference1Relationship']
    .every(field => formData[field] && String(formData[field]).trim() !== '');

  return (
    <Container>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          fullWidth
          label="First Name"
          name="reference1FirstName"
          value={formData.reference1FirstName || ''}
          onChange={handleFieldChange}
          required
          margin="normal"
          error={!!errors.reference1FirstName}
          helperText={errors.reference1FirstName}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="reference1LastName"
          value={formData.reference1LastName || ''}
          onChange={handleFieldChange}
          required
          margin="normal"
          error={!!errors.reference1LastName}
          helperText={errors.reference1LastName}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="reference1Phone"
          value={formData.reference1Phone || ''}
          onChange={handleFieldChange}
          required
          margin="normal"
          error={!!errors.reference1Phone}
          helperText={errors.reference1Phone}
        />
        <FormControl fullWidth margin="normal" error={!!errors.reference1Relationship}>
          <InputLabel>Relationship</InputLabel>
          <Select
            name="reference1Relationship"
            value={formData.reference1Relationship || ''}
            onChange={handleFieldChange}
            required                    
          >
            <MenuItem value="00001">Parent</MenuItem>
            <MenuItem value="00002">Grandparent</MenuItem>
            <MenuItem value="00003">Sibling</MenuItem>
            <MenuItem value="00004">Spouse</MenuItem>
            <MenuItem value="00005">Significant Other</MenuItem>
            <MenuItem value="00006">Friend</MenuItem>
            <MenuItem value="00007">Co-Worker</MenuItem>
            <MenuItem value="00008">Child</MenuItem>
            <MenuItem value="00009">In-Law</MenuItem>
            <MenuItem value="00010">Other</MenuItem>
            <MenuItem value="00011">Cousin</MenuItem>
            <MenuItem value="00012">Aunt</MenuItem>
            <MenuItem value="00013">Uncle</MenuItem>
          </Select>
          <FormHelperText>{errors.reference1Relationship}</FormHelperText>
        </FormControl>
      </Box>
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
    </Container>
  );
};

export default ReferenceOneStep;
