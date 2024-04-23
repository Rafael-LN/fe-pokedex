import {PokemonDetails} from "../models";

export const savePokemonsInLocalStorage = (key: string, value: PokemonDetails[]) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getPokemonsFromLocalStorage = (key: string): PokemonDetails[] => {
    const storedPokemons = localStorage.getItem(key);
    return storedPokemons ? JSON.parse(storedPokemons) : [];
}