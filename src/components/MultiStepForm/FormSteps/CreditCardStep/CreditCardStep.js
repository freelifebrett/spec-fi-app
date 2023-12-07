import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, FormHelperText, FormControl, InputLabel, Select, MenuItem, Container, Box } from '@mui/material';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';
import PaymentHelperText from '../../../PaymentHelperText';

const CreditCardStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector(state => state.form);
  const [errors, setErrors] = React.useState({});

  const isValidCardNumber = (number) => {
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
      let digit = parseInt(number[i]);
      if (i % 2 === number.length % 2) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  const validate = (name, value) => {
    let error = '';
    switch (name) {
      case 'cardNumber':
        if (!/^\d+$/.test(value)) {
          error = 'Card number must be numeric';
        } else if (!isValidCardNumber(value)) {
          error = 'Invalid card number';
        }
        break;
      case 'cardCVV':
        if (!/^\d+$/.test(value)) error = 'CVV must be numeric';
        break;
      case 'cardExpMonth':
        if (!value) error = 'Expiration month is required';
        break;
      case 'cardExpYear':
        if (!value) error = 'Expiration year is required';
        break;
      default:
        break;
    }

    return error;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ fieldName: name, fieldValue: value }));

    // Only validate fields other than cardNumber
    if (name !== 'cardNumber') {
      const error = validate(name, value);
      setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const error = validate(name, value);
      setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    }
  };

  // Navigation functions
  const goToPreviousStep = () => {
    dispatch(updateCurrentStep(1));
    navigate('/step-1'); // Update with your actual route
  };

  const goToNextStep = () => {
    let formIsValid = true;
    let newErrors = {};

    ['cardNumber', 'cardCVV', 'cardExpMonth', 'cardExpYear'].forEach(field => {
      const error = validate(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    if (formIsValid) {
      dispatch(updateCurrentStep(3)); // Update to the correct next step number
      navigate('/step-3'); // Update to the correct next step path
    }
  };

  const canProceed = Object.values(errors).every(x => x === '') &&
    ['cardNumber', 'cardCVV', 'cardExpMonth', 'cardExpYear']
      .every(field => formData[field] && String(formData[field]).trim() !== '');

  return (
    <Container>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          fullWidth
          label="Card Number"
          name="cardNumber"
          value={formData.cardNumber || ''}
          onChange={handleFieldChange}
          onBlur={handleBlur}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber}
          type="number"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Card CVV"
          name="cardCVV"
          value={formData.cardCVV || ''}
          onChange={handleFieldChange}
          error={!!errors.cardCVV}
          helperText={errors.cardCVV}
          margin="normal"
          type="number"
          inputProps={{ maxLength: 4 }}
        />
        <FormControl fullWidth margin="normal" error={!!errors.cardExpMonth} >
          <InputLabel id="card-exp-month-label">Expiration Month</InputLabel>
          <Select
            name="cardExpMonth"
            labelId="card-exp-month-label"
            label="Expiration Month"
            value={formData.cardExpMonth || ''}
            onChange={handleFieldChange}
          >
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i} value={i + 1}>
                {`${i + 1}`.padStart(2, '0')}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.cardExpMonth}</FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal" error={!!errors.cardExpYear}>
          <InputLabel id="card-exp-year-label">Expiration Year</InputLabel>
          <Select
            name="cardExpYear"
            labelId="card-exp-year-label"
            label="Expiration Year"
            value={formData.cardExpYear || ''}
            onChange={handleFieldChange}
          >
            {[...Array(20)].map((_, i) => (
              <MenuItem key={i} value={new Date().getFullYear() + i}>
                {new Date().getFullYear() + i}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.cardExpYear}</FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="card-type-label">Card Type</InputLabel>
          <Select
            name="cardType"
            labelId="card-type-label"
            label="Card Type"
            value={formData.cardType}
            onChange={handleFieldChange}
          >
            <MenuItem value="VISA">Visa</MenuItem>
            <MenuItem value="MASTERCARD">MasterCard</MenuItem>
            <MenuItem value="AMEX">American Express</MenuItem>
            <MenuItem value="DISCOVER">Discover</MenuItem>
          </Select>
        </FormControl>
        <Box mt={2}>
          <PaymentHelperText/>
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

export default CreditCardStep;
