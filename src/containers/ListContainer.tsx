import List from '../components/List';
import '../styles/Pagination.scss'
import usePokemons from "../hooks/usePokemons";


export function PokemonListContainer() {
    const {pokemons, hasMorePokemon, fetchNextPage} = usePokemons();

    return (
        <>
            <List pokemons={pokemons}/>
            {hasMorePokemon ? (
                <button className="btn btn-secondary" onClick={fetchNextPage}>
                    Load more Pokemon
                </button>
            ) : null}
        </>
    );
}
