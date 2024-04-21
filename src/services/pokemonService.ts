import {PokemonListData} from '../models';
import {capitalize} from "../utils";
import {pokeApi} from "./pokeApi";

export const getPokemonList = async (limit: number = 30, offset: number = 0): Promise<PokemonListData[]> => {
    /*if (pokemonCache[pokemonNameOrId]) {
        return pokemonCache[pokemonNameOrId];
    }*/

    try {
        const response = await pokeApi.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const pokemonList = response.data.results;

        const pokemonDetailsPromises = pokemonList.map(async (pokemon: any) => {
            const detailsResponse = await pokeApi.get(pokemon.url);
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
