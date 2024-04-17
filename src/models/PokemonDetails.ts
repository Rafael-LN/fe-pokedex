type name = "hp"
    | "attack"
    | "defense"
    | "special-attack"
    | "special-defense"
    | "speed"

type PokemonStats = {
    stat: name;
    effort: number;
    base_stat: number;
}

type PokemonType = {
    name: string;
}

export type PokemonDetails = {
    height: number;
    weight: number;
    stats: PokemonStats;
    types: PokemonType[];
    registerDate: Date;
}