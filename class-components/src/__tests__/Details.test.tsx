import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Details from '../pages/Details';
import { vi } from 'vitest';

vi.mock('../api', () => ({
    fetchRepoDetails: vi.fn().mockResolvedValue({
        id: 1,
        name: 'Repo1',
        full_name: 'user/Repo1',
        html_url: 'http://github.com/user/Repo1',
        description: 'A test repo',
        owner: { login: 'user', avatar_url: 'avatar.png' },
    }),
    fetchUserDetails: vi.fn().mockResolvedValue({
        id: 2,
        login: 'user2',
        avatar_url: 'avatar2.png',
        html_url: 'http://github.com/user2',
    }),
}));

describe('Details Component', () => {
    test('displays a loading indicator while fetching data', async () => {
        render(<Details searchTerm="someUser" detailsParam="1" onClose={vi.fn()} />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        await waitFor(() =>
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        );
    });

    test('displays detailed repo data correctly after loading', async () => {
        render(<Details searchTerm="someUser" detailsParam="1" onClose={vi.fn()} />);
        await waitFor(() =>
            expect(screen.getByText('user/Repo1')).toBeInTheDocument()
        );
        expect(screen.getByText('A test repo')).toBeInTheDocument();
        expect(screen.getByText(/visit repository/i)).toBeInTheDocument();
    });

    test('clicking the close button calls onClose', async () => {
        const onCloseMock = vi.fn();
        render(<Details searchTerm="someUser" detailsParam="1" onClose={onCloseMock} />);
        await waitFor(() =>
            expect(screen.getByText('user/Repo1')).toBeInTheDocument()
        );
        const closeButton = screen.getByText(/close/i);
        fireEvent.click(closeButton);
        expect(onCloseMock).toHaveBeenCalled();
    });
});
