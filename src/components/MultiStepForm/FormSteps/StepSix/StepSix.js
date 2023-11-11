import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { updateField } from '../../../../redux/form/formSlice';

const StepSix = () => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.form.data);
  const errors = useSelector(state => state.form.errors);

  const validate = (name, value) => {
    let error = '';
    switch (name) {
      case 'bankName':
        if (!value.trim()) error = 'Bank name is required';
        break;
      case 'accountNumber':
        if (!/^\d+$/.test(value)) error = 'Account number must be numeric';
        break;
      case 'routingNumber':
        if (!/^\d+$/.test(value)) error = 'Routing number must be numeric';
        break;
      case 'cardNumber':
        if (!/^\d+$/.test(value)) error = 'Card number must be numeric';
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

    // Call validate and handle the error
    const error = validate(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const canProceed = Object.values(errors).every(x => x === '') &&
    ['bankName', 'accountNumber', 'routingNumber', 'cardNumber', 'cardCVV', 'cardExpMonth', 'cardExpYear']
      .every(field => formData[field] && formData[field].trim() !== '');

  return (
    <div className="step-six-form">
      <h2>Step 6: Payment Details</h2>
      <form>
        <TextField
          label="Bank Name"
          name="bankName"
          value={formData.bankName || ''}
          onChange={handleFieldChange}
          error={!!errors.bankName}
          helperText={errors.bankName}
        />
        <TextField
          label="Account Number"
          name="accountNumber"
          value={formData.accountNumber || ''}
          onChange={handleFieldChange}
          error={!!errors.accountNumber}
          helperText={errors.accountNumber}
        />
        <TextField
          label="Routing Number"
          name="routingNumber"
          value={formData.routingNumber || ''}
          onChange={handleFieldChange}
          error={!!errors.routingNumber}
          helperText={errors.routingNumber}
        />
        <TextField
          label="Card Number"
          name="cardNumber"
          value={formData.cardNumber || ''}
          onChange={handleFieldChange}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber}
        />
        <TextField
          label="Card CVV"
          name="cardCVV"
          value={formData.cardCVV || ''}
          onChange={handleFieldChange}
          error={!!errors.cardCVV}
          helperText={errors.cardCVV}
        />
        <FormControl>
          <InputLabel>Expiration Month</InputLabel>
          <Select
            name="cardExpMonth"
            value={formData.cardExpMonth || ''}
            onChange={handleFieldChange}
            error={!!errors.cardExpMonth}
          >
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i} value={i + 1}>
                {`${i + 1}`.padStart(2, '0')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Expiration Year</InputLabel>
          <Select
            name="cardExpYear"
            value={formData.cardExpYear || ''}
            onChange={handleFieldChange}
            error={!!errors.cardExpYear}
          >
            {[...Array(20)].map((_, i) => (
              <MenuItem key={i} value={new Date().getFullYear() + i}>
                {new Date().getFullYear() + i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          disabled={!canProceed}
          onClick={() => {/* handle next step */}}
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default StepSix;
