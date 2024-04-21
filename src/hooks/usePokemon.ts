import {useEffect, useState} from "react";
import {
    POKEMON_API_POKEMON_URL,
} from "../constants";
import {pokeApi} from "../services/pokeApi";
import {PokemonDetails} from "../models";
import usePokemons from "./usePokemons";

export default function usePokemon(name: string | undefined) {
    const {markPokemonAsCaught} = usePokemons(); // Access markPokemonAsCaught from usePokemons hook

    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (name) {
            fetchPokemon();
        }
    }, [name]);

    const fetchPokemon = async () => {
        if (name) {
            setIsLoading(true);
            const url = `${POKEMON_API_POKEMON_URL}/${name}`;
            const result = await pokeApi.get<PokemonDetails>(url);
            if (result?.data) {
                setPokemon(result.data);
            }
            setIsLoading(false);
        }
    };

    const handleMarkAsCaught = () => {
        debugger
        if (pokemon) {
            markPokemonAsCaught(pokemon.name);
        }
    };

    return {
        pokemon,
        isLoading,
        handleMarkAsCaught
    };
};