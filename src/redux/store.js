import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    // add other reducers here
  },
});

export default store;