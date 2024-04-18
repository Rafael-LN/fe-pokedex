import axios from 'axios'
import {POKEMON_API_BASE_URL} from "../constants";

export const pokeApi = axios.create({
    baseURL: POKEMON_API_BASE_URL
});