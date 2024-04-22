import React, {createContext, useContext, useEffect, useState} from "react";
import {POKEMON_API_POKEMON_URL, POKEMON_IMAGES_BASE_URL} from "../constants";
import {pokeApi} from "../services/pokeApi";
import {IndexedPokemon, PokemonDetails, PokemonListData, PokemonListResponseType} from "../models";

type PokemonContextType = {
    pokemons: PokemonDetails[],
    fetchNextPage: () => Promise<void>,
    hasMorePokemon: boolean,
    markPokemonAsCaught: (pokemonName: string) => void,
    isPokedex: boolean,
    setIsPokedex: React.Dispatch<React.SetStateAction<boolean>>
}

const PokemonContext = createContext<PokemonContextType>({
    pokemons: [],
    fetchNextPage: async () => {},
    hasMorePokemon: false,
    markPokemonAsCaught: () => {},
    isPokedex: false,
    setIsPokedex: () => {}
});

export const usePokemonContext = () => useContext(PokemonContext);

function usePokemons() {
    const [pokemons, setPokemons] = useState<PokemonDetails[]>(() => {
        const storedCaughtPokemons = window.localStorage.getItem("caughtPokemons");
        if (storedCaughtPokemons) {
            return JSON.parse(storedCaughtPokemons) as PokemonDetails[];
        }
        return [];
    });
    const [nextUrl, setNextUrl] = useState<string | null>(POKEMON_API_POKEMON_URL);
    const [isPokedex, setIsPokedex] = useState<boolean>(false);
    const [hasMorePokemon, setHasMorePokemon] = useState<boolean>(!!nextUrl);


    useEffect(() => {
        fetchPokemon();
    }, []);

    useEffect(() => {
        if (isPokedex) {
            setHasMorePokemon(pokemons.filter(pokemon => pokemon.caught).length > 20);
        }else {
            setHasMorePokemon(!!nextUrl);
        }
    }, [isPokedex]);

    const fetchPokemon = async () => {
        if (nextUrl) {
            const result = await pokeApi.get<PokemonListResponseType>(nextUrl);
            if (result?.data?.results) {
                const listPokemons = await Promise.all(result.data.results.map((p) =>
                    getPokemonDetails(p)
                ));

                setPokemons(prevPokemons => {
                    const mergedPokemons = listPokemons
                        .filter(pokemon => !prevPokemons.some(p => p.name === pokemon.name))
                        .map(pokemon => {
                        const caughtPokemon = prevPokemons.find(p => p.name === pokemon.name);
                        return caughtPokemon ?? pokemon;
                    });
                    return [...prevPokemons, ...mergedPokemons].sort((a, b) => a.id - b.id);
                });

                setNextUrl(result.data.next);
            }
        }
    };

    const getPokemonDetails = async ({url}: IndexedPokemon): Promise<PokemonDetails> => {
        const pokemonDetails = await pokeApi.get<PokemonDetails>(url);

        return {
            ...pokemonDetails.data,
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
        hasMorePokemon,
        markPokemonAsCaught,
        isPokedex,
        setIsPokedex,
    };
}

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