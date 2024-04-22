import {PokemonDetails, type PokemonListData} from "../models";
import PokemonCard from "./PokemonCard";

type ListProps = {
    pokemons: PokemonDetails[];
}

export default function PokemonList({pokemons}: ListProps) {
    return (
        <>
            <h2>Pokémon List</h2>
            <div className="d-flex flex-wrap justify-content-between">
                {pokemons?.map((pokemon) => (
                    <PokemonCard key={pokemon.name} pokemon={pokemon}/>
                ))}
            </div>
        </>
    );
};

