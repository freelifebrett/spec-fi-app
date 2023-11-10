import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../reducers/formReducer';

const store = configureStore({
  reducer: {
    form: formReducer,
    // add other reducers here
  },
});

export default store;