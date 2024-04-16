import React from 'react';
import './App.css';
import PokemonListContainer from "./containers/ListContainer";

const App: React.FC = () => {
  return (
      <div>
        <h1>Welcome to the Pokémon App</h1>
        <PokemonListContainer />
      </div>
  );
};

export default App;
