// src/components/Header.tsx
import React, { useState } from 'react';
import { useStoredSearchTerm } from '../hooks/useStoredSearchTerm';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useStoredSearchTerm('searchTerm', '');
  const [inputValue, setInputValue] = useState(searchTerm);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    // Reset page to 1 and remove any open details.
    searchParams.set('page', '1');
    searchParams.delete('details');
    navigate({ search: searchParams.toString() });
  };

  return (
    <header className="header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search GitHub username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
