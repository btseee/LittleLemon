import { initializeTimes, updateTimes } from './bookingUtils';

describe('Booking utilities', () => {
  test('initializeTimes returns correct default times', () => {
    const times = initializeTimes();
    
    expect(times).toHaveLength(6);
    expect(times).toContain('17:00');
    expect(times).toContain('18:00');
    expect(times).toContain('19:00');
    expect(times).toContain('20:00');
    expect(times).toContain('21:00');
    expect(times).toContain('22:00');
  });

  test('updateTimes returns the same times regardless of date', () => {
    const initialState = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    
    const newTimes = updateTimes(initialState, {
      type: 'UPDATE_TIMES',
      payload: '2025-12-25'
    });
    
    expect(newTimes).toEqual(initialState);
  });

  test('updateTimes returns same state for unknown action', () => {
    const initialState = ['17:00', '18:00', '19:00'];
    
    const newTimes = updateTimes(initialState, {
      type: 'UNKNOWN_ACTION'
    });
    
    expect(newTimes).toEqual(initialState);
  });
});