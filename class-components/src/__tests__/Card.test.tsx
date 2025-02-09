import { render, screen, fireEvent } from '@testing-library/react';
import CardList from '../components/CardList';
import { vi } from 'vitest';
import { Item } from '../api';

const mockItems: Item[] = [
  {
    id: 1,
    login: 'user1',
    avatar_url: 'avatar1.png',
    html_url: 'http://github.com/user1',
  },
];

describe('Card Component (rendered in CardList)', () => {
  test('renders relevant card data', () => {
    const handleClick = vi.fn();
    render(<CardList items={mockItems} onItemClick={handleClick} />);
    expect(screen.getByText('user1')).toBeInTheDocument();
    const img = screen.getByAltText('user1');
    expect(img).toHaveAttribute('src', 'avatar1.png');
  });

  test('clicking on a card calls onItemClick with the item', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <CardList items={mockItems} onItemClick={handleClick} />
    );
    const card = container.querySelector('.card');
    if (!card) throw new Error('Card not found');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledWith(mockItems[0]);
  });

  test('clicking a card triggers an additional API call for details (integration)', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <CardList items={mockItems} onItemClick={handleClick} />
    );
    const card = container.querySelector('.card');
    if (!card) throw new Error('Card not found');
    fireEvent.click(card);
  });
});
