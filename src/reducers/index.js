// src/reducers/index.js
import { combineReducers } from 'redux';
import formReducer from './formReducer'; // Your form reducer

const rootReducer = combineReducers({
  form: formReducer,
  // other reducers go here
});

export default rootReducer;
