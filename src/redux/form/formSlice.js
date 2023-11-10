import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  address1: '',
  address2: '',
  city: '',
  state: '', // consider using an abbreviation for states
  zipCode: '',
  country: 'United States', // Default value set to United States
  bankName: '',
  accountNumber: '',
  routingNumber: '',
  accountType: '', // 'Checking' or 'Savings'
  cardNumber: '',
  cardBrand: '', // 'Visa', 'MasterCard', etc.
  cardExpiryMonth: '',
  cardExpiryYear: '',
  cardCVV: '',
  reference1FirstName: '',
  reference1LastName: '',
  reference1Phone: '',
  reference1Relationship: '',
  reference2FirstName: '',
  reference2LastName: '',
  reference2Phone: '',
  reference2Relationship: '',
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
