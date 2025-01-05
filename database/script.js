import pkg from "pg";
import fs from "fs";
import path from "path";

const { Pool } = pkg;

const pool = new Pool({
    user: "test",
    host: "localhost",
    database: "workout_app",
    password: "",
    port: 5432,
});

const importJsonFiles = async (directory) => {
    const client = await pool.connect();
    try {
        const files = fs.readdirSync(directory);
        for (const file of files) {
            const filePath = path.join(directory, file);
            if (fs.lstatSync(filePath).isFile()) {
                const data = fs.readFileSync(filePath, "utf8");
                const record = JSON.parse(data);

                await client.query(
                    "INSERT INTO exercises (name, description, category) VALUES ($1, $2, $3)",
                    [record.name, record.instructions, record.category]
                );
            }
        }
    } catch (err) {
        console.error("Error importing JSON files:", err);
    } finally {
        client.release();
    }
};

importJsonFiles("./exercises");
