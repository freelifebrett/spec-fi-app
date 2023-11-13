import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     accountNumber: '',
//     accountType: '', // 'Checking' or 'Savings'
//     address: '',
//     averageIncome: '',
//     bankName: '',
//     cardBrand: '', // 'Visa', 'MasterCard', etc.
//     cardCVV: '',
//     cardExpMonth: '',
//     cardExpYear: '',
//     cardNumber: '',
//     city: '',
//     confirmPassword: '',
//     country: 'United States', // Default value set to United States
//     currentStep: 1,
//     dob: '',
//     email: '',
//     employerAddress: '',
//     employerName: '',
//     employmentLength: '',
//     firstName: '',
//     housingPayment: '',
//     incomePeriod: '',
//     lastName: '',
//     middleName: '',
//     occupation: '',
//     ownOrRent: '',
//     password: '',
//     phoneNumber: '',
//     reference1FirstName: '',
//     reference1LastName: '',
//     reference1Phone: '',
//     reference1Relationship: '',
//     reference2FirstName: '',
//     reference2LastName: '',
//     reference2Phone: '',
//     reference2Relationship: '',
//     routingNumber: '',
//     ssn: '',
//     state: '', // consider using an abbreviation for states
//     timeAtAddress: '',
//     zipCode: '',
// };
  
const initialState = {
    accountNumber: '123456789',
    accountType: 'Checking', // 'Checking' or 'Savings'
    address: '123 Main St',
    averageIncome: '5000',
    bankName: 'Bank of Example',
    cardBrand: 'Visa', // 'Visa', 'MasterCard', etc.
    cardCVV: '123',
    cardExpMonth: '12',
    cardExpYear: '2025',
    cardNumber: '4111111111111111',
    city: 'Example City',
    confirmPassword: 'Password123!',
    country: 'United States', // Default value set to United States
    currentStep: 1,
    dob: '1990-05-17',
    email: 'example@email.com',
    employerAddress: '456 Business Rd',
    employerName: 'Example Employer',
    employerCity: 'Example City', // Updated field
    employerState: 'CA', // Updated field
    employerZipCode: '12345', // Updated field
    employerPhone: "893-893-8999",
    employmentLength: '2 years',
    firstName: 'John',
    housingPayment: '1500',
    incomePeriod: 'Monthly',
    lastName: 'Doe',
    middleName: 'Q',
    occupation: 'Developer',
    ownOrRent: 'Own',
    password: 'Password123!',
    phoneNumber: '555-1234',
    reference1FirstName: 'Jane',
    reference1LastName: 'Smith',
    reference1Phone: '555-5678',
    reference1Relationship: 'friend',
    reference2FirstName: 'Mike',
    reference2LastName: 'Johnson',
    reference2Phone: '555-9012',
    reference2Relationship: 'colleague',
    routingNumber: '987654321',
    ssn: '123-45-6789',
    state: 'CA', // consider using an abbreviation for states
    timeAtAddress: '3',
    zipCode: '12345',
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
