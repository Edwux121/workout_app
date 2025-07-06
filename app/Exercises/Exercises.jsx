import React from 'react';
import Popup from 'reactjs-popup';
import { useEffect, useState } from "react";
import Pagination from '../Pagination/Pagination';
import './Exercises.css';

function Exercises() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // You can make this configurable

    useEffect(() => {
        const fetchDataForPosts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/workoutapp/exercises-with-categories`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                let postsData = await response.json();
                setData(postsData);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDataForPosts();
    }, []);

    // Calculate pagination
    const totalItems = data ? data.length : 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data ? data.slice(startIndex, endIndex) : [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top of the exercises section when page changes
        document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div id="exercises">
            <h1>Exercises</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && (
                <>
                    <ul>
                        {currentItems.map((exercise) => (
                            <li key={exercise.id}>
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
                    
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        showInfo={true}
                    />
                </>
            )}
        </div>
    );
}

export default Exercises;
