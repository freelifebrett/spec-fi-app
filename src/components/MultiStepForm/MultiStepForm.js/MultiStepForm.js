import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StepOne from '../FormSteps/StepOne';
import StepTwo from '../FormSteps/StepTwo';
import StepThree from '../FormSteps/StepThree';
import StepFour from '../FormSteps/StepFour';
import StepFive from '../FormSteps/StepFive';
import StepSix from '../FormSteps/StepSix';
// ... import all other step components

const MultiStepForm = () => {
  return (
    <div className="multi-step-form">
      <h2>Form Overview</h2>
      <Routes>
        <Route path="/" element={<StepOne />} />
        <Route path="step-1" element={<StepOne />} />
        <Route path="step-2" element={<StepTwo />} />
        <Route path="step-3" element={<StepThree />} />
        <Route path="step-4" element={<StepFour />} />
        <Route path="step-5" element={<StepFive />} />
        <Route path="step-6" element={<StepSix />} />
      </Routes>
      {/* Navigation buttons are typically not needed here as each step would have its own navigation. */}
    </div>
  );
};

export default MultiStepForm;
