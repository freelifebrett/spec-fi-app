import { UPDATE_FORM } from "../redux/actions/actionTypes";

const initialState = {
    step1: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: ''
    },
    step2: {
      address1: '',
      address2: '',
      city: '',
      state: '', // consider using an abbreviation for states
      zipCode: '',
      country: 'United States' // Default value set to United States
    },
    step3: {
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      accountType: '', // 'Checking' or 'Savings'
      cardNumber: '',
      cardBrand: '', // 'Visa', 'MasterCard', etc.
      cardExpiryMonth: '',
      cardExpiryYear: '',
      cardCVV: ''
    },
    step4: {
      reference1FirstName: '',
      reference1LastName: '',
      reference1Phone: '',
      reference1Relationship: '',
      reference2FirstName: '',
      reference2LastName: '',
      reference2Phone: '',
      reference2Relationship: ''
    }
  };
  
  // Reducer
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_FORM:
        const { step, data } = action.payload;
        return {
          ...state,
          [step]: {
            ...state[step],
            ...data
          }
        };
      // ... other cases
      default:
        return state;
    }
  };
  
  
  // Action Creators
  export const updateForm = (step, data) => ({
    type: UPDATE_FORM,
    payload: { step, data },
  });
  
  export default formReducer;
  