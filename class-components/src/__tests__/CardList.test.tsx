import { render, screen } from '@testing-library/react';
import CardList from '../components/CardList';
import { vi } from 'vitest';
import { Item } from '../api';

const mockItems: Item[] = [
    { id: 1, login: 'user1', avatar_url: 'avatar1.png', html_url: 'http://github.com/user1' },
    { id: 2, login: 'user2', avatar_url: 'avatar2.png', html_url: 'http://github.com/user2' },
];

describe('CardList Component', () => {
    test('renders the specified number of cards', () => {
        const handleClick = vi.fn();
        const { container } = render(<CardList items={mockItems} onItemClick={handleClick} />);
        expect(container.querySelectorAll('.card')).toHaveLength(2);
        expect(screen.getByText('user1')).toBeInTheDocument();
        expect(screen.getByText('user2')).toBeInTheDocument();
    });

    test('renders no cards if the items array is empty', () => {
        const handleClick = vi.fn();
        const { container } = render(<CardList items={[]} onItemClick={handleClick} />);
        expect(container.querySelectorAll('.card')).toHaveLength(0);
    });
});
