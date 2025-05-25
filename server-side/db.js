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

export const fetchExercisesWithCategories = async () => {
    try {
        const client = await pool.connect();
        const query = `
          SELECT e.id, e.name, e.description, e.category_id, c.id, c.exercise_type
          FROM exercises e
          LEFT JOIN exercises_categories c ON e.category_id = c.id
        `;
        const result = await client.query(query);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error fetching exercises with categories:', error);
        throw error;
    }
};

