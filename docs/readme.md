# Workout App Development Guidelines

This document provides essential information for developers working on the Workout App project.

## Build/Configuration Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database

### Database Setup
1. Install PostgreSQL and create a database named `workout_app`
2. Configure database connection in `server-side/db.js` with your credentials:
   ```javascript
   const pool = new Pool({
     user: "your_username",
     host: "localhost",
     database: "workout_app",
     password: "your_password",
     port: 5432,
   });
   ```
3. Create the required tables:
   ```sql
   CREATE TABLE exercises (
     id SERIAL PRIMARY KEY,
     name VARCHAR(50),
     description TEXT,
     type VARCHAR(20)
   );

   CREATE TABLE workouts (
     id SERIAL PRIMARY KEY,
     name VARCHAR(50),
     exercises TEXT
   );
   ```
4. Import exercise data using the script in `database/script.js`:
   ```bash
   node database/script.js
   ```

### Project Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Access the application at `http://localhost:3000`
