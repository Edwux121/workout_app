import express from "express";
import cors from "cors";
import {fetchData, fetchDataWithId, fetchWorkoutDataWithId} from "./db.js";

const app = express();
const port = 3000;

app.use(cors());

app.get("/workoutapp/exercises-with-categories", async (req, res) => {
    try {
        const { fetchExercisesWithCategories } = await import('./db.js');
        const data = await fetchExercisesWithCategories();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/workoutapp/workouts", async (req, res) => {
    try {
        const { fetchData } = await import('./db.js');
        const data = await fetchData("workouts");
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/workoutapp/workouts/:id", async (req, res) => {
    try {
        const { fetchWorkoutDataWithId } = await import('./db.js');
        const { fetchDataWithId } = await import('./db.js');

        console.log('Received workout ID:', req.params.id);
        const workoutData = await fetchWorkoutDataWithId("workout_junction", [parseInt(req.params.id)]);
        console.log('Workout junction data:', workoutData);

        // Parse the comma-separated string into an array of integers
        const exerciseIds = workoutData[0].exercises_id
            .split(',')
            .map(id => parseInt(id.trim()));
        console.log('Exercise IDs:', exerciseIds);

        const exerciseData = await fetchDataWithId("exercises", exerciseIds);
        console.log('Exercise data:', exerciseData);

        res.json(exerciseData);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
