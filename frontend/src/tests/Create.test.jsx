
import { render, screen, fireEvent } from '@testing-library/react';
import Create from '../Create';

test('allows user to type in task input', () => {
  render(<Create />);
  const input = screen.getByPlaceholderText(/Enter a Task/i);
  fireEvent.change(input, { target: { value: 'Test Task' } });
  expect(input.value).toBe('Test Task');
});

test('renders Add New Task button', () => {
  render(<Create />);
  const button = screen.getByRole('button', { name: /Add New Task/i });
  expect(button).toBeInTheDocument();
});

