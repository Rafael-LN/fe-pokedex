import List from '../components/List';
import '../styles/Pagination.scss'
import usePokemons from "../hooks/usePokemons";


interface PokemonListContainerProps {
    pokedex?: boolean
}

export function PokemonListContainer({pokedex}: PokemonListContainerProps) {
    const {pokemons, hasMorePokemon, fetchNextPage} = usePokemons({pokedex : pokedex});

    return (
        <>
            <List pokemons={pokemons}/>
            {hasMorePokemon ? (
                <button className="btn btn-secondary mb-5" onClick={fetchNextPage}>
                    Load more Pokemon
                </button>
            ) : null}
        </>
    );
}
