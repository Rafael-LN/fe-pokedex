import React from 'react';
import './App.scss';
import {PokemonListContainer} from "./containers/ListContainer";

export function App() {
  return (
      <div className="App">
        <h1>Welcome to the Pokémon App</h1>
        <PokemonListContainer />
      </div>
  );
}
