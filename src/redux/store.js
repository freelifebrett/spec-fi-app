import { configureStore } from '@reduxjs/toolkit';
import formReducer from './form/formSlice';

const store = configureStore({
  reducer: {
    form: formReducer, // Add your form slice reducer
  },
});

export default store;
