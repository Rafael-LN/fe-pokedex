// containers/PokemonListContainer.tsx
import React, {useEffect, useState} from 'react';
import List from '../components/List';
import {getPokemon} from '../services/pokemonService';
import {PokemonList} from '../models';

const PokemonListContainer: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<PokemonList[]>([]);

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
        <List pokemons={pokemonList}/>
    );
};

export default PokemonListContainer;
