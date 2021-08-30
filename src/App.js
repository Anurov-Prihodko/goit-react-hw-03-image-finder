import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
// import shortid from 'shortid';
// import PokemonForm from './components/PokemonForm';
// import PokemonInfo from './components/PokemonInfo';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
// import { fetchImages, NUMBER_OF_PHOTOS } from './services/api';

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
    imgArray: [],
    numPage: 1,
    loading: false,
    // image: null,
    // // error: false,
    // status: Status.IDLE,
  };

  // getImages = (requestName, numPage) => {
  //   fetchImages(requestName, numPage)
  //     .then(images => {
  //       this.setState({ imgArray: images.hits, status: Status.RESOLVED });
  //     })
  //     .catch(error => this.setState({ error, status: Status.REJECTED }));
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.requestName !== this.state.requestName) {
  //     console.log('Изменилось имя покемона');
  //     console.log('prevProps:', prevState.requestName);
  //     console.log('this.props.requestName:', this.state.requestName);

  //     fetchImages(this.state.requestName)
  //       .then(response => response.hits)
  //       .then(console.log);
  //     // .finally(() => this.setState({ loading: false }));
  //   }
  // }

  handleFormSubmit = requestName => {
    this.setState({ requestName });
    this.setState({ loading: true });
    // fetchImages(requestName)
    //   .then(response => response.hits)
    //   .then(image => this.setState({ image }))
    //   .finally(() => this.setState({ loading: false }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* <ImageGallery images={this.state.image} /> */}
        {this.state.loading && <h2>Loading...</h2>}
        {this.state.image && (
          <img
            src={this.state.image[3].webformatURL}
            alt={this.state.image[3].tags}
          />
        )}
        <ImageGallery requestName={this.state.requestName} />
        {/* <PokemonForm onSubmit={this.handleFormSubmit} />
        <PokemonInfo pokemonName={this.state.pokemonName} /> */}
        <ToastContainer autoClose={3500} />
      </>
    );
  }
}

export default App;

// componentDidUpdate(prevProps, prevState) {
//   const prevName = prevProps.requestName;
//   const nextName = this.props.requestName;
//   // console.log(this.state.requestName);
//   // fetch(
//   //   `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.state.requestName}&page=${this.state.numPage}&per_page=12&key=${API_KEY}`,
//   // )
//   //   .then(response => response.json())
//   //   .then(response => response.hits)
//   //   .then(image => this.setState({ image }))
//   //   .finally(() => this.setState({ loading: false }));
// }
