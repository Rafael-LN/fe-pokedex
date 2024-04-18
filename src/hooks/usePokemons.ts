import {useEffect, useState} from "react";
import {POKEMON_API_POKEMON_URL, POKEMON_IMAGES_BASE_URL} from "../constants";
import {pokeApi} from "../services/pokeApi";
import {IndexedPokemon, PokemonList, PokemonListResponseType} from "../models";

const usePokemons = () => {
    const [pokemons, setPokemons] = useState<PokemonList[]>([]);
    const [nextUrl, setNextUrl] = useState<string | null>(POKEMON_API_POKEMON_URL);

    useEffect(() => {
        fetchPokemon();
    }, []);

    const fetchPokemon = async () => {
        if (nextUrl) {
            const result = await pokeApi.get<PokemonListResponseType>(nextUrl);
            if (result?.data?.results) {
                const listPokemons = result.data.results.map((p) =>
                    indexedPokemonToListPokemon(p)
                );
                setPokemons([...pokemons, ...listPokemons]);
                setNextUrl(result.data.next);
            }
        }
    };

    const indexedPokemonToListPokemon = (indexedPokemon: IndexedPokemon):PokemonList => {
        const pokedexNumber = parseInt(
            indexedPokemon.url
                .replace(`${POKEMON_API_POKEMON_URL}/`, "")
                .replace("/", "")
        );

        return {
            name: indexedPokemon.name,
            url: indexedPokemon.url,
            image: `${POKEMON_IMAGES_BASE_URL}/${pokedexNumber}.png`,
            pokedexNumber,
        };
    };

    return {
        pokemons,
        fetchNextPage: fetchPokemon,
        hasMorePokemon: !!nextUrl,
        setPokemons,
    };
};

export default usePokemons;
