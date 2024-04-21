import React, {createContext, useContext, useEffect, useState} from 'react';
import type {PokemonComponent} from "../models";
import {POKEMON_API_TYPE_URL} from "../constants";

// Define types for individual search filters
type NameFilter = string;
type HeightFilter = string;
type TypeFilter = string;
type TimestampFilter = Date;

// Define types for context
type SearchContextType = {
    nameFilter: NameFilter;
    heightFilter: HeightFilter;
    typeFilter: TypeFilter;
    timestampFilter: TimestampFilter;
    setNameFilter: React.Dispatch<React.SetStateAction<NameFilter>>;
    setHeightFilter: React.Dispatch<React.SetStateAction<HeightFilter>>;
    setTypeFilter: React.Dispatch<React.SetStateAction<TypeFilter>>;
    setTimestampFilter: React.Dispatch<React.SetStateAction<TimestampFilter>>;
    pokemonTypes: PokemonComponent[];
};

type SearchProviderProps = {
    children: React.ReactNode;
}

// Create a context for managing search filters and sorting criteria
// Create a context for managing search filters
const SearchContext = createContext<SearchContextType>({
    nameFilter: '',
    heightFilter: '',
    typeFilter: '',
    timestampFilter: new Date(),
    setNameFilter: () => {},
    setHeightFilter: () => {},
    setTypeFilter: () => {},
    setTimestampFilter: () => {},
    pokemonTypes: []
});

// Custom hook to access the search context
export const useSearchContext = () => useContext(SearchContext);

// Provider component to wrap around the components that need access to search functionality
export function SearchProvider({ children }: SearchProviderProps) {
    const [nameFilter, setNameFilter] = useState<NameFilter>('');
    const [heightFilter, setHeightFilter] = useState<HeightFilter>('');
    const [typeFilter, setTypeFilter] = useState<TypeFilter>('');
    const [timestampFilter, setTimestampFilter] = useState<TimestampFilter>(new Date());
    const [pokemonTypes, setPokemonTypes] = useState<PokemonComponent[]>([]);

    useEffect(() => {
        const fetchPokemonTypes = async () => {
            try {
                const response = await fetch(POKEMON_API_TYPE_URL);
                if (response.ok) {
                    const data = await response.json();
                    setPokemonTypes(data.results);
                } else {
                    console.error('Failed to fetch Pokemon types');
                }
            } catch (error) {
                console.error('Error fetching Pokemon types:', error);
            }
        };

        fetchPokemonTypes();
    }, []);
    return (
        <SearchContext.Provider
            value={{
                nameFilter,
                heightFilter,
                typeFilter,
                timestampFilter,
                setNameFilter,
                setHeightFilter,
                setTypeFilter,
                setTimestampFilter,
                pokemonTypes
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}
