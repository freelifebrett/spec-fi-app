import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';

const StepFive = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector(state => state.form);
    const [errors, setErrors] = React.useState({});


    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateField({ fieldName: name, fieldValue: value }));

        // Call validate and handle the error
        const error = validate(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };


    // Add validation logic here
    const validate = (name, value) => {
        let error = '';

        switch (name) {
            case 'employerName':
                if (!value.trim()) error = 'Employer name is required.';
                break;
            case 'occupation':
                if (!value.trim()) error = 'Occupation/title is required.';
                break;
            case 'employerPhone':
                if (!/^\d{10}$/.test(value)) error = 'Invalid phone number. It must be 10 digits.';
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
            case 'averageIncome':
                if (!value.trim() || isNaN(value) || Number(value) <= 0) {
                    error = 'Invalid average income. It must be a positive number.';
                }
                break;
            default:
                break;
        }

        return error;
    };


    // Call validate function when form data changes
    useEffect(() => {
        validate();
    }, [formData]);

    // Navigation functions
    const goToPreviousStep = () => {
        navigate('/step-4'); // Update with your actual route
    };

    const goToNextStep = () => {
        navigate('/step-6'); // Update with your actual route
    };


    const canProceed = Object.values(errors).every(x => x === '') &&
        ['employerName', 'occupation', 'employerPhone', 'employerAddress', 'city', 'state', 'zipCode', 'averageIncome']
            .every(field => formData[field] && formData[field].trim() !== '');

    return (
        <Container maxWidth="sm">
            <Box my={4}>
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
                    label="Occupation/Title"
                    name="occupation"
                    value={formData.occupation || ''}
                    onChange={handleFieldChange}
                    error={!!errors.occupation}
                    helperText={errors.occupation}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Employer Phone"
                    name="employerPhone"
                    value={formData.employerPhone || ''}
                    onChange={handleFieldChange}
                    error={!!errors.employerPhone}
                    helperText={errors.employerPhone}
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
                <TextField
                    fullWidth
                    margin="normal"
                    label="Employer State"
                    name="employerState"
                    value={formData.employerState || ''}
                    onChange={handleFieldChange}
                    error={!!errors.employerState}
                    helperText={errors.employerState}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Employer Zip Code"
                    name="employerZipCode"
                    value={formData.employerZipCode || ''}
                    onChange={handleFieldChange}
                    error={!!errors.employerZipCode}
                    helperText={errors.employerZipCode}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Average Income"
                    name="averageIncome"
                    value={formData.averageIncome || ''}
                    onChange={handleFieldChange}
                    error={!!errors.averageIncome}
                    helperText={errors.averageIncome}
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

export default StepFive;
