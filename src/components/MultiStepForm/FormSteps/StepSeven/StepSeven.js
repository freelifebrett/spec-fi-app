import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReferences } from './formSlice'; // Update with your actual path

const StepSeven = () => {
  const dispatch = useDispatch();
  const references = useSelector((state) => state.form.references);
  const [errors, setErrors] = useState({});

  const validatePhoneNumber = (number) => {
    const regex = /^\d{10}$/;
    return regex.test(number.replace(/[\s-()]/g, ''));
  };

  const handleChange = (index, field, value) => {
    const updatedReferences = [...references];
    updatedReferences[index] = { ...updatedReferences[index], [field]: value };
    dispatch(updateReferences(updatedReferences));

    // Validate phone number format for reference
    if (field === 'phoneNumber' && !validatePhoneNumber(value)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [`reference${index + 1}PhoneNumber`]: 'Invalid phone number format. Use 5551234567.',
      }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [`reference${index + 1}PhoneNumber`]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the submission of the form data.
  };

  return (
    <div className="step-seven-form">
      <h2>Step 7: References</h2>
      <form onSubmit={handleSubmit}>
        {references.map((reference, index) => (
          <div key={`reference-${index}`}>
            <h3>Reference #{index + 1}</h3>
            <div className="form-group">
              <label htmlFor={`first-name-${index}`}>First Name (Required)</label>
              <input
                type="text"
                id={`first-name-${index}`}
                value={reference.firstName}
                onChange={(e) => handleChange(index, 'firstName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`last-name-${index}`}>Last Name (Required)</label>
              <input
                type="text"
                id={`last-name-${index}`}
                value={reference.lastName}
                onChange={(e) => handleChange(index, 'lastName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`phone-number-${index}`}>Phone Number (Required)</label>
              <input
                type="text"
                id={`phone-number-${index}`}
                value={reference.phoneNumber}
                onChange={(e) => handleChange(index, 'phoneNumber', e.target.value)}
                required
                placeholder="5551234567 (No Dashes)"
              />
              {errors[`reference${index + 1}PhoneNumber`] && (
                <p className="error">{errors[`reference${index + 1}PhoneNumber`]}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor={`relationship-${index}`}>Relationship (Required)</label>
              <select
                id={`relationship-${index}`}
                value={reference.relationship}
                onChange={(e) => handleChange(index, 'relationship', e.target.value)}
                required
              >
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="friend">Friend</option>
                <option value="colleague">Colleague</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => dispatch(/* dispatch previous step action */)}>
          Previous
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StepSeven;
