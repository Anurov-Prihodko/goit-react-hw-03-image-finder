import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
// import shortid from 'shortid';
// import Container from './components/Container';

import PokemonForm from './components/PokemonForm';
import PokemonInfo from './components/PokemonInfo';

class App extends Component {
  state = {
    pokemonName: '',
  };

  handleFormSubmit = pokemonName => {
    this.setState({ pokemonName });
  };

  render() {
    return (
      // <Container>
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
        <PokemonForm onSubmit={this.handleFormSubmit} />
        <PokemonInfo pokemonName={this.state.pokemonName} />
        <ToastContainer autoClose={3500} />
      </div>

      // </Container>;
    );
  }
}

export default App;
