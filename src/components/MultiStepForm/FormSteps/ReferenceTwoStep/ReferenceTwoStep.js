import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, FormHelperText, FormControl, InputLabel, Select, MenuItem, Box, Container, CircularProgress, Alert } from '@mui/material';
import { updateField, updateCurrentStep, updateSubmissionStatus } from '../../../../redux/form/formSlice'; // Update with your actual path
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';


const ReferenceTwoStep = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector((state) => state.form);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const validate = (name, value) => {
        switch (name) {
            case 'reference2FirstName':
            case 'reference2LastName':
                return value.trim() !== '' ? '' : 'This field is required';
            case 'reference2Phone':
                return /^\d{10}$/.test(value) ? '' : 'Invalid phone number. Format: 1234567890';
            case 'reference2Relationship':
                return value !== '' ? '' : 'Please select a relationship';
            default:
                return '';
        }
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateField({ fieldName: name, fieldValue: value }));

        // Only validate fields other than employerPhone
        if (name !== 'reference2Phone') {
            const error = validate(name, value);
            setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (name === 'reference2Phone') {
            const error = validate(name, value);
            setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        }
    };
    const handleSubmit = async () => {
        let formIsValid = true;
        let newErrors = {};

        ['reference2FirstName', 'reference2LastName', 'reference2Phone', 'reference2Relationship'].forEach(field => {
            const error = validate(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                formIsValid = false;
            }
        });

        setErrors(newErrors);
        if (formIsValid) {
            setIsLoading(true);
            // try {
            //     const response = await fetch('http://localhost:5001/spec-fi-app/us-central1/submitFormData', { // Use the correct URL of your Firebase function
            //         method: 'POST',
            //         mode: 'no-cors',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(formData),
            //     });

            //     if (response.ok) {
                    dispatch(updateSubmissionStatus(true));                    
                    console.log('Form data submitted successfully');
                    // navigate('/thank-you'); // Navigate to the thank you page
            //     } else {
            //         console.error('Failed to submit form data', response);
            //         setSubmitError('Failed to submit form data');
            //     }
            // } catch (error) {
            //     console.error('Error submitting form data:', error);
            //     setSubmitError('Error submitting form data');
            // } finally {
            //     setIsLoading(false);
            // }
        }
    };

    const goToPreviousStep = () => {
        dispatch(updateCurrentStep(10));
        navigate('/step-10'); // Update with your actual route
    };

    // Example check to enable the 'Next' button
    const canProceed = ['reference2FirstName', 'reference2LastName', 'reference2Phone', 'reference2Relationship']
        .every(field => formData[field] && String(formData[field]).trim() !== '');

    return (
        <Container>
            {isLoading && <CircularProgress />} {/* Spinner */}
    {submitError && <Alert severity="error">{submitError}</Alert>} {/* Error Popup */}
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="reference2FirstName"
                    value={formData.reference2FirstName || ''}
                    onChange={handleFieldChange}
                    required
                    margin="normal"
                    error={!!errors.reference2FirstName}
                    helperText={errors.reference2FirstName}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="reference2LastName"
                    value={formData.reference2LastName || ''}
                    onChange={handleFieldChange}
                    required
                    margin="normal"
                    error={!!errors.reference2LastName}
                    helperText={errors.reference2LastName}
                />
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="reference2Phone"
                    value={formData.reference2Phone || ''}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    required
                    margin="normal"
                    error={!!errors.reference2Phone}
                    helperText={errors.reference2Phone}
                />
                <FormControl fullWidth margin="normal" error={!!errors.reference2Relationship}>
                    <InputLabel id="reference-two-relationship-label">Relationship</InputLabel>
                    <Select
                        name="reference2Relationship"
                        labelId="reference-two-relationship-label"
                        label="Relationship"
                        value={formData.reference2Relationship || ''}
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
                    <FormHelperText>{errors.reference2Relationship}</FormHelperText>
                </FormControl>
            </Box>
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
        </Container>
    );
};

export default ReferenceTwoStep;