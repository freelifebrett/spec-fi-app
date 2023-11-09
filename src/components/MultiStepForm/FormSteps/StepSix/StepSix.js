import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePaymentDetails } from './formSlice'; // Update with your actual actions

const StepSix = () => {
  const dispatch = useDispatch();
  const paymentDetails = useSelector(state => state.form.paymentDetails);
  const [errors, setErrors] = useState({});

  // Example validations
  const validateBankName = (name) => name.length > 0;
  const validateAccountNumber = (number) => /^\d{8,12}$/.test(number);
  const validateRoutingNumber = (number) => /^\d{9}$/.test(number);
  const validateCardNumber = (number) => /^\d{16}$/.test(number);
  const validateCardCVV = (cvv) => /^\d{3,4}$/.test(cvv);
  const validateExpirationDate = (month, year) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
    const expYear = parseInt(year, 10);
    const expMonth = parseInt(month, 10);
    // Check if the expiration year is greater or if it's the same year but a later month
    return expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isValid = false;

    switch (name) {
      case 'bankName':
        isValid = validateBankName(value);
        break;
      case 'accountNumber':
        isValid = validateAccountNumber(value);
        break;
      case 'routingNumber':
        isValid = validateRoutingNumber(value);
        break;
      case 'cardNumber':
        isValid = validateCardNumber(value);
        break;
      case 'cardCVV':
        isValid = validateCardCVV(value);
        break;
      case 'cardExpMonth':
      case 'cardExpYear':
        // When updating month/year, revalidate them together
        const { cardExpMonth, cardExpYear } = paymentDetails;
        const monthToValidate = name === 'cardExpMonth' ? value : cardExpMonth;
        const yearToValidate = name === 'cardExpYear' ? value : cardExpYear;
        isValid = validateExpirationDate(monthToValidate, yearToValidate);
        break;
      default:
        break;
    }

    if (isValid) {
      dispatch(updatePaymentDetails({ ...paymentDetails, [name]: value }));
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: `Invalid ${name.replace('cardExp', '').replace('Month', ' month').replace('Year', ' year')}.` }));
    }
  };

  return (
    <div className="step-six-form">
      <h2>Step 6: Payment Details</h2>
      <form>
        {/* Bank Payment Information */}
        {/* ... same as before ... */}

        {/* Credit/Debit Card Information */}
        <h3>Payment Information (Card)</h3>
        {/* ... other card fields ... */}
        
        <div className="form-group">
          <label htmlFor="cardExpMonth">Expiration Month</label>
          <select
            id="cardExpMonth"
            name="cardExpMonth"
            value={paymentDetails.cardExpMonth}
            onChange={handleInputChange}
          >
            {/* Generate month options */}
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {`${i + 1}`.padStart(2, '0')}
              </option>
            ))}
          </select>
          {errors.cardExpMonth && <p className="error">{errors.cardExpMonth}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="cardExpYear">Expiration Year</label>
          <select
            id="cardExpYear"
            name="cardExpYear"
            value={paymentDetails.cardExpYear}
            onChange={handleInputChange}
          >
            {/* Generate year options */}
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          {errors.cardExpYear && <p className="error">{errors.cardExpYear}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="cardCVV">CVV</label>
          <input
            type="text"
            id="cardCVV"
            name="cardCVV"
            maxLength="4"
            value={paymentDetails.cardCVV}
            onChange={handleInputChange}
            placeholder="CVV"
          />
          {errors.cardCVV && <p className="error">{errors.cardCVV}</p>}
        </div>

        {/* Additional form elements or navigation buttons */}
      </form>
    </div>
  );
};

export default StepSix;
