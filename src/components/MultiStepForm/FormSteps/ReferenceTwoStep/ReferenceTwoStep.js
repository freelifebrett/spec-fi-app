import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Container } from '@mui/material';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice'; // Update with your actual path
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';


const ReferenceTwoStep = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector((state) => state.form);
    const [errors, setErrors] = useState({});

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\d{10}$/;
        return regex.test(phoneNumber.replace(/[\s-()]/g, ''));
    };

    const handleChange = (fieldName, value) => {
        dispatch(updateField({ fieldName, fieldValue: value }));

        if (fieldName.includes('Phone') && !validatePhoneNumber(value)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: 'Invalid phone number format. Use 5551234567.',
            }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
        }
    };

    const goToPreviousStep = () => {
        dispatch(updateCurrentStep(10));
        navigate('/step-10'); // Update with your actual route
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.info(formData, formData);

            const response = await fetch('http://localhost:5001/spec-fi-app/us-central1/submitFormData', { // Use the correct URL of your Firebase function
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Form data submitted successfully');
                // Handle successful submission here, e.g., navigate to the next step
            } else {
                console.error('Failed to submit form data', response);
                // Handle errors here
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
            // Handle network errors here
        }
    };


    // Example check to enable the 'Next' button
    const canProceed = ['reference2FirstName', 'reference2LastName', 'reference2Phone', 'reference2Relationship']
        .every(field => formData[field] && String(formData[field]).trim() !== '');

    return (
        <Container>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    label="First Name"
                    name={`reference2FirstName`}
                    value={formData[`reference2FirstName`] || ''}
                    onChange={(e) => handleChange(`reference2FirstName`, e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name={`reference2LastName`}
                    value={formData[`reference2LastName`] || ''}
                    onChange={(e) => handleChange(`reference2LastName`, e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Phone Number"
                    name={`reference2Phone`}
                    value={formData[`reference2Phone`] || ''}
                    onChange={(e) => handleChange(`reference2Phone`, e.target.value)}
                    required
                    margin="normal"
                    error={!!errors[`reference2Phone`]}
                    helperText={errors[`reference2Phone`]}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Relationship</InputLabel>
                    <Select
                        name={`reference2Relationship`}
                        value={formData[`reference2Relationship`] || ''}
                        onChange={(e) => handleChange(`reference2Relationship`, e.target.value)}
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
                </FormControl>
            </Box>
            <Box mt={2}>
                <FormButton
                    onClick={goToPreviousStep}
                    text="Back">
                </FormButton>
                <FormButton
                    onClick={handleSubmit}
                    text="Submit"
                    disabled={!canProceed}>
                </FormButton>
            </Box>
        </Container>
    );
};

export default ReferenceTwoStep;
