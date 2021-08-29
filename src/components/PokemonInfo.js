import { Component } from 'react';
import PokemonDataView from './PokemonDataView';
import PokemonErrorView from './PokemonErrorView';
import PokemonPendingView from './PokemonPendingView';
import pokemonAPI from '../services/api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });

      pokemonAPI
        .fetchPokemon(nextName)
        .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { pokemon, error, status } = this.state;
    const { pokemonName } = this.props;

    if (status === Status.IDLE) {
      return <div>Введите имя покемона</div>;
    }

    if (status === Status.PENDING) {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }

    if (status === Status.REJECTED) {
      return <PokemonErrorView message={error.message} />;
    }

    if (status === Status.RESOLVED) {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}
