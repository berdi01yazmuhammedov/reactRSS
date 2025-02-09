import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  test('calls onPageChange with the correct page number when buttons are clicked', () => {
    const onPageChangeMock = vi.fn();
    render(<Pagination currentPage={2} onPageChange={onPageChangeMock} />);
    const previousButton = screen.getByText(/previous/i);
    const nextButton = screen.getByText(/next/i);

    fireEvent.click(nextButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);

    fireEvent.click(previousButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });
});
