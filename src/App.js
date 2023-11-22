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
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateThemeColors, updateLogoUrl } from './redux/form/formSlice';
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





function App() {
  const dispatch = useDispatch();

  const themeColors = useSelector(state => ({ primary: state.form.primaryColor, secondary: state.form.secondaryColor }));
  const logoUrl = useSelector(state => state.form.logoUrl);

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Roboto', // The font you want to use
        '"Helvetica Neue"', // Fallback fonts
        'Arial',
        'sans-serif'
      ].join(','),
      // You can also define font size, weight, and other properties for different elements.
      h1: {
        fontSize: '2.5rem', // Example size for h1 elements
        fontWeight: 500, // Example weight for h1 elements
      },
      body1: {
        fontSize: '1rem', // Body text size
        fontWeight: 400,
      },
      button: {
        textTransform: 'none', // If you want to remove uppercase styling from buttons
      },
      // ... Add more styles for other text elements as needed
    },
    palette: {
      primary: {
        main: themeColors.primary, // A medium green
      },
      secondary: {
        main: themeColors.secondary, // A lighter green
      },
    },
  });


  const getSubdomain = () => {
    // const host = window.location.hostname;
    // return host.split('.')[0];

    return 'flipsecrets';
  };

  const fetchThemeAndLogo = async (subdomain) => {
    const db = getFirestore();
    const storage = getStorage();

    // Fetch theme colors from Firestore
    const docRef = doc(db, 'merchant', subdomain);
    const docSnap = await getDoc(docRef);

    let theme = { primaryColor: '#2E7D32', secondaryColor: '#81C784' };
    let logoUrl = '';

    if (docSnap.exists()) {
      const data = docSnap.data();
      theme = { primaryColor: data.primaryColor, secondaryColor: data.secondaryColor };

      // Construct logo URL from Firebase Storage
      const logoRef = ref(storage, `${subdomain}/logo.png`);
      logoUrl = await getDownloadURL(logoRef);
    }

    return { theme, logoUrl };
  };

  useEffect(() => {
    const subdomain = getSubdomain();
    fetchThemeAndLogo(subdomain).then(({ theme, logoUrl }) => {
      // Update theme and logo
      // This depends on your state management solution
      dispatch(updateTheme(theme));
      dispatch(updateLogoUrl(logoUrl));
    });
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppBar position="static">
              <Toolbar>
                <img className='App-logo' src={FlipSecretsLogo} alt="Flip Secrets Logo" />
              </Toolbar>
            </AppBar>
            <div className="form-container">
              <Routes>
                <Route path="/*" element={<MultiStepForm />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
