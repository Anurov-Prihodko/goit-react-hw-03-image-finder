import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
// import shortid from 'shortid';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import { fetchImages, NUMBER_OF_PHOTOS } from './services/api';
import Button from './components/Button';

// import { fetchImages, NUMBER_OF_PHOTOS } from './services/api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    requestName: '',
    // imgArray: [],
    numPage: 1,
    loading: false,
    // image: null,
    // // error: false,
    // status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { requestName } = this.state;

    if (prevState.requestName !== requestName) {
      // console.log('Изменилось имя покемона');
      // console.log('prevProps:', prevState.requestName);
      // console.log('this.props.requestName:', this.state.requestName);
      this.setState({ loading: true });
      fetchImages(requestName)
        .then(response => response.hits)
        .then(images => this.setState({ images }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = requestName => {
    this.setState({ requestName });
    // this.setState({ loading: true });
    // fetchImages(requestName)
    //   .then(response => response.hits)
    //   .then(image => this.setState({ image }))
    //   .finally(() => this.setState({ loading: false }));
  };

  handleLoadMore = () => {
    this.setState(() => ({ numPage: this.state.numPage + 1 }));
  };

  render() {
    const { loading, images, requestName } = this.state;

    return (
      <div className="Container">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* <ImageGallery images={this.state.image} /> */}
        {loading && <h2>Loading...</h2>}
        {/* {images &&
          images.map(({ webformatURL, tags, id }) => (
            <img key={id} src={webformatURL} width="300" alt={tags} />
          ))} */}
        <ImageGallery images={images} />
        {!requestName && <h2>Enter your request</h2>}
        {/* <PokemonForm onSubmit={this.handleFormSubmit} />
        <PokemonInfo pokemonName={this.state.pokemonName} /> */}
        <Button onClick={this.handleLoadMore}>Load more</Button>
        <ToastContainer autoClose={3500} />
      </div>
    );
  }
}

export default App;
