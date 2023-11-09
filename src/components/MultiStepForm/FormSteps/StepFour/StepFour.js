import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePhoneNumber, updateEmail } from './formSlice'; // Update with your actual path

const StepFour = () => {
  const dispatch = useDispatch();
  const phoneNumber = useSelector(state => state.form.phoneNumber);
  const email = useSelector(state => state.form.email);
  const [errors, setErrors] = useState({});

  const validatePhoneNumber = (number) => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handlePhoneNumberChange = (e) => {
    const number = e.target.value;
    if (validatePhoneNumber(number)) {
      dispatch(updatePhoneNumber(number));
      setErrors(prevErrors => ({ ...prevErrors, phoneNumber: '' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, phoneNumber: 'Invalid phone number.' }));
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (validateEmail(email)) {
      dispatch(updateEmail(email));
      setErrors(prevErrors => ({ ...prevErrors, email: '' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Invalid email address.' }));
    }
  };

  return (
    <div className="step-four-form">
      <h2>Step 4: Contact Information</h2>
      <form>
        <div className="form-group">
          <label htmlFor="phone-number">Phone Number (Required)</label>
          <input
            type="text"
            id="phone-number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            maxLength="10"
            placeholder="Enter your 10-digit phone number"
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address (Required)</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        {/* Additional form elements or navigation buttons */}
      </form>
    </div>
  );
};

export default StepFour;
