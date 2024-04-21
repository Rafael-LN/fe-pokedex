import PokemonList from '../components/PokemonList';
import '../styles/Pagination.scss'
import {usePokemonContext} from "../context/PokemonsContext";


export function PokemonListContainer() {
    const {pokemons, hasMorePokemon, fetchNextPage, isPokedex} = usePokemonContext();

    const filteredPokemons = isPokedex ? pokemons.filter(pokemon => pokemon.caught) : pokemons;

    return (
        <>
            <PokemonList pokemons={filteredPokemons}/>
            {hasMorePokemon ? (
                <button className="btn btn-secondary mb-5" onClick={fetchNextPage}>
                    Load more Pokemon
                </button>
            ) : null}
        </>
    );
}
