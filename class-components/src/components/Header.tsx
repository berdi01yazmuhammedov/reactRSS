import { Component, ChangeEvent } from 'react';

type HeaderProps = {
  searchTerm: string;
  onSearch: (term: string) => void;
};

type HeaderState = {
  inputValue: string;
};

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      inputValue: props.searchTerm || '',
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearchClick = () => {
    const trimmed = this.state.inputValue.trim();
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <div className="header">
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="Search Input Field"
        />
        <button onClick={this.handleSearchClick} className='search-btn'>
          Search Button
        </button>
      </div>
    );
  }
}

export default Header;
