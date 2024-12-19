const exercisesList = document.querySelector("#exercises-list");

async function fetchExercises() {
    try {
        const response = await fetch("http://localhost:3000/exercises");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const exercises = await response.json();
        displayExercises(exercises);
    } catch (error) {
        console.error("Error fetching exercises:", error);
    }
}

function displayExercises(exercises) {
    exercisesList.textContent = "";

    exercises.forEach(exercise => {
        const exerciseName = document.createElement("li");
        exerciseName.textContent = exercise.name;
        exerciseName.classList.add("list-group-item");
        exercisesList.appendChild(exerciseName);
    });
}

fetchExercises();
