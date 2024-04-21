import PokemonList from '../components/PokemonList';
import '../styles/Pagination.scss'
import {usePokemonContext} from "../context/PokemonsContext";
import {PokedexForm} from "../components/PokedexForm";
import {SearchProvider} from "../context/SearchContext";


export function PokemonListContainer() {
    const {pokemons, hasMorePokemon, fetchNextPage, isPokedex} = usePokemonContext();

    const filteredPokemons = isPokedex ? pokemons.filter(pokemon => pokemon.caught) : pokemons;

    return (
        <SearchProvider>
            {isPokedex && <PokedexForm/>}
            <PokemonList pokemons={filteredPokemons}/>
            {hasMorePokemon ? (
                <button className="btn btn-secondary mb-5" onClick={fetchNextPage}>
                    Load more Pokemon
                </button>
            ) : null}
        </SearchProvider>
    );
}
