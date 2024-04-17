import React, { createContext, useContext, useState } from 'react';

type PaginationContextType = {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

type PaginationContextProviderProps = {
    children: React.ReactNode;
}

const PaginationContext = createContext<PaginationContextType | null>(null);

export function usePagination() {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error('usePagination must be used within a PaginationProvider');
    }
    return context;
};

export function PaginationProvider({ children }: PaginationContextProviderProps) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <PaginationContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </PaginationContext.Provider>
    );
};
