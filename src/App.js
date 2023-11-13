import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import MultiStepForm from './components/MultiStepForm/MultiStepForm.js';
import FlipSecretsLogo from './images/flip_secrets_logo.png';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjzrtyLcd_HLIonYrEV69maYVqoCB33Qc",
  authDomain: "spec-fi-app.firebaseapp.com",
  projectId: "spec-fi-app",
  storageBucket: "spec-fi-app.appspot.com",
  messagingSenderId: "900568801328",
  appId: "1:900568801328:web:cc138bb9d768f4a6e3cdf5",
  measurementId: "G-XD6B0LMEZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <img className='App-logo' src={FlipSecretsLogo} alt="Flip Secrets Logo" />
            <h1>The Flip Secrets Application</h1>
          </header>
          <Routes>
            <Route path="/*" element={<MultiStepForm />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
