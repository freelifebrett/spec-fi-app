import { createSlice } from '@reduxjs/toolkit';
import FlipSecretsLogo from '../../images/cc_logo.png';
// Inside your formSlice.js



// const initialState = {
//   accountNumber: '',
//   accountType: '', // 'Checking' or 'Savings'
//   address: '',
//   averageIncome: '',
//   bankName: '',
//   cardBrand: '', // 'Visa', 'MasterCard', etc.
//   cardCVV: '',
//   cardExpMonth: '',
//   cardExpYear: '',
//   cardNumber: '',
//   city: '',
//   country: 'United States', // Default value set to United States  
//   dob: '',
//   email: '',
//   employerAddress: '',
//   employerCity: '', // Updated field
//   employerName: '',
//   employerPhone: '',
//   employerState: '', // Updated field
//   employerZipCode: '', // Updated field
//   employmentLength: '',
//   firstName: '',
//   housingPayment: '',
//   incomePeriod: '',
//   lastName: '',
//   middleName: '',
//   occupation: '',
//   ownOrRent: '',
//   password: '',
//   phoneNumber: '',
//   reference1FirstName: '',
//   reference1LastName: '',
//   reference1Phone: '',
//   reference1Relationship: '',
//   reference2FirstName: '',
//   reference2LastName: '',
//   reference2Phone: '',
//   reference2Relationship: '',
//   routingNumber: '',
//   ssn: '',
//   state: '', // consider using an abbreviation for states
//   timeAtAddress: '',
//   zipCode: '',
//   isApplicationSubmitted: false,
//   currentStep: 1,
//   primaryColor: '#000000',
//   secondaryColor: '#000000',
//   logoUrl: FlipSecretsLogo
// };


const initialState = {
  accountNumber: '123456789',
  accountType: 'Checking', // 'Checking' or 'Savings'
  address: '123 Main St',
  averageIncome: '5000',
  bankName: 'Test Bank',
  cardBrand: 'Visa', // 'Visa', 'MasterCard', etc.
  cardCVV: '123',
  cardExpMonth: '08',
  cardExpYear: '2025',
  cardNumber: '4111111111111111',
  city: 'Testville',
  confirmPassword: 'TestPassword123!',
  country: 'United States', // Default value set to United States  
  dob: '01/01/1980',
  email: 'test@example.com',
  employerAddress: '456 Second St',
  employerCity: 'Testville', // Updated field
  employerName: 'Test Employer',
  employerPhone: '123-456-7890',
  employerState: 'CA', // Updated field
  employerZipCode: '90001', // Updated field
  employmentLength: '3 years',
  firstName: 'John',
  housingPayment: '1200',
  incomePeriod: 'Monthly',
  lastName: 'Doe',
  middleName: 'Q',
  occupation: 'Developer',
  ownOrRent: 'Rent',
  password: 'TestPassword123!',
  phoneNumber: '1234567890',
  reference1FirstName: 'Jane',
  reference1LastName: 'Smith',
  reference1Phone: '234-567-8901',
  reference1Relationship: 'Friend',
  reference2FirstName: 'Emily',
  reference2LastName: 'Johnson',
  reference2Phone: '345-678-9012',
  reference2Relationship: 'Colleague',
  routingNumber: '987654321',
  ssn: '123456789',
  state: 'CA', // consider using an abbreviation for states
  timeAtAddress: '2 years',
  zipCode: '90001',
  currentStep: 1,
  primaryColor: '#000000',
  secondaryColor: '#000000',
  logoUrl: FlipSecretsLogo
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
    updateThemeColors(state, action) {
      const { primaryColor, secondaryColor } = action.payload;
      state.primaryColor = primaryColor;
      state.secondaryColor = secondaryColor;
    },
    updateLogoUrl(state, action) {
      state.logoUrl = action.payload;
    }
  },
});

export const { updateField, updateCurrentStep, updateLogoUrl, updateThemeColors } = formSlice.actions;
export default formSlice.reducer;
