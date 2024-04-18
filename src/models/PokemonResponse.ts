// Define a common type for IndexedPokemon
export type IndexedPokemon = {
    name: string;
    url: string;
};

// Define a common type for IndexedPokemonByType
type IndexedPokemonByType = {
    pokemon: IndexedPokemon;
    slot: string;
};

// Define a common type for PokemonListResponse and PokemonByTypeListResponse
type PokemonListResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

// Define specific types by extending the common types
export type PokemonListResponseType = PokemonListResponse<IndexedPokemon>;

export type PokemonByTypeListResponseType = {
    id: number;
    pokemon: IndexedPokemonByType[];
};
