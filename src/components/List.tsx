import React from 'react';
import Picture from './Picture';
import { Pokemon } from "../models";
import "../styles/List.css";

interface ListProps {
    pokemons: Pokemon[];
}

const List: React.FC<ListProps> = ({ pokemons }) => {
    return (
        <div>
            <h2>Pokémon List</h2>
            <ul>
                {pokemons.map((pokemon, index) => (
                    <li key={index}>
                        <div className={"item"}>
                            <Picture url={pokemon.pictureUrl} alt={pokemon.name} />
                            <span>{pokemon.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
