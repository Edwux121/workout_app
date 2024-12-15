import sql from "./db.js";

const exercisesList = document.querySelector("#exercises-list");

function displayExercises(exercises) {
    exercisesList.textContent = "";

    exercises.forEach(exercise => {
        const exerciseName = document.createElement("li");
        exerciseName.textContent = exercise.name;
        exercisesList.appendChild(exerciseName);
    })
}
