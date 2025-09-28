import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm', () => {
  const mockSubmitForm = jest.fn();
  const mockDispatch = jest.fn();
  const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  beforeEach(() => {
    mockSubmitForm.mockClear();
    mockDispatch.mockClear();
  });

  test('renders all form fields', () => {
    render(<BookingForm submitForm={mockSubmitForm} availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
    
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit reservation request/i })).toBeInTheDocument();
  });

  test('displays validation errors for empty required fields', async () => {
    render(<BookingForm submitForm={mockSubmitForm} availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
    
    const submitButton = screen.getByRole('button', { name: /submit reservation request/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
  });

  test('validates past dates', async () => {
    
    render(<BookingForm submitForm={mockSubmitForm} availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    const pastDate = '2023-01-01';
    
    fireEvent.change(dateInput, { target: { value: pastDate } });
    
    const submitButton = screen.getByRole('button', { name: /submit reservation request/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please select a future date/i)).toBeInTheDocument();
    });
  });

  test('validates guest count range', async () => {
    
    render(<BookingForm submitForm={mockSubmitForm} availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
    
    const guestsInput = screen.getByLabelText(/number of guests/i);
    
    // Test invalid low value
    fireEvent.change(guestsInput, { target: { value: '0' } });
    
    const submitButton = screen.getByRole('button', { name: /submit reservation request/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/number of guests must be between 1 and 10/i)).toBeInTheDocument();
    });
    
    // Test invalid high value
    fireEvent.change(guestsInput, { target: { value: '15' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/number of guests must be between 1 and 10/i)).toBeInTheDocument();
    });
  });

  test('successfully submits valid form data', async () => {
    
    render(<BookingForm submitForm={mockSubmitForm} availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
    
    // Fill out the form with valid data
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const futureDateString = futureDate.toISOString().split('T')[0];
    
    fireEvent.change(dateInput, { target: { value: futureDateString } });
    fireEvent.change(timeSelect, { target: { value: '19:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });
    fireEvent.change(occasionSelect, { target: { value: 'Anniversary' } });
    
    const submitButton = screen.getByRole('button', { name: /submit reservation request/i });
    fireEvent.click(submitButton);
    
    // Just wait a bit for async processing
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    expect(mockSubmitForm).toHaveBeenCalledWith({
      date: futureDateString,
      time: '19:00',
      guests: 4,
      occasion: 'Anniversary'
    });
  });

  test('clears errors when user starts typing', async () => {
    
    render(<BookingForm submitForm={mockSubmitForm} availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
    
    // Submit form to trigger errors
    const submitButton = screen.getByRole('button', { name: /submit reservation request/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
    });
    
    // Start typing in date field
    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: '2025-12-25' } });
    
    // Error should be cleared
    expect(screen.queryByText(/please select a date/i)).not.toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<BookingForm submitForm={mockSubmitForm} availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
    
    const form = screen.getByRole('form', { name: /table reservation form/i });
    expect(form).toBeInTheDocument();
    
    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput).toHaveAttribute('required');
    expect(dateInput).toHaveAttribute('type', 'date');
    
    const timeSelect = screen.getByLabelText(/choose time/i);
    expect(timeSelect).toHaveAttribute('required');
    
    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  test('displays available time options', () => {
    render(<BookingForm submitForm={mockSubmitForm} availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
    
    // Check for default option
    expect(screen.getByText('Select a time')).toBeInTheDocument();
    
    // Check for some available time options
    expect(screen.getByText('17:00')).toBeInTheDocument();
    expect(screen.getByText('19:00')).toBeInTheDocument();
  });

  test('disables submit button during submission', async () => {
    
    const slowSubmitForm = jest.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));
    render(<BookingForm submitForm={slowSubmitForm} availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
    
    // Fill out form with valid data
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];
    
    fireEvent.change(dateInput, { target: { value: futureDateString } });
    fireEvent.change(timeSelect, { target: { value: '19:00' } });
    
    const submitButton = screen.getByRole('button', { name: /submit reservation request/i });
    fireEvent.click(submitButton);
    
    // Button should be disabled and show loading text
    await waitFor(() => {
      expect(screen.getByText(/submitting/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('button')).toBeDisabled();
  });
});