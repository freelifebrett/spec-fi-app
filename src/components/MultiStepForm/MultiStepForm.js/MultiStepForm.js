import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NameStep from '../FormSteps/NameStep';
import HousingStep from '../FormSteps/HousingStep';
import ContactStep from '../FormSteps/ContactStep';
import { useSelector } from 'react-redux';
import LinearProgressBar from '../../LinearProgressBar';
import AddressStep from '../FormSteps/AddressStep';
import OccupationStep from '../FormSteps/OccupationStep';
import EmployerStep from '../FormSteps/EmployerStep';
import BankStep from '../FormSteps/BankStep/BankStep';
import CreditCardStep from '../FormSteps/CreditCardStep';
import ReferenceOneStep from '../FormSteps/ReferenceOneStep';
import ReferenceTwoStep from '../FormSteps/ReferenceTwoStep';
import IdentityStep from '../FormSteps/IdentityStep';
import { Typography, Box } from '@mui/material';
import ThankYouStep from '../FormSteps/ThankYouStep';

const MultiStepForm = () => {
    const navigate = useNavigate();
    const formData = useSelector((state) => state.form); // Adjust the path according to your store setup
    const { currentStep } = useSelector((state) => state.form);

    const totalSteps = 11; // Total number of steps    
    const progress = (formData.currentStep / totalSteps) * 100;
    const stepNames = ["Name", "Contact", "Address", "Housing", "Identity", "Occupation", "Employer", "Credit/Debit Card", "Bank", "Reference One", "Reference Two"];

    React.useEffect(() => {
        // Assuming step URLs are like '/step-1', '/step-2', etc.
        const pathStepNumber = parseInt(window.location.pathname.split('-')[1]);
        if (pathStepNumber && pathStepNumber !== currentStep) {
            navigate(`/step-${currentStep}`);
        }
    }, [currentStep, navigate]);


    if (formData.isApplicationSubmitted) {
        return <ThankYouStep />;
    } else {
        return (
            <div className="multi-step-form">
                <Box>
                    <Typography className="header-title">
                        Financing Application: {stepNames[formData.currentStep - 1]}
                    </Typography>
                    <LinearProgressBar value={progress} />
                </Box>
                <Routes>
                    <Route path="/" element={<NameStep />} />
                    <Route path="step-1" element={<NameStep />} />
                    <Route path="step-2" element={<ContactStep />} />
                    <Route path="step-3" element={<AddressStep />} />
                    <Route path="step-4" element={<HousingStep />} />
                    <Route path="step-5" element={<IdentityStep />} />
                    <Route path="step-6" element={<OccupationStep />} />
                    <Route path="step-7" element={<EmployerStep />} />
                    <Route path="step-8" element={<CreditCardStep />} />
                    <Route path="step-9" element={<BankStep />} />
                    <Route path="step-10" element={<ReferenceOneStep />} />
                    <Route path="step-11" element={<ReferenceTwoStep />} />                     
                </Routes>
            </div>
        );
    }
};

export default MultiStepForm;
