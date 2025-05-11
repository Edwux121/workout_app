// Purpose: Server-side code for the application.
import express from "express";
import cors from "cors";
import { fetchData } from "./db.js";

const app = express();
const port = 3000;

app.use(cors());

app.get("/workoutapp", async (req, res) => {
    const tableName = req.query.tableName;
    try {
        const data = await fetchData(tableName);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
