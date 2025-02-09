import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('retrieves the value from local storage upon mounting', () => {
        localStorage.setItem('searchTerm', 'storedUser');
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText(/search github username/i);
        expect(input).toHaveValue('storedUser');
    });

    test('clicking the search button saves the entered value to local storage', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText(/search github username/i);
        const button = screen.getByRole('button', { name: /search/i });
        fireEvent.change(input, { target: { value: 'newUser' } });
        fireEvent.click(button);
        expect(localStorage.getItem('searchTerm')).toBe('newUser');
    });
});
