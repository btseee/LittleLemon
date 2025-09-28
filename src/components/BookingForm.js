import React, { useState, useReducer } from 'react';
import './BookingForm.css';
import { initializeTimes, updateTimes } from '../utils/bookingUtils';

const initialTimes = initializeTimes();

const BookingForm = ({ submitForm }) => {
  const [availableTimes, dispatch] = useReducer(updateTimes, initialTimes);
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'Birthday'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Validation functions
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }
    
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }
    
    if (formData.guests < 1 || formData.guests > 10) {
      newErrors.guests = 'Number of guests must be between 1 and 10';
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Update available times when date changes
    if (name === 'date') {
      dispatch({ type: 'UPDATE_TIMES', payload: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (submitForm) {
        submitForm(formData);
      }
      
      // Reset form on successful submission
      setFormData({
        date: '',
        time: '',
        guests: 1,
        occasion: 'Birthday'
      });
      
      alert('Booking confirmed! We look forward to seeing you.');
    } catch (error) {
      alert('There was an error with your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reservations" className="booking-section">
      <div className="booking-container">
        <h2 className="booking-title">Reserve a Table</h2>
        <form 
          className="booking-form" 
          onSubmit={handleSubmit}
          aria-label="Table reservation form"
          noValidate
        >
          <div className="form-group">
            <label htmlFor="res-date" className="form-label">
              Choose date *
            </label>
            <input
              type="date"
              id="res-date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={getTodayDate()}
              className={`form-input ${errors.date ? 'error' : ''}`}
              required
              aria-describedby={errors.date ? "date-error" : undefined}
            />
            {errors.date && (
              <span id="date-error" className="error-message" role="alert">
                {errors.date}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="res-time" className="form-label">
              Choose time *
            </label>
            <select
              id="res-time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className={`form-input ${errors.time ? 'error' : ''}`}
              required
              aria-describedby={errors.time ? "time-error" : undefined}
            >
              <option value="">Select a time</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time && (
              <span id="time-error" className="error-message" role="alert">
                {errors.time}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="guests" className="form-label">
              Number of guests *
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              min="1"
              max="10"
              className={`form-input ${errors.guests ? 'error' : ''}`}
              required
              aria-describedby={errors.guests ? "guests-error" : undefined}
            />
            {errors.guests && (
              <span id="guests-error" className="error-message" role="alert">
                {errors.guests}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="occasion" className="form-label">
              Occasion
            </label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
            aria-label="Submit reservation request"
          >
            {isSubmitting ? 'Submitting...' : 'Make Your Reservation'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;