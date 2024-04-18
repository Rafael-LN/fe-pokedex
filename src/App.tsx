import React from 'react';
import './App.scss';
import {PokemonListContainer} from "./containers/ListContainer";

export function App() {
  return (
      <div className="container text-center">
        <h1>Welcome to the Pokémon App</h1>
        <PokemonListContainer />
      </div>
  );
}
