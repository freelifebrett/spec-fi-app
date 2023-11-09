import { UPDATE_STEP_ONE, UPDATE_FORM } from "../redux/actions/actionTypes";

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
      case UPDATE_STEP_ONE:
        // This is where you would update the fields for step 1 of the form.
        // The action.payload contains the new values for form fields that have changed.
        return {
          ...state, // spread the existing state
          step1: {
            ...state.step1, // spread the existing fields of step1
            ...action.payload // overwrite specific fields of step1 with new values from action.payload
          }
        };
        // action.payload might look like this: { firstName: 'John', lastName: 'Doe' }
        // after this case runs, state.step1 will be updated with these values.
  
      // cases for other actions...
      
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
  