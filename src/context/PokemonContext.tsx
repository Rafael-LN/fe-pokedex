import React, {createContext, useState} from "react";
import {PokemonList} from "../models";

export type PokemonContextProps = {
    pokemonList: PokemonList[]
}

type PokemonContextProviderProps = {
    children: React.ReactNode;
}

export const defaultValues: PokemonContextProps = {
    pokemonList: []
};

export const usePokemon = ():PokemonContextProps => {
    const [pokemonList, setPokemonList] = useState<PokemonList[]>([]);
    return {
        pokemonList
    }
}

const PokemonContext = createContext<PokemonContextProps>(defaultValues);

export function PokemonContextProvider({ children }: PokemonContextProviderProps) {
    const pokemonContext = usePokemon();

    return (
        <PokemonContext.Provider value={pokemonContext}>
            {children}
        </PokemonContext.Provider>
    );
};

export default PokemonContext;