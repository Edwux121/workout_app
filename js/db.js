// Purpose: Establish connection to PostgreSQL database using the postgres package.

const { Client } = require('pg');

// Database connection configuration
const dbConfig = {
    user: 'test',
    password: '',
    host: 'localhost',
    port: '5432',
    database: 'workout_app',
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

// Connect to the database
client
    .connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');

        // Execute SQL queries here

        client.query('SELECT * FROM exercises', (err, result) => {
            if (err) {
                console.error('Error executing query', err);
            } else {
                console.log('Query result:', result.rows);
            }

            // Close the connection when done
            client
                .end()
                .then(() => {
                    console.log('Connection to PostgreSQL closed');
                })
                .catch((err) => {
                    console.error('Error closing connection', err);
                });
        });
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });
