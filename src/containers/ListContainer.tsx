import PokemonList from '../components/PokemonList';
import '../styles/Pagination.scss'
import {usePokemonContext} from "../context/PokemonsContext";
import {PokedexForm} from "../components/PokedexForm";
import {SearchProvider, useSearchContext} from "../context/SearchContext";


export function PokemonListContainer() {
    const {pokemons, hasMorePokemon, fetchNextPage, isPokedex} = usePokemonContext();
    const { nameFilter, typeFilter, heightFilter, timestampFilter } = useSearchContext();

    const filteredPokemons = isPokedex ? pokemons.filter(pokemon => {
        if (pokemon.caught) {
            // Check if the Pokémon's name matches the name filter (if provided)
            if (nameFilter && !pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())) {
                return false;
            }

            // Check if the Pokémon's type matches the type filter (if provided)
            if (typeFilter && !pokemon.types.some((type) => type.type.name.toLowerCase() === typeFilter)) {
                return false;
            }

            // Check if the Pokémon's height is within the range specified by height filter (if provided)
            if (heightFilter && (pokemon.height < +heightFilter || pokemon.height > +heightFilter)) {
                return false;
            }

            // Check if the Pokémon's capture date is after the timestamp filter (if provided)
            if (timestampFilter && pokemon.caughtDate && pokemon.caughtDate < timestampFilter) {
                return false;
            }

            // Return true if the Pokémon passes all filters
            return true;
        }
        return false;
    }) : pokemons;

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
