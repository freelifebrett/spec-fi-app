import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from '../../../../reducers/formReducer';
import states from '../../../../constants/states';

const StepTwo = () => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.formData);
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = (name, value) => {
    let error = '';
    const trimmedValue = value.trim();
  
    switch (name) {
      case 'address':
        if (!trimmedValue) {
          error = 'Address is required';
        }
        // Add more complex address validation if necessary
        break;
      case 'city':
        if (!trimmedValue) {
          error = 'City is required';
        } else if (!/^[a-zA-Z\s]+$/i.test(trimmedValue)) {
          error = 'City should only contain letters and spaces';
        }
        break;
      case 'state':
        // Assuming state is a dropdown and a value is always selected
        break;
      case 'zipCode':
        if (!trimmedValue) {
          error = 'Zip Code is required';
        } else if (!/^\d{5}$/.test(trimmedValue)) {
          error = 'Zip Code must be 5 digits';
        }
        break;
      case 'ownOrRent':
        if (!trimmedValue) {
          error = 'Please select whether you own or rent your home';
        }
        break;
      case 'timeAtAddress':
        if (!trimmedValue) {
          error = 'Time at address is required';
        } else if (!/^\d+$/.test(trimmedValue) || parseInt(trimmedValue, 10) < 0 || parseInt(trimmedValue, 10) > 99) {
          error = 'Invalid number of years';
        }
        break;
      case 'housingPayment':
        if (!trimmedValue) {
          error = 'Housing payment is required';
        } else if (!/^\d+(\.\d{1,2})?$/.test(trimmedValue) || parseFloat(trimmedValue) < 0) {
          error = 'Invalid housing payment amount';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const stateSelectOptions = states.map(state => (
    <option key={state.abbreviation} value={state.abbreviation}>
      {state.name}
    </option>
  ));
  
  const timeAtAddressOptions = () => {
    const options = [];
  
    // Adding the '0 years' option for less than one year
    options.push(<option key={0} value="0">0 years (less than 1 year)</option>);
  
    // Adding options for 1 to 10 years
    for (let i = 1; i <= 10; i++) {
      options.push(<option key={i} value={String(i)}>{i} year{ i > 1 ? 's' : '' }</option>);
    }
  
    // Adding the '10+ years' option
    options.push(<option key="10+" value="10+">10+ years</option>);
  
    return options;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // Check if the form can proceed to the next step
  const canProceed = Object.values(errors).every(x => x === '') && 
    ['address', 'city', 'state', 'zipCode', 'ownOrRent', 'timeAtAddress', 'housingPayment']
      .every(field => formData[field] && formData[field].trim() !== '');

  return (
    <div>
      <h2>Step 2: Address Information</h2>
      <form>
        <label htmlFor="address">Address (Required):</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          required
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <label htmlFor="city">City (Required):</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city || ''}
          onChange={handleChange}
          required
        />
        {errors.city && <p className="error">{errors.city}</p>}

        {/* State dropdown can be implemented with select options or a dedicated component */}
        <label htmlFor="state">State (Required):</label>
        <select
          id="state"
          name="state"
          value={formData.state || ''}
          onChange={handleChange}
          required
        >
            {stateSelectOptions}
        </select>
        {errors.state && <p className="error">{errors.state}</p>}

        <label htmlFor="zipCode">Zip Code (Required):</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode || ''}
          onChange={handleChange}
          required
        />
        {errors.zipCode && <p className="error">{errors.zipCode}</p>}

        {/* Own or Rent dropdown */}
        <label htmlFor="ownOrRent">Own or Rent (Required):</label>
        <select
          id="ownOrRent"
          name="ownOrRent"
          value={formData.ownOrRent || ''}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="OWN">Own</option>
          <option value="RENT">Rent</option>
        </select>
        {errors.ownOrRent && <p className="error">{errors.ownOrRent}</p>}

        {/* Time at Address dropdown */}
        <label htmlFor="timeAtAddress">Time At Address (Required):</label>
        <select
          id="timeAtAddress"
          name="timeAtAddress"
          value={formData.timeAtAddress || ''}
          onChange={handleChange}
          required
        >
          {timeAtAddressOptions()}
        </select>
        {errors.timeAtAddress && <p className="error">{errors.timeAtAddress}</p>}

        <label htmlFor="housingPayment">Housing Payment (Required):</label>
        <input
          type="text"
          id="housingPayment"
          name="housingPayment"
          value={formData.housingPayment || ''}
          onChange={handleChange}
          required
        />
        {errors.housingPayment && <p className="error">{errors.housingPayment}</p>}

        {/* Navigation buttons or links to move between steps */}
        <button type="button" disabled={!canProceed}>Next</button>
      </form>
    </div>
  );
};

export default StepTwo;
