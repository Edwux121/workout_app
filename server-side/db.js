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

const allowedTables = ['exercises', 'workouts'];

export const fetchData = async (tableName) => {
    if (!allowedTables.includes(tableName)) {
        throw new Error('Table not allowed');
    }
    const client = await pool.connect();
    try {
        const res = await client.query(`SELECT * FROM ${tableName}`);
        return res.rows;
    } finally {
        client.release();
    }
};
