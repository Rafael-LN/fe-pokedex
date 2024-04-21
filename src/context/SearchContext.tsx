import React, { createContext, useContext, useState } from 'react';

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
});

// Custom hook to access the search context
export const useSearchContext = () => useContext(SearchContext);

// Provider component to wrap around the components that need access to search functionality
export function SearchProvider({ children }: SearchProviderProps) {
    const [nameFilter, setNameFilter] = useState<NameFilter>('');
    const [heightFilter, setHeightFilter] = useState<HeightFilter>('');
    const [typeFilter, setTypeFilter] = useState<TypeFilter>('');
    const [timestampFilter, setTimestampFilter] = useState<TimestampFilter>(new Date());

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
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}
