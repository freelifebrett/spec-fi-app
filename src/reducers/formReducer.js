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
        const { fieldName, value } = action.payload;
        console.info(fieldName, value);
        console.info(action)
        return {
          ...state,
          step1: {
            ...state.step1,
            ...action.payload
          }
        };
      // ... other cases
      default:
        return state;
    }
  };
  
  
  
  // Action Creators
  export const updateForm = (data) => ({
    type: UPDATE_FORM,
    payload: data,
  });

  export default formReducer;
  