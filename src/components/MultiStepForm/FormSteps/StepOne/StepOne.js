import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from '../../../../redux/actions/formActions';

const StepOne = () => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.formData);
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
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
          onChange={handleChange}
          required
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <label htmlFor="middleName">Middle Name:</label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          value={formData.middleName || ''}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name (Required):</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName || ''}
          onChange={handleChange}
          required
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        {/* Navigation buttons or links to move between steps */}
        <button type="button" disabled={!canProceed}>Next</button>
      </form>
    </div>
  );
};

export default StepOne;
