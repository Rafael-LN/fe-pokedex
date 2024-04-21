import List from '../components/List';
import '../styles/Pagination.scss'
import {usePokemonContext} from "../context/PokemonsContext";

interface PokemonListContainerProps {
    pokedex?: boolean
}

export function PokemonListContainer({pokedex}: PokemonListContainerProps) {
    const {pokemons, hasMorePokemon, fetchNextPage} = usePokemonContext();

    console.log(pokemons)

    const filteredPokemons = pokedex ? pokemons.filter(pokemon => pokemon.caught) : pokemons;

    return (
        <>
            <List pokemons={filteredPokemons}/>
            {hasMorePokemon ? (
                <button className="btn btn-secondary mb-5" onClick={fetchNextPage}>
                    Load more Pokemon
                </button>
            ) : null}
        </>
    );
}
