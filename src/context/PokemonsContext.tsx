import React, {createContext, useContext, useEffect, useState} from "react";
import {POKEMON_API_POKEMON_URL, POKEMON_IMAGES_BASE_URL} from "../constants";
import {pokeApi} from "../services/pokeApi";
import {IndexedPokemon, PokemonListData, PokemonListResponseType} from "../models";

type PokemonContextType = {
    pokemons: PokemonListData[],
    fetchNextPage: () => Promise<void>,
    hasMorePokemon: boolean,
    markPokemonAsCaught: (pokemonName: string) => void
}

const PokemonContext = createContext<PokemonContextType>({
    pokemons: [],
    fetchNextPage: async () => {},
    hasMorePokemon: false,
    markPokemonAsCaught: () => {},
});

export const usePokemonContext = () => useContext(PokemonContext);

function usePokemons() {
    const [pokemons, setPokemons] = useState<PokemonListData[]>(() => {
        const storedCaughtPokemons = window.localStorage.getItem("caughtPokemons");
        if (storedCaughtPokemons) {
            return JSON.parse(storedCaughtPokemons) as PokemonListData[];
        }
        return [];
    });
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

                setPokemons(prevPokemons => {
                    const mergedPokemons = listPokemons
                        .filter(pokemon => !prevPokemons.some(p => p.name === pokemon.name))
                        .map(pokemon => {
                        const caughtPokemon = prevPokemons.find(p => p.name === pokemon.name);
                        return caughtPokemon ?? pokemon;
                    });
                    return [...prevPokemons, ...mergedPokemons].sort((a, b) => a.pokedexNumber - b.pokedexNumber);
                });

                setNextUrl(result.data.next);
            }
        }
    };

    const indexedPokemonToListPokemon = (indexedPokemon: IndexedPokemon): PokemonListData => {
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

    const markPokemonAsCaught = (pokemonName: string) => {
        // Find the Pokémon object with the given name
        const pokemonToCatch = pokemons.find(pokemon => pokemon.name === pokemonName);

        if (pokemonToCatch) {
            // Update the caught status of the Pokémon object to true
            const updatedPokemon = { ...pokemonToCatch, caught: true };

            // Update the state with the modified Pokémon object
            setPokemons(prevPokemons =>
                prevPokemons.map(pokemon =>
                    pokemon.name === pokemonName ? updatedPokemon : pokemon
                )
            );

            // Retrieve caughtPokemons from localStorage
            const storedCaughtPokemons = localStorage.getItem("caughtPokemons");
            const caughtPokemons = storedCaughtPokemons ? JSON.parse(storedCaughtPokemons) : [];

            // Save the caught Pokémon object in localStorage
            localStorage.setItem("caughtPokemons", JSON.stringify([...caughtPokemons, updatedPokemon]));
        }
    };

    return {
        pokemons,
        fetchNextPage: fetchPokemon,
        hasMorePokemon: !!nextUrl,
        markPokemonAsCaught,
    };
};

type PokemonProviderProps = {
    children: React.ReactNode;
}

export default function PokemonProvider({children}: PokemonProviderProps) {
    const pokemonState = usePokemons();

    return (
        <PokemonContext.Provider value={pokemonState}>
            {children}
        </PokemonContext.Provider>
    );
};