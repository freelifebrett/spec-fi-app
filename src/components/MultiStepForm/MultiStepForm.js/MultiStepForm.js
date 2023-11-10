import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StepOne from '../FormSteps/StepOne';
import StepTwo from '../FormSteps/StepTwo';
// ... import all other step components

const MultiStepForm = () => {
  return (
    <div className="multi-step-form">
      <h2>Form Overview</h2>
      <Routes>
        <Route path="/" element={<StepOne />} />
        <Route path="step-1" element={<StepOne />} />
        {/* <Route path="step-2" element={<StepTwo />} /> */}
        {/* Add Route components for additional steps */}
      </Routes>
      {/* Navigation buttons are typically not needed here as each step would have its own navigation. */}
    </div>
  );
};

export default MultiStepForm;
