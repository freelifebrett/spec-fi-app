import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';

const OccupationStep = () => {
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
            case 'occupation':
                if (!value.trim()) error = 'Occupation/title is required.';
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


    const goToNextStep = () => {
        let formIsValid = true;
        let newErrors = {};

        ['occupation', 'averageIncome'].forEach(field => {
            const error = validate(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                formIsValid = false;
            }
        });

        setErrors(newErrors);
        if (formIsValid) {
            dispatch(updateCurrentStep(7)); // Update to the correct next step number
            navigate('/step-7'); // Update to the correct next step path
        }
    };

    // Navigation functions
    const goToPreviousStep = () => {
        dispatch(updateCurrentStep(5));
        navigate('/step-5'); // Update with your actual route
    };

    const canProceed = Object.values(errors).every(x => x === '') &&
        ['occupation', 'averageIncome']
            .every(field => formData[field] && formData[field].trim() !== '');

    return (
        <Container>
            <Box>
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
                    label="Average Income"
                    name="averageIncome"
                    value={formData.averageIncome || ''}
                    onChange={handleFieldChange}
                    error={!!errors.averageIncome}
                    helperText={errors.averageIncome}
                    type="number"
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

export default OccupationStep;
