import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import MultiStepForm from './components/MultiStepForm/MultiStepForm.js';
import FlipSecretsLogo from './images/flip_secrets_logo.png';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Footer from './components/Footer';
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // A medium green
    },
    secondary: {
      main: '#81C784', // A lighter green
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className="App">
            {/* <header className="App-header">
            <img className='App-logo' src={FlipSecretsLogo} alt="Flip Secrets Logo" />
            <h1>Financing Application</h1>
          </header> */}
            <AppBar position="static">
              <Toolbar>
                <img className='App-logo' src={FlipSecretsLogo} alt="Flip Secrets Logo" />
                {/* <Typography variant="h6" color="inherit" component="div">
                Financing Application
              </Typography> */}
              </Toolbar>
            </AppBar>
            <Routes>
              <Route path="/*" element={<MultiStepForm />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
