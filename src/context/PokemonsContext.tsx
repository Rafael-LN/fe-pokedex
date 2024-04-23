import React, {createContext, useContext, useEffect, useState} from "react";
import {POKEMON_API_POKEMON_URL, POKEMON_API_TYPE_URL} from "../constants";
import {pokeApi} from "../services/pokeApi";
import {
    IndexedPokemon,
    type PokemonComponent,
    PokemonDetails,
    PokemonListResponseType
} from "../models";

type PokemonContextType = {
    pokemons: PokemonDetails[],
    fetchNextPage: () => Promise<void>,
    hasMorePokemon: boolean,
    updatePokemonDetails: (pokemonName: string | undefined, caught: boolean, note?: string) => void,
    isPokedex: boolean,
    setIsPokedex: React.Dispatch<React.SetStateAction<boolean>>
    pokemonTypes: PokemonComponent[];
}

const PokemonContext = createContext<PokemonContextType>({
    pokemons: [],
    fetchNextPage: async () => {
    },
    hasMorePokemon: false,
    updatePokemonDetails: () => {
    },
    isPokedex: false,
    setIsPokedex: () => {
    },
    pokemonTypes: []
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
    const [pokemonTypes, setPokemonTypes] = useState<PokemonComponent[]>([]);


    useEffect(() => {
        fetchPokemon();
    }, []);

    useEffect(() => {
        if (isPokedex) {
            setHasMorePokemon(pokemons.filter(pokemon => pokemon.caught).length > 20);
        } else {
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

    const updatePokemonDetails = (pokemonName: string | undefined, caught: boolean, note?: string) => {
        // Find the Pokémon object with the given name
        const pokemonToUpdate = pokemons.find(pokemon => pokemon.name === pokemonName);

        if (pokemonToUpdate) {
            // Update the caught status of the Pokémon object
            const updatedPokemon: PokemonDetails = {
                ...pokemonToUpdate,
                caught,
                caughtDate: caught ? new Date() : undefined,
                note: note || '' // Set the note to the provided value or an empty string if not provided
            };

            // Update the state with the modified Pokémon object
            setPokemons(prevPokemons =>
                prevPokemons.map(pokemon =>
                    pokemon.name === pokemonName ? updatedPokemon : pokemon
                )
            );

            // Retrieve caughtPokemons from localStorage
            const storedCaughtPokemons = localStorage.getItem("caughtPokemons");
            const caughtPokemons: PokemonDetails[] = storedCaughtPokemons ? JSON.parse(storedCaughtPokemons) : [];

            if (!updatedPokemon.caught) {
                localStorage.setItem("caughtPokemons", JSON.stringify([...caughtPokemons.filter((caughtPokemon) => caughtPokemon.name !== updatedPokemon.name)]));
            } else if (updatedPokemon.note) {
                localStorage.setItem("caughtPokemons", JSON.stringify(
                    [...caughtPokemons
                        .map((caughtPokemon) => caughtPokemon.name === updatedPokemon.name ? updatedPokemon : caughtPokemon)
                    ]));
            } else {
                // Save the updated Pokémon object in localStorage
                localStorage.setItem("caughtPokemons", JSON.stringify([...caughtPokemons, updatedPokemon]));
            }
        }
    };


    useEffect(() => {
        const fetchPokemonTypes = async () => {
            try {
                const response = await fetch(POKEMON_API_TYPE_URL);
                if (response.ok) {
                    const data = await response.json();
                    setPokemonTypes(data.results);
                } else {
                    console.error('Failed to fetch Pokemon types');
                }
            } catch (error) {
                console.error('Error fetching Pokemon types:', error);
            }
        };

        fetchPokemonTypes();
    }, []);

    return {
        pokemons,
        fetchNextPage: fetchPokemon,
        hasMorePokemon,
        updatePokemonDetails,
        isPokedex,
        setIsPokedex,
        pokemonTypes
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