import {useEffect, useState} from "react";
import {
    POKEMON_API_POKEMON_URL,
} from "../constants";
import {pokeApi} from "../services/pokeApi";
import {PokemonDetails} from "../models";

interface UsePokemonProps {
    name: string | undefined;
}

export default function usePokemon({name}: UsePokemonProps) {
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

    return {
        pokemon,
        isLoading,
    };
};