// containers/PokemonListContainer.tsx
import React, {useEffect, useState} from 'react';
import PokemonList from '../components/List';
import {PokemonContextProvider} from '../context/PokemonContext'; // Import the context and hook
import {getPokemon} from '../services/pokemonService';
import {Pokemon} from '../models';

const PokemonListContainer: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const pokemonNames = ['pikachu', 'bulbasaur', 'charmander']; // Example list of Pokémon names
                const pokemonDataPromises = pokemonNames.map(name => getPokemon(name)); // Pass cache functions to getPokemon
                const pokemonData = await Promise.all(pokemonDataPromises);
                setPokemonList(pokemonData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPokemonList();
    }, []); // Add cache functions to dependency array

    return (
        <PokemonList pokemons={pokemonList}/>
    );
};

export default PokemonListContainer;
