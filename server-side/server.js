// Purpose: Server-side code for the application.
import express from "express";
import cors from "cors";
import { getExercises } from "./db.js";

const app = express();
const port = 3000;

app.use(cors());

app.get("/exercises", async (req, res) => {
    try {
        const exercises = await getExercises();
        res.json(exercises);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
