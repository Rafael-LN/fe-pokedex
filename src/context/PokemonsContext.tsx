import React, {createContext, useContext, useEffect, useState} from "react";
import {POKEMON_API_POKEMON_URL, POKEMON_API_TYPE_URL} from "../constants";
import {pokeApi} from "../services/pokeApi";
import {
    IndexedPokemon,
    type PokemonComponent,
    PokemonDetails,
    PokemonListResponseType
} from "../models";
import {getPokemonsFromLocalStorage, savePokemonsInLocalStorage} from "../utils";

type PokemonContextType = {
    pokemons: PokemonDetails[],
    fetchNextPage: () => Promise<void>,
    hasMorePokemon: boolean,
    updatePokemonDetails: (pokemonName: string | undefined, caught: boolean, note?: string) => void,
    isPokedex: boolean,
    setIsPokedex: React.Dispatch<React.SetStateAction<boolean>>
    pokemonTypes: PokemonComponent[];
    allPokemonsCount: number;
}

type PokemonProviderProps = {
    children: React.ReactNode;
}

const PokemonContext = createContext<PokemonContextType>({
    pokemons: [],
    fetchNextPage: async () => {},
    hasMorePokemon: false,
    updatePokemonDetails: () => {},
    isPokedex: false,
    setIsPokedex: () => {},
    pokemonTypes: [],
    allPokemonsCount: 0
});

export const usePokemonContext = () => useContext(PokemonContext);

function usePokemons() {
    const [pokemons, setPokemons] = useState<PokemonDetails[]>(
        () => getPokemonsFromLocalStorage("caughtPokemons")
     );
    const [nextUrl, setNextUrl] = useState<string | null>(POKEMON_API_POKEMON_URL);
    const [isPokedex, setIsPokedex] = useState<boolean>(false);
    const [pokemonTypes, setPokemonTypes] = useState<PokemonComponent[]>([]);
    const [allPokemonsCount, setAllPokemonsCount] = useState<number>(0);


    useEffect(() => {
        fetchPokemon();
    }, []);

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
                setAllPokemonsCount(result.data.count);
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
            const storedCaughtPokemons = getPokemonsFromLocalStorage("caughtPokemons");

            if (!updatedPokemon.caught) {
                savePokemonsInLocalStorage(
                    "caughtPokemons",
                    [...storedCaughtPokemons
                        .filter(
                            (caughtPokemon) =>
                                caughtPokemon.name !== updatedPokemon.name
                        )
                    ]);
            } else if (updatedPokemon.note) {
                savePokemonsInLocalStorage("caughtPokemons",
                    [...storedCaughtPokemons
                        .map(
                            (caughtPokemon) =>
                                caughtPokemon.name === updatedPokemon.name ? updatedPokemon : caughtPokemon
                        )
                    ]);
            } else {
                savePokemonsInLocalStorage("caughtPokemons", [...storedCaughtPokemons, updatedPokemon]);
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
        hasMorePokemon: !!nextUrl,
        updatePokemonDetails,
        isPokedex,
        setIsPokedex,
        pokemonTypes,
        allPokemonsCount
    };
}

export default function PokemonProvider({children}: PokemonProviderProps) {
    const pokemonState = usePokemons();

    return (
        <PokemonContext.Provider value={pokemonState}>
            {children}
        </PokemonContext.Provider>
    );
};