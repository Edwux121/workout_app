import React from 'react';
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Workouts.css"
import {Link} from "react-router";

function Workouts( {itemsPerPage = 20}) {
    const [originalData, setOriginalData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const fetchDataForPosts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/workoutapp/workouts`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                const postsData = await response.json();
                setOriginalData(postsData);
                setError(null);
            } catch (err) {
                setError(err.message);
                setOriginalData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchDataForPosts();
    }, []);

    // Update pagination when data or offset changes
    useEffect(() => {
        if (originalData.length > 0) {
            const endOffset = itemOffset + itemsPerPage;
            const slicedData = originalData.slice(itemOffset, endOffset);
            setCurrentData(slicedData);
            setPageCount(Math.ceil(originalData.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage, originalData]);

    // Handle page click
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    if (loading) {
        return (
            <div id="workouts">
                <h1>Workouts</h1>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div id="workouts">
                <h1>Wokrouts</h1>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            <div id="workouts">
                <h1>Workouts</h1>
                {originalData.length === 0 ? (
                    <p>No workouts found.</p>
                ) : (
                    <>
                        <p>Total workouts: {originalData.length}</p>
                        <ul>
                            {/*Combine workout.id with index of the page for unique key and display it*/}
                            {currentData.map((workout, index) => (
                                <li key={`${workout.id}-${itemOffset + index}`}>
                                    <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
                                    <hr/>
                                </li>
                            ))}
                        </ul>
                        {pageCount > 1 && (
                            <ReactPaginate
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="< Previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default Workouts;
