import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import states from '../../../../constants/states';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';


const HousingStep = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector(state => state.form);
    const [errors, setErrors] = useState({});

    // Validation function
    const validate = (name, value) => {
        let error = '';
        const trimmedValue = value.trim();

        switch (name) {
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
        dispatch(updateCurrentStep(2));
        navigate('/step-2'); // Update with your actual route
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform your validation and other logic here

        // Update Redux state if neededs
        dispatch(updateCurrentStep(4));

        // Navigate to StepThree
        navigate('/step-4');
    };

    // Check if the form can proceed to the next step
    const canProceed = Object.values(errors).every(x => x === '') &&
        ['ownOrRent', 'timeAtAddress', 'housingPayment']
            .every(field => formData[field] && formData[field].trim() !== '');

    return (
        <Container>
            <Box component="form" noValidate autoComplete="off">
                <FormControl fullWidth margin="normal">
                    <InputLabel id="time-at-address-label">Time at Address</InputLabel>
                    <Select
                        labelId="time-at-address-label"
                        id="timeAtAddress"
                        name="timeAtAddress"
                        value={formData.timeAtAddress}
                        label="Time at Address"
                        onChange={handleFieldChange}
                        required
                    >
                        <MenuItem value="0">0 years</MenuItem>
                        <MenuItem value="1">1 year</MenuItem>
                        <MenuItem value="2">2 years</MenuItem>
                        <MenuItem value="3">3 years</MenuItem>
                        <MenuItem value="4">4 years</MenuItem>
                        <MenuItem value="5">5 years</MenuItem>
                        <MenuItem value="6">6 years</MenuItem>
                        <MenuItem value="7">7 years</MenuItem>
                        <MenuItem value="8">8 years</MenuItem>
                        <MenuItem value="9">9 years</MenuItem>
                        <MenuItem value="10+">10+ years</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="own-or-rent-label">Own or Rent</InputLabel>
                    <Select
                        labelId="own-or-rent-label"
                        id="ownOrRent"
                        name="ownOrRent"
                        value={formData.ownOrRent}
                        label="Own or Rent"
                        onChange={handleFieldChange}
                        required
                    >
                        <MenuItem value="Own">Own</MenuItem>
                        <MenuItem value="Rent">Rent</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Housing Payment"
                    variant="outlined"
                    name="housingPayment"
                    value={formData.housingPayment}
                    onChange={handleFieldChange}
                    fullWidth
                    required
                    margin="normal"
                    error={!!errors.housingPayment}
                    helperText={errors.housingPayment || ''}
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

export default HousingStep;
