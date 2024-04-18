import { type PokemonList} from "../models";
import "../styles/List.scss";
import {POKEBALL_IMAGE_URL} from "../constants";

type ListProps = {
    pokemons: PokemonList[];
}

export default function List({pokemons}: ListProps) {
    return (
        <>
            <h2>Pokémon List</h2>
            <div className={"list"}>
                {pokemons?.map((pokemon) => (
                    <div key={`${pokemon.name}-${pokemon.pokedexNumber}`} className={"item"}>
                        <img src={pokemon.image} alt={pokemon.name}/>
                        <span>{pokemon.name}</span> {pokemon.caught && <img
                        src={POKEBALL_IMAGE_URL}
                        alt={"poke-ball"}/>}
                    </div>
                ))}
            </div>
        </>
    );
};

