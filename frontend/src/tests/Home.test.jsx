// src/__tests__/Home.test.jsx
import { render, screen } from '@testing-library/react';
import Home from '../home';

test('renders "No Record Found" when todo list is empty', () => {
  render(<Home />);
  const noRecordText = screen.getByText(/No Record Found/i);
  expect(noRecordText).toBeInTheDocument();
});
