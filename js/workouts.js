const workoutList = document.querySelector("#workout-list");

async function fetchWorkouts(tableName = "workouts") {
    try {
        const response = await fetch(`http://localhost:3000/workoutapp?tableName=${encodeURIComponent(tableName)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const workouts = await response.json();
        displayWorkouts(workouts);
    } catch (error) {
        console.error("Error fetching workouts:", error);
    }
}

function displayWorkouts(workouts) {
    workoutList.textContent = "";

    workouts.forEach(workout => {
        const workoutItem = document.createElement("a");
        workoutItem.classList.add("d-flex", "justify-content-between", "align-items-center", "list-group-item");
        workoutItem.onclick = () => displayWorkoutList(workout.exercises);

        const workoutName = document.createElement("span");
        workoutName.textContent = workout.name;

        workoutItem.appendChild(workoutName);
        workoutList.appendChild(workoutItem);
    });
}

function displayWorkoutList(exerciseName) {
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
                          width=1000,height=600,left=-1000,top=-1000`;
    const workoutWindow = window.open("", "", params);

    let exerciseHTML = `
    <html>
    <head>
    <title>Workout</title>
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
        </div>
    </body>
    </html>`;

    workoutWindow.document.write(exerciseHTML);
}

fetchWorkouts();
