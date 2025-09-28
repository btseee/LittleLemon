import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Little Lemon restaurant title', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/little lemon/i);
  expect(titleElements.length).toBeGreaterThanOrEqual(3); // Header, Hero, Footer (and possibly more)
});

test('renders reservation section', () => {
  render(<App />);
  const reservationHeadings = screen.getAllByText(/reserve a table/i);
  expect(reservationHeadings.length).toBeGreaterThan(0);
});

test('renders navigation links', () => {
  render(<App />);
  const homeLinks = screen.getAllByRole('link', { name: /home/i });
  const aboutLinks = screen.getAllByRole('link', { name: /about/i });
  const menuLinks = screen.getAllByRole('link', { name: /menu/i });
  
  expect(homeLinks).toHaveLength(2); // Header and footer
  expect(aboutLinks).toHaveLength(2); // Header and footer
  expect(menuLinks).toHaveLength(2); // Header and footer
});

test('renders booking form with all required fields', () => {
  render(<App />);
  
  const dateInput = screen.getByLabelText(/choose date/i);
  const timeSelect = screen.getByLabelText(/choose time/i);
  const guestsInput = screen.getByLabelText(/number of guests/i);
  const occasionSelect = screen.getByLabelText(/occasion/i);
  const submitButton = screen.getByRole('button', { name: /submit reservation request/i });
  
  expect(dateInput).toBeInTheDocument();
  expect(timeSelect).toBeInTheDocument();
  expect(guestsInput).toBeInTheDocument();
  expect(occasionSelect).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
