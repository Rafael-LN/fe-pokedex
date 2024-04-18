import List from '../components/List';
import '../styles/Pagination.css'
import usePokemons from "../hooks/usePokemons";


export function PokemonListContainer() {
    const {pokemons, hasMorePokemon, fetchNextPage} = usePokemons();

    return (
        <>
            <List pokemons={pokemons}/>
            {hasMorePokemon ? (
                <button onClick={fetchNextPage}>
                    Load more Pokemon
                </button>
            ) : null}
        </>
    );
}
