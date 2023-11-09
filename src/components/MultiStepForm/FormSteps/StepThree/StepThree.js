import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../redux/actions'; // replace with your actual action file path

const StepThree = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData); // replace with your actual state path
  const [localData, setLocalData] = useState({
    dob: formData.dob || '',
    ssn: formData.ssn || '',
  });
  const [errors, setErrors] = useState({});

  function validateDOB(dob) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;
    if (!regex.test(dob)) {
      return false; // Date does not match format
    }
    const [month, day, year] = dob.split('/').map(num => parseInt(num, 10));
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    return birthDate <= today && birthDate > new Date('1900-01-01');
  }
  

  const validateSSN = (ssn) => {
    const ssnPattern = /^(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
    return ssnPattern.test(ssn);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = {};

    if (!validateDOB(localData.dob)) {
      newErrors.dob = 'Invalid Date of Birth';
      formIsValid = false;
    }

    if (!validateSSN(localData.ssn)) {
      newErrors.ssn = 'Invalid Social Security Number';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      dispatch(updateFormData(localData));
      // Navigate to next step or submit the form
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLocalData({ ...localData, [id]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="dob">DOB (Required)</label>
        <input
          type="text"
          id="dob"
          value={localData.dob}
          onChange={handleInputChange}
          placeholder="MM/DD/YYYY"
        />
        {errors.dob && <p>{errors.dob}</p>}
      </div>

      <div>
        <label htmlFor="ssn">SSN (Required)</label>
        <input
          type="text"
          id="ssn"
          value={localData.ssn}
          onChange={handleInputChange}
          placeholder="XXX-XX-XXXX"
        />
        {errors.ssn && <p>{errors.ssn}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default StepThree;
