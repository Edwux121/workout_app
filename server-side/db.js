// Purpose: Establish connection to PostgreSQL database
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    user: "test",
    host: "localhost",
    database: "workout_app",
    password: "",
    port: 5432,
});

export const getExercises = async () => {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM exercises");
        return res.rows;
    } finally {
        client.release();
    }
};
