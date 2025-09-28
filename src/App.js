import React, { useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import { initializeTimes, updateTimes } from './utils/bookingUtils';

function App() {
  // Manage available times from parent component
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  const submitForm = (formData) => {
    // In a real application, this would send data to a server
    console.log('Booking submitted:', formData);
    return true;
  };

  return (
    <div className="App">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <BookingForm 
          submitForm={submitForm} 
          availableTimes={availableTimes}
          dispatch={dispatch}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
