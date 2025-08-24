import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function WorkoutJunction() {
    const { id } = useParams();
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const buildWorkout = async () => {
            try {
                const response = await fetch(`http://localhost:3000/workoutapp/workouts/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                const workoutData = await response.json();
                console.log('Received workout data:', workoutData);
                setWorkout(workoutData);
                setError(null);
            } catch (err) {
                setError(err.message);
                setWorkout(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            buildWorkout();
        }
    }, [id]);

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

    if (!workout) {
        return (
            <div id="exercises">
                <h1>Exercises</h1>
                <p>Workout not found</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Exercises</h1>
            <ul>
                {workout.map((exercise) => (
                    <li key={exercise.id}>
                        <p>{exercise.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WorkoutJunction;
