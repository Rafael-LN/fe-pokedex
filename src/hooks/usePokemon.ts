import {useEffect, useState} from "react";
import {
    POKEMON_API_POKEMON_URL,
} from "../constants";
import {pokeApi} from "../services/pokeApi";
import {PokemonDetails} from "../models";
import {usePokemonContext} from "../context/PokemonsContext";

export default function usePokemon(name: string | undefined) {
    const {markPokemonAsCaught, pokemons} = usePokemonContext(); // Access markPokemonAsCaught from usePokemons hook

    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (name) {
            fetchPokemon();
        }
    }, [name]);

    useEffect(() => {
        // Update caught status of the current pokemon if it exists in the context
        if (pokemon && pokemons.some(p => p.name === pokemon.name && p.caught)) {
            setPokemon(prevPokemon => prevPokemon ? { ...prevPokemon, caught: true } : null);
        }
    }, [pokemon, pokemons]);

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