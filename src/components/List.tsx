import { type PokemonList} from "../models";
import PokemonCard from "./PokemonCard";

type ListProps = {
    pokemons: PokemonList[];
}

export default function List({pokemons}: ListProps) {
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

