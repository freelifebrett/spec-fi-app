import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import MultiStepForm from './components/MultiStepForm/MultiStepForm.js';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Multi-Step Form</h1>
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
