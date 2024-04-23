import {useEffect, useState} from "react";
import {PokemonListResponseType} from "../models";
import {POKEMON_API_POKEMON_URL} from "../constants";

export default function useAllPokemons() {
    const [allPokemonsCount, setAllPokemonsCount] = useState<number>(0);

    const fetchAllPokemons = async () => {
        // Fetch all Pokémon data from the API
        const allPokemonResponse = await fetch(POKEMON_API_POKEMON_URL);
        const {count} = await allPokemonResponse.json() as PokemonListResponseType;

        // Store all Pokémon data in state
        setAllPokemonsCount(count);
    };

    useEffect(() => {
        fetchAllPokemons();
    }, []);

    return allPokemonsCount;
}