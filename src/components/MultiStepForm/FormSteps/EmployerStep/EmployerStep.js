import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import states from '../../../../constants/states';
import { TextField, FormControl, Container, InputLabel, Box, Select, FormHelperText, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';

const EmployerStep = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector(state => state.form);
    const [errors, setErrors] = React.useState({});


    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateField({ fieldName: name, fieldValue: value }));

        // Only validate fields other than employerPhone
        if (name !== 'employerPhone' && name !== 'employerZipCode') {
            const error = validate(name, value);
            setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (name === 'employerPhone' || name === 'employerZipCode') {
            const error = validate(name, value);
            setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        }
    };

    // Add validation logic here
    const validate = (name, value) => {
        let error = '';

        switch (name) {
            case 'employerName':
                if (!value.trim()) error = 'Employer name is required.';
                break;
            case 'employerPhone':
                if (!/^\d{10}$/.test(value)) error = 'Invalid phone number. Format: 1234567890';
                break;
            case 'employerAddress':
                if (!value.trim()) error = 'Employer address is required.';
                break;
            case 'employerCity':
                if (!value.trim()) error = 'City is required.';
                break;
            case 'employerState':
                if (!/^[A-Za-z]{2}$/.test(value)) error = 'Invalid state abbreviation. It must be 2 characters.';
                break;
            case 'employerZipCode':
                if (!/^\d{5}$/.test(value)) error = 'Invalid zip code. It must be 5 digits.';
                break;
            default:
                break;
        }

        return error;
    };

    // Navigation functions
    const goToPreviousStep = () => {
        dispatch(updateCurrentStep(6));
        navigate('/step-6'); // Update with your actual route
    };

    const goToNextStep = () => {
        let formIsValid = true;
        let newErrors = {};

        ['employerName', 'employerPhone', 'employerAddress', 'employerCity', 'employerState', 'employerZipCode'].forEach(field => {
            const error = validate(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                formIsValid = false;
            }
        });

        setErrors(newErrors);
        if (formIsValid) {
            dispatch(updateCurrentStep(8)); // Update to the correct next step number
            navigate('/step-8'); // Update to the correct next step path
        }
    };


    const canProceed = Object.values(errors).every(x => x === '') &&
        ['employerName', 'employerPhone', 'employerAddress', 'employerCity', 'employerState', 'employerZipCode']
            .every(field => formData[field] && formData[field].trim() !== '');

    return (
        <Container>
            <Box>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Employer Name"
                    name="employerName"
                    value={formData.employerName || ''}
                    onChange={handleFieldChange}
                    error={!!errors.employerName}
                    helperText={errors.employerName}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Employer Phone"
                    name="employerPhone"
                    value={formData.employerPhone || ''}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    error={!!errors.employerPhone}
                    helperText={errors.employerPhone}
                    type="number"
                    inputProps={{ maxLength: 10 }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Employer Address"
                    name="employerAddress"
                    value={formData.employerAddress || ''}
                    onChange={handleFieldChange}
                    error={!!errors.employerAddress}
                    helperText={errors.employerAddress}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Employer City"
                    name="employerCity"
                    value={formData.employerCity || ''}
                    onChange={handleFieldChange}
                    error={!!errors.employerCity}
                    helperText={errors.employerCity}
                />
                <FormControl fullWidth margin="normal" error={!!errors.employerState}>
                    <InputLabel id="employer-state-label">State</InputLabel>
                    <Select
                        labelId="employer-state-label"
                        id="employerState"
                        name="employerState"
                        value={formData.employerState || ''}
                        onChange={handleFieldChange}
                        label="State"
                    >
                        {states.map(state => (
                            <MenuItem key={state.abbreviation} value={state.abbreviation}>
                                {state.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.employerState}</FormHelperText>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Employer Zip Code"
                    name="employerZipCode"
                    value={formData.employerZipCode || ''}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    error={!!errors.employerZipCode}
                    helperText={errors.employerZipCode}
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

export default EmployerStep;
