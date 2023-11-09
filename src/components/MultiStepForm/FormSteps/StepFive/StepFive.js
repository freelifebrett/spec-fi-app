import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmploymentInfo } from './formSlice'; // Update with your actual path

const StepFive = () => {
    const dispatch = useDispatch();
    const employmentInfo = useSelector(state => state.form.employmentInfo);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'employerName':
                if (!value.trim()) error = 'Employer name is required.';
                break;
            case 'occupation':
                if (!value.trim()) error = 'Occupation/title is required.';
                break;
            case 'employerPhone':
                if (!/^\d{10}$/.test(value)) error = 'Invalid phone number. It must be 10 digits.';
                break;
            case 'employerAddress':
                if (!value.trim()) error = 'Employer address is required.';
                break;
            case 'city':
                if (!value.trim()) error = 'City is required.';
                break;
            case 'state':
                if (!/^[A-Za-z]{2}$/.test(value)) error = 'Invalid state abbreviation. It must be 2 characters.';
                break;
            case 'zipCode':
                if (!/^\d{5}$/.test(value)) error = 'Invalid zip code. It must be 5 digits.';
                break;
            case 'averageIncome':
                if (!value.trim() || isNaN(value) || Number(value) <= 0) {
                    error = 'Invalid average income. It must be a positive number.';
                }
                break;
            default:
                break;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (!error) {
            dispatch(updateEmploymentInfo({ [name]: value }));
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    return (
        <div className="step-five-form">
            <h2>Step 5: Income/Employment Information</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="employerName">Employer Name (Required)</label>
                    <input
                        type="text"
                        id="employerName"
                        name="employerName"
                        value={employmentInfo.employerName || ''}
                        onChange={handleChange}
                        placeholder="Enter your employer's name"
                    />
                    {errors.employerName && <p className="error">{errors.employerName}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="occupation">Occupation / Title (Required)</label>
                    <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={employmentInfo.occupation || ''}
                        onChange={handleChange}
                        placeholder="Enter your occupation or title"
                    />
                    {errors.occupation && <p className="error">{errors.occupation}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="employerPhone">Phone Number (Required)</label>
                    <input
                        type="text"
                        id="employerPhone"
                        name="employerPhone"
                        value={employmentInfo.employerPhone || ''}
                        onChange={handleChange}
                        maxLength="10"
                        placeholder="Enter your employer's phone number"
                    />
                    {errors.employerPhone && <p className="error">{errors.employerPhone}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="employerAddress">Employer Address (Required)</label>
                    <input
                        type="text"
                        id="employerAddress"
                        name="employerAddress"
                        value={employmentInfo.employerAddress || ''}
                        onChange={handleChange}
                        placeholder="Enter your employer's address"
                    />
                    {errors.employerAddress && <p className="error">{errors.employerAddress}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="city">City (Required)</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={employmentInfo.city || ''}
                        onChange={handleChange}
                        placeholder="Enter city"
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="state">State (Required)</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={employmentInfo.state || ''}
                        onChange={handleChange}
                        maxLength="2"
                        placeholder="Enter state abbreviation (e.g., CA)"
                    />
                    {errors.state && <p className="error">{errors.state}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="zipCode">Zip Code (Required)</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={employmentInfo.zipCode || ''}
                        onChange={handleChange}
                        placeholder="Enter zip code"
                    />
                    {errors.zipCode && <p className="error">{errors.zipCode}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="averageIncome">Average Income (Required)</label>
                    <input
                        type="text"
                        id="averageIncome"
                        name="averageIncome"
                        value={employmentInfo.averageIncome || ''}
                        onChange={handleChange}
                        placeholder="Enter your average income"
                    />
                    {errors.averageIncome && <p className="error">{errors.averageIncome}</p>}
                </div>

                {/* Additional form elements or navigation buttons */}
            </form>
        </div>
    );
};

export default StepFive;
