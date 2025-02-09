import { Component } from 'react';
import { fetchItems } from './api';
import CardList from './components/CardList';
import Spinner from './components/Spinner';

type FetchRenderProps = {
  searchTerm: string;
};

type FetchRenderState = {
  items: any[];
  loading: boolean;
  error: string | null;
};

class FetchRender extends Component<FetchRenderProps, FetchRenderState> {
  constructor(props: FetchRenderProps) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: FetchRenderProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { searchTerm } = this.props;
    try {
      this.setState({ loading: true, error: null });
      const items = await fetchItems(searchTerm);
      this.setState({ items, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch data';
      this.setState({ error: errorMessage, loading: false });
    }
  };

  throwError = () => {
    throw new Error('Test error');
  };

  render() {
    const { items, loading, error } = this.state;
    const { searchTerm } = this.props;

    return (
      <div className="results-section">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="error">{error}</div>
        ) : items.length === 0 && searchTerm ? (
          <div className="no-results">No results found for "{searchTerm}"</div>
        ) : (
          <CardList items={items} />
        )}
        <div className="error-btn-container">
          <button onClick={this.throwError} className="error-btn">
            Error Button
          </button>
        </div>
      </div>
    );
  }
}

export default FetchRender;
