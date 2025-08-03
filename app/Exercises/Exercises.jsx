import React from 'react';
import Popup from 'reactjs-popup';
import { useEffect, useState } from "react";
import './Exercises.css';
import ReactPaginate from "react-paginate";

function Exercises({ itemsPerPage = 10 }) { // Default to 10 items per page
    const [originalData, setOriginalData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    // Fetch data from API
    useEffect(() => {
        const fetchDataForPosts = async () => {
            try {
                console.log("Fetching exercises..."); // Debug log
                const response = await fetch(
                    `http://localhost:3000/workoutapp/exercises-with-categories`
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
            console.log(`Current page offset: ${itemOffset}, end offset: ${endOffset}`);
        }
    }, [itemOffset, itemsPerPage, originalData]);

    // Handle page click
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    if (loading) {
        return (
            <div id="exercises">
                <h1>Exercises</h1>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div id="exercises">
                <h1>Exercises</h1>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            <div id="exercises">
                <h1>Exercises</h1>
                {originalData.length === 0 ? (
                    <p>No exercises found.</p>
                ) : (
                    <>
                        <p>Total exercises: {originalData.length}</p>
                        <ul>
                            {/*Combine exercise.id with index of the page for unique key and display it*/}
                            {currentData.map((exercise, index) => (
                                <li key={`${exercise.id}-${itemOffset + index}`}>
                                    <Popup trigger=
                                               {<button> {exercise.name} </button>}
                                           modal nested>
                                        {
                                            close => (
                                                <div className='modal'>
                                                    <div className='content'>
                                                        <h3>{exercise.name}</h3>
                                                        <p>{exercise.description}</p>
                                                    </div>
                                                    <div>
                                                        <button onClick=
                                                                    {() => close()}>
                                                            Close modal
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Popup>
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

export default Exercises;
