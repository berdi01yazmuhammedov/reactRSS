import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchItems, Item } from '../api';
import CardList from '../components/CardList';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { useStoredSearchTerm } from '../hooks/useStoredSearchTerm';
import Details from './Details';

const SearchPage: React.FC = () => {
  const [storedSearchTerm] = useStoredSearchTerm('searchTerm', '');
  const searchTerm = storedSearchTerm;

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const detailsParam = searchParams.get('details');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems(searchTerm, currentPage);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching data');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page.toString());
    newParams.delete('details');
    setSearchParams(newParams);
  };

  const handleItemClick = (item: Item) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if ('name' in item) {
      newParams.set('details', item.id.toString());
    } else {
      newParams.set('details', item.login);
    }
    setSearchParams(newParams);
  };

  const handleCloseDetails = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('details');
    setSearchParams(newParams);
  };

  const handleLeftSectionClick = () => {
    if (detailsParam) {
      handleCloseDetails();
    }
  };

  return (
    <div className="search-page" style={{ display: 'flex' }}>
      <div
        className="left-section"
        style={{ flex: 1 }}
        onClick={handleLeftSectionClick}
      >
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="error">{error}</div>
        ) : items.length === 0 && searchTerm ? (
          <div className="no-results">
            No results found for &quot;{searchTerm}&quot;
          </div>
        ) : (
          <>
            <CardList items={items} onItemClick={handleItemClick} />
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      {detailsParam && (
        <div
          className="right-section"
          style={{
            width: '40%',
            borderLeft: '1px solid #ccc',
            padding: '1rem',
          }}
        >
          <Details
            searchTerm={searchTerm}
            detailsParam={detailsParam}
            onClose={handleCloseDetails}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
