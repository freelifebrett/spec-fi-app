import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StepOne from '../FormSteps/StepOne';
import StepTwo from '../FormSteps/StepTwo';
import StepThree from '../FormSteps/StepThree';
import StepFour from '../FormSteps/StepFour';
import StepFive from '../FormSteps/StepFive';
import StepSix from '../FormSteps/StepSix';
import StepSeven from '../FormSteps/StepSeven';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

const BorderLinearProgress = styled(LinearProgressWithLabel)(({ theme }) => ({
    height: 20,
    borderRadius: 10,
  }));

function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }


const MultiStepForm = () => {
    const formData = useSelector((state) => state.form); // Adjust the path according to your store setup

    const totalSteps = 7; // Total number of steps    
    const progress = (formData.currentStep / totalSteps) * 100;

    return (
        <div className="multi-step-form">
            <BorderLinearProgress value={progress}/>

            <Routes>
                <Route path="/" element={<StepOne />} />
                <Route path="step-1" element={<StepOne />} />
                <Route path="step-2" element={<StepTwo />} />
                <Route path="step-3" element={<StepThree />} />
                <Route path="step-4" element={<StepFour />} />
                <Route path="step-5" element={<StepFive />} />
                <Route path="step-6" element={<StepSix />} />
                <Route path="step-7" element={<StepSeven />} />
            </Routes>
            {/* Navigation buttons are typically not needed here as each step would have its own navigation. */}
        </div>
    );
};

export default MultiStepForm;
