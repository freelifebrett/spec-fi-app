import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const StepFive = ({ handleNext, handleBack }) => {
    const dispatch = useDispatch();
    const { formData, errors } = useSelector(state => state.form);
    const [localErrors, setLocalErrors] = useState({ ...errors });

    // Update local errors when Redux store errors change
    useEffect(() => {
        setLocalErrors(errors);
    }, [errors]);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateField({ fieldName: name, fieldValue: value }));
        dispatch(validate(name, value));
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
            case 'city':
                if (!value.trim()) error = 'City is required.';
                break;
            case 'state':
                if (!/^[A-Za-z]{2}$/.test(value)) error = 'Invalid state abbreviation. It must be 2 characters.';
                break;
            case 'zipCode':
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


    const canProceed = Object.values(localErrors).every(x => x === '') &&
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
                    error={!!localErrors.employerName}
                    helperText={localErrors.employerName}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Occupation/Title"
                    name="occupation"
                    value={formData.occupation || ''}
                    onChange={handleFieldChange}
                    error={!!localErrors.occupation}
                    helperText={localErrors.occupation}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Employer Phone"
                    name="employerPhone"
                    value={formData.employerPhone || ''}
                    onChange={handleFieldChange}
                    error={!!localErrors.employerPhone}
                    helperText={localErrors.employerPhone}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Employer Address"
                    name="employerAddress"
                    value={formData.employerAddress || ''}
                    onChange={handleFieldChange}
                    error={!!localErrors.employerAddress}
                    helperText={localErrors.employerAddress}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="City"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleFieldChange}
                    error={!!localErrors.city}
                    helperText={localErrors.city}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="State"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleFieldChange}
                    error={!!localErrors.state}
                    helperText={localErrors.state}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Zip Code"
                    name="zipCode"
                    value={formData.zipCode || ''}
                    onChange={handleFieldChange}
                    error={!!localErrors.zipCode}
                    helperText={localErrors.zipCode}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Average Income"
                    name="averageIncome"
                    value={formData.averageIncome || ''}
                    onChange={handleFieldChange}
                    error={!!localErrors.averageIncome}
                    helperText={localErrors.averageIncome}
                />
                {/* Navigation buttons */}
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!canProceed}
                        onClick={() => {/* Handle next step */ }}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default StepFive;
