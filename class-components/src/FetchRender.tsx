import { Component } from 'react';
import { fetchItems } from './api';
import CardList from './components/CardList';
import Spinner from './components/Spinner';

type State = {
  items: any[];
  loading: boolean;
  error: string | null;
};

class FetchRender extends Component<{}, State> {
  constructor(props: {}) {
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

  fetchData = async () => {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    try {
      this.setState({ loading: true, error: null });
      const items = await fetchItems(searchTerm);
      this.setState({ items, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to fetch data', loading: false });
    }
  };

  render() {
    const { items, loading, error } = this.state;
    if (loading) return <Spinner />;
    if (error) return <div className="error">{error}</div>;

    return <CardList items={items} />;
  }
}

export default FetchRender;
