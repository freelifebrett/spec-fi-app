import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

const MultiStepForm = () => {
    const formData = useSelector((state) => state.form); // Adjust the path according to your store setup

    const totalSteps = 11; // Total number of steps    
    const progress = (formData.currentStep / totalSteps) * 100;

    return (
        <div className="multi-step-form">
            <h1>Financing Application</h1>
            <LinearProgressBar value={progress}/>
            <Routes>
                <Route path="/" element={<NameStep />} />
                <Route path="step-1" element={<NameStep />} />
                <Route path="step-2" element={<AddressStep />} />
                <Route path="step-3" element={<HousingStep />} />            
                <Route path="step-4" element={<ContactStep />} />
                <Route path="step-5" element={<IdentityStep />} />
                <Route path="step-6" element={<OccupationStep />} />
                <Route path="step-7" element={<EmployerStep />} />
                <Route path="step-8" element={<BankStep />} />
                <Route path="step-9" element={<CreditCardStep />} />
                <Route path="step-10" element={<ReferenceOneStep />} />
                <Route path="step-11" element={<ReferenceTwoStep />} />
            </Routes>
            {/* Navigation buttons are typically not needed here as each step would have its own navigation. */}
        </div>
    );
};

export default MultiStepForm;
