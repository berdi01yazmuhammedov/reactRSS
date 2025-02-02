import{ Component } from 'react';
import Header from './components/Header';
import FetchRender from './FetchRender';
import ErrorBoundary from './components/ErrorBoundary';

type AppState = {
  searchTerm: string;
};

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  updateSearchTerm = (term: string) => {
    localStorage.setItem('searchTerm', term);
    this.setState({ searchTerm: term });
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <ErrorBoundary>
        <div className="app">
          <Header searchTerm={searchTerm} onSearch={this.updateSearchTerm} />
          <FetchRender searchTerm={searchTerm} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
