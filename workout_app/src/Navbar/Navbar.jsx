import React from 'react';
import './Navbar.css';

function Navbar(props) {
    return (
        <>
            <nav id="navbar">
                <div>
                    <a id="navbar-main">Workout App</a>
                    <div id="navbarSupportedContent">
                        <ul>
                            <li className="nav-item">
                                <a className="nav-link active" href={props.exercisesLink}>Exercises</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href={props.workoutsLink}>Workout
                                    Routines</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
