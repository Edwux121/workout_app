import React from 'react';
import { Link } from 'react-router';
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
                                <Link className="nav-link active" to="/exercises">Exercises</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/workouts">Workouts</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
