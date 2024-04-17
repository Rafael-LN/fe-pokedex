// containers/PokemonListContainer.tsx
import React, {Fragment, useEffect, useState} from 'react';
import List from '../components/List';
import {getPokemonList} from '../services/pokemonService';
import {PokemonList} from '../models';
import '../styles/Pagination.css'
import Pagination from "../components/Pagination";
import {usePagination} from "../context/PaginationContext";

const PAGE_SIZE = 20 as const;

export function PokemonListContainer() {
    const {currentPage} = usePagination();
    const [pokemonList, setPokemonList] = useState<PokemonList[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchPokemonData();
    }, [currentPage]); // Fetch data whenever currentPage changes

    const fetchPokemonData = async () => {
        try {
            const offset = (currentPage - 1) * PAGE_SIZE;
            const pokemonList = await getPokemonList(PAGE_SIZE, offset);
            const totalPages = Math.ceil(pokemonList.length / PAGE_SIZE);

            setPokemonList(pokemonList);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    };


    return (
        <Fragment>
            <List pokemons={pokemonList}/>
            <Pagination/>
        </Fragment>
    );
}
