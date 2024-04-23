export type PokemonComponent = {
    name: string;
    url: string;
}

export type PokemonType = {
    slot: number;
    type: PokemonComponent;
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
    caught?: boolean;
    caughtDate?: Date;
    note?: string;
}

export type PokemonListData = {
    name: string;
    url: string;
    image: string;
    pokedexNumber: number;
    caught?: boolean;
}
