import { type PokemonList} from "../models";
import "../styles/List.scss";
import PokemonCard from "./PokemonCard";

type ListProps = {
    pokemons: PokemonList[];
}

export default function List({pokemons}: ListProps) {
    return (
        <>
            <h2>Pokémon List</h2>
            <div className={"list"}>
                {pokemons?.map((pokemon) => (
                    <PokemonCard pokemon={pokemon}/>
                ))}
            </div>
        </>
    );
};

