import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // your initial state
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // define reducers as methods
    updateField(state, action) {
      // logic to update field
    },
    // more reducers...
  },
});

export const { updateField } = formSlice.actions;
export default formSlice.reducer;
