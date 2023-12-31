import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, FormHelperText, FormControl, InputLabel, Select, MenuItem, Box, Container, CircularProgress, Alert, Typography } from '@mui/material';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice'; // Update with your actual path
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Buttons/FormButton';


// Define the overlay style
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // semi-transparent white
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000 // ensure it's above everything else
};

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
            try {
                const response = await fetch('/submitFormData', { // Use the correct URL of your Firebase function
                    method: 'POST',
                    // mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                console.info(response);

                if (response.ok) {
                    response.json().then(data => {
                        switch (data.applicationStatus) {
                            case 'PROCESSED':
                            case 'SUCCESS':
                                dispatch(updateCurrentStep(12));
                                navigate('/step-12'); // Navigate to the thank you page
                                break;
                            case 'REJECTED':
                                setSubmitError('The application has been rejected at this time.');
                                break;
                            case 'DUPLICATE':
                                setSubmitError('The application has already been submitted.');
                                break;
                            case 'LOGIN FAILED':
                                setSubmitError('Application couldn\'t be submitted at this time.');
                                break;
                            default:
                                setSubmitError('An unknown error occurred.');
                        }
                    });
                } else {
                    console.error('Failed to submit form data', response);
                    setSubmitError('Failed to submit form data');
                }
            } catch (error) {
                console.error('Error submitting form data:', error);
                setSubmitError('Error submitting form data');
            } finally {
                setIsLoading(false);
            }
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
            {isLoading && <div style={overlayStyle}>
                <CircularProgress />
            </div>} {/* Spinner */}
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
            <Typography variant="body2" color="textSecondary">
                Disclaimer: I understand that I am providing authorization to Special Financing Company, LLC under the Fair Credit Reporting Act, to obtain information from my personal credit profile. I authorize Special Financing Company, LLC to obtain such information solely to conduct a pre-qualification for credit.
            </Typography>
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