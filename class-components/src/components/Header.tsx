import React, { Component } from 'react';

type State = {
  searchTerm: string;
};

class Header extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  handleSearch = () => {
    const { searchTerm } = this.state;
    localStorage.setItem('searchTerm', searchTerm.trim());
    window.location.reload();
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    return (
      <div className="header">
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch} className='search-btn'>Search</button>
      </div>
    );
  }
}

export default Header;
