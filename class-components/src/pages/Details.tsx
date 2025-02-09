import React, { useState, useEffect } from 'react';
import {
  fetchRepoDetails,
  fetchUserDetails,
  Repository,
  GitHubUser,
} from '../api';
import Spinner from '../components/Spinner';

type DetailsProps = {
  searchTerm: string;
  detailsParam: string;
  onClose: () => void;
};

const Details: React.FC<DetailsProps> = ({
  searchTerm,
  detailsParam,
  onClose,
}) => {
  const [details, setDetails] = useState<Repository | GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        if (searchTerm) {
          const repoId = parseInt(detailsParam, 10);
          if (isNaN(repoId)) {
            throw new Error('Invalid repository ID');
          }
          const repoDetails = await fetchRepoDetails(repoId);
          setDetails(repoDetails);
        } else {
          const userDetails = await fetchUserDetails(detailsParam);
          setDetails(userDetails);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [searchTerm, detailsParam]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!details) {
    return null;
  }

  return (
    <div className="details">
      <button onClick={onClose}>Close</button>
      {'name' in details ? (
        <div>
          <h2>{details.full_name}</h2>
          <p>{details.description}</p>
          <a href={details.html_url} target="_blank" rel="noopener noreferrer">
            Visit Repository
          </a>
        </div>
      ) : (
        <div>
          <h2>{details.login}</h2>
          <img src={details.avatar_url} alt={details.login} width="100" />
          <a href={details.html_url} target="_blank" rel="noopener noreferrer">
            Visit Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Details;
