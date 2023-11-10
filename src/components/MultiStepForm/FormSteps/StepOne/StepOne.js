import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, updateCurrentStep } from '../../../../redux/form/formSlice';

const StepOne = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form); // Adjust the path according to your store setup

  const [errors, setErrors] = useState({});

  // Validation function
  const validate = (name, value) => {
    if ((name === 'firstName' || name === 'lastName') && !value.trim()) {
      return 'This field is required';
    } else if (value.trim() && !/^[a-zA-Z]+$/i.test(value.trim())) {
      return 'Only letters are allowed';
    }
    return '';
  };

  // Handle input changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validate(name, value);
    setErrors({ ...errors, [name]: errorMessage });
    dispatch(updateField({ fieldName: name, fieldValue: value }));
  };
  

  const handleSubmit = () => {
    // Validate form data, etc.
    // If validation passes, go to the next step
    dispatch(updateCurrentStep(2));
  };


  // Check if the form can proceed to the next step
  const canProceed = !errors.firstName && !errors.lastName && formData.firstName && formData.lastName;

  return (
    <div>
      <h2>Step 1: Personal Information</h2>
      <form>
        <label htmlFor="firstName">First Name (Required):</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName || ''}
          onChange={handleFieldChange}
          required
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <label htmlFor="middleName">Middle Name:</label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          value={formData.middleName || ''}
          onChange={handleFieldChange}
        />

        <label htmlFor="lastName">Last Name (Required):</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName || ''}
          onChange={handleFieldChange}
          required
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        {/* Navigation buttons or links to move between steps */}
        <button type="button" onClick={handleSubmit} disabled={!canProceed}>Next</button>
      </form>
    </div>
  );
};

export default StepOne;
