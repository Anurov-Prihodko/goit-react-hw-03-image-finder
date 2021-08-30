import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
  state = {
    requestName: '',
  };

  handleNameChange = event => {
    this.setState({
      requestName: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.requestName.trim() === '') {
      return toast.error('Please enter a correct name!');
    }

    this.props.onSubmit(this.state.requestName);
    this.setState({ requestName: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">
              <ImSearch style={{ marginRight: 8 }} />
              Search
            </span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.requestName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
