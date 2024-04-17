import React from 'react';
import {usePagination} from "../context/PaginationContext";

export default function Pagination() {
    const { currentPage, setCurrentPage } = usePagination();

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous Page</button>
            <button onClick={nextPage}>Next Page</button>
        </div>
    );
}