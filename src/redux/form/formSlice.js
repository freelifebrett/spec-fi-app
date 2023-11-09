// src/redux/form/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // ...
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Auto-generated action creators...
  },
  extraReducers: {
    ['form/updateFirstName']: (state, action) => {
      state.stepOneData.firstName = action.payload;
    },
    // Handle other actions...
  },
});

export default formSlice.reducer;
