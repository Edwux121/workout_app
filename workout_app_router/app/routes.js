import {
    route,
    index,
} from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),  // This handles the "/" route
    route("/exercises", "Exercises/Exercises.jsx"),
    route("/workouts", "Workouts/Workouts.jsx"),
];
