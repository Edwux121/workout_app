const exercisesList = document.querySelector("#exercises-list");

// async function fetchExercises(tableName = "exercises") {
//     try {
//         const response = await fetch(`http://localhost:3000/workoutapp?tableName=${encodeURIComponent(tableName)}`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const exercises = await response.json();
//         displayExercises(exercises);
//     } catch (error) {
//         console.error("Error fetching exercises:", error);
//     }
// }

async function fetchExercises() {
    try {
        const response = await fetch('http://localhost:3000/workoutapp/exercises-with-categories');
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
    console.log("Received exercise data:", exercises[0]); // Log the first exercise to see its structure
    exercisesList.textContent = "";

    exercises.forEach(exercise => {
        const exerciseItem = document.createElement("div");
        exerciseItem.classList.add("d-flex", "justify-content-between", "align-items-center", "list-group-item", "exercise-item-bg");

        const exerciseName = document.createElement("span");
        exerciseName.textContent = exercise.name;

        //TODO: Delete button here

        const detailsButton = document.createElement("a");
        detailsButton.textContent = "Details";
        detailsButton.id = "details-button";
        detailsButton.classList.add("btn", "ms-2");
        detailsButton.onclick = () => displayExerciseDetails(exercise.name, exercise.exercise_type, exercise.description);

        exerciseItem.appendChild(exerciseName);
        exerciseItem.appendChild(detailsButton);
        exercisesList.appendChild(exerciseItem);
    });
}

function displayExerciseDetails(exerciseName, exerciseCategory, exerciseDetails) {
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
                          width=1000,height=600,left=-1000,top=-1000`;
    const exerciseWindow = window.open("", "", params);

    let exerciseHTML = `
    <html>
    <head>
    <title>Exercise Details</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container text-center" id="exercisesContainer">
            <div class="row">
                <div class="col" id="exerciseName">
                    ${exerciseName}
                </div>
            </div>
            <div class="row">
                <div class="col">
                    CATEGORY:
                </div>
            </div>
            <div class="row">
                <div class="col" id="exerciseCategory">
                    ${exerciseCategory}
                </div>
            </div>
            <div class="row">
                <div class="col">
                    INSTRUCTIONS:
                </div>
            </div>
            <div class="row">
                <div class="col">
                    ${exerciseDetails}
                </div>
            </div>
        </div>
    </body>
    </html>`;

    exerciseWindow.document.write(exerciseHTML);
}

fetchExercises();
