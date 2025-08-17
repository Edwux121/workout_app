import express from "express";
import cors from "cors";
import { fetchData } from "./db.js";

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
