import React, { useState } from 'react';
import { useStoredSearchTerm } from '../hooks/useStoredSearchTerm';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Header: React.FC = () => {
  const [storedSearchTerm, setStoredSearchTerm] = useStoredSearchTerm(
    'searchTerm',
    ''
  );
  const [inputValue, setInputValue] = useState(storedSearchTerm);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredSearchTerm(inputValue);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', '1');
    newParams.delete('details');
    navigate({ search: newParams.toString() });
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
