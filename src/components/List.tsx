import React, {Fragment} from 'react';
import Picture from './Picture';
import { type PokemonList} from "../models";
import "../styles/List.css";

type ListProps = {
    pokemons: PokemonList[];
}

const List: React.FC<ListProps> = ({pokemons}) => {
    return (
        <Fragment>
            <h2>Pokémon List</h2>
            <div className={"list"}>
                {pokemons.map((pokemon) => (
                    <div key={`k-${pokemon.name}`} className={"item"}>
                        <Picture url={pokemon.pictureUrl} alt={pokemon.name}/>
                        <span>{pokemon.name}</span> {pokemon.caught && <Picture
                        url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"}
                        alt={"poke-ball"}/>}
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default List;
