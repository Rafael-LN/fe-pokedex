import axios from 'axios';
import {PokemonList} from '../models';
import {capitalize} from "../utils";

export const getPokemonList = async (limit: number = 30, offset: number = 0): Promise<PokemonList[]> => {
    /*if (pokemonCache[pokemonNameOrId]) {
        return pokemonCache[pokemonNameOrId];
    }*/

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const pokemonList = response.data.results;

        const pokemonDetailsPromises = pokemonList.map(async (pokemon: any) => {
            const detailsResponse = await axios.get(pokemon.url);
            const { name, sprites } = detailsResponse.data;
            const pictureUrl = sprites.front_default || ''; // Use the front default sprite URL or an empty string if not available
            return {
                name: capitalize(name),
                pictureUrl,
            };
        });

        return Promise.all(pokemonDetailsPromises);
    } catch (error) {
        throw new Error(`Failed to fetch Pokémon data`);
    }
};
