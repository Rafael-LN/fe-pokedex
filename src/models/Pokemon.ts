type name = "hp"
    | "attack"
    | "defense"
    | "special-attack"
    | "special-defense"
    | "speed"

export type PokemonComponent = {
    name: string;
    url: string;
}

export type PokemonType = {
    slot: number;
};

export type PokemonStat = {
    base_stat: number;
    effort: number;
    stat: PokemonComponent
};

export type Sprites = {
    other: {
        "official-artwork": {
            front_default: string;
        };
    };
}

export type PokemonDetails = {
    id: number;
    name: string;
    types: PokemonType[];
    weight: number;
    height: number;
    sprites: Sprites;
    stats: PokemonStat[];
    color: string | null;
}

export type PokemonList = {
    name: string;
    url: string;
    image: string;
    pokedexNumber: number;
    caught?: boolean;
}
