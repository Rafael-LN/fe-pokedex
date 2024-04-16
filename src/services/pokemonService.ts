// services/pokemonService.ts
import axios from 'axios';
import {PokemonList} from '../models';

//export const getPokemon = async (pokemonNameOrId: string, pokemonCache: Record<string, Pokemon>, setPokemonCache: React.Dispatch<React.SetStateAction<Record<string, Pokemon>>>): Promise<Pokemon> => {
export const getPokemon = async (pokemonNameOrId: string): Promise<PokemonList> => {
    /*if (pokemonCache[pokemonNameOrId]) {
        return pokemonCache[pokemonNameOrId];
    }*/

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
        // Update the cache
        /*setPokemonCache(prevCache => ({
            ...prevCache,
            [pokemonNameOrId]: pokemon,
        }));*/

        return {
            name: response.data.name,
            pictureUrl: response.data.sprites.front_default,
        };
    } catch (error) {
        throw new Error(`Failed to fetch Pokemon data for ${pokemonNameOrId}`);
    }
};
