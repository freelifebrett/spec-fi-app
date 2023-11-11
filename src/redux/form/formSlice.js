import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accountNumber: '',
    accountType: '', // 'Checking' or 'Savings'
    address: '',
    averageIncome: '',
    bankName: '',
    cardBrand: '', // 'Visa', 'MasterCard', etc.
    cardCVV: '',
    cardExpiryMonth: '',
    cardExpiryYear: '',
    cardNumber: '',
    city: '',
    confirmPassword: '',
    country: 'United States', // Default value set to United States
    currentStep: 1,
    dob: '',
    email: '',
    employerAddress: '',
    employerName: '',
    employmentLength: '',
    firstName: '',
    housingPayment: '',
    incomePeriod: '',
    lastName: '',
    middleName: '',
    occupation: '',
    ownOrRent: '',
    password: '',
    phoneNumber: '',
    reference1FirstName: '',
    reference1LastName: '',
    reference1Phone: '',
    reference1Relationship: '',
    reference2FirstName: '',
    reference2LastName: '',
    reference2Phone: '',
    reference2Relationship: '',
    routingNumber: '',
    ssn: '',
    state: '', // consider using an abbreviation for states
    timeAtAddress: '',
    zipCode: '',
};
  

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField(state, action) {
      // You can update a specific field based on the action payload
      const { fieldName, fieldValue } = action.payload;
      state[fieldName] = fieldValue;
    },
    updateCurrentStep(state, action) {
      // Update the currentStep based on the action payload
      state.currentStep = action.payload;
    },
    // Add more reducers as needed
  },
});

export const { updateField, updateCurrentStep } = formSlice.actions;
export default formSlice.reducer;
