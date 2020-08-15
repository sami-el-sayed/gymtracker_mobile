import Workout from "../../models/Workout";

const matchWorkouts = (workoutA:Workout,workoutB:Workout) => {
    
    if(workoutA.exercises.length !== workoutB.exercises.length) return false;

    for (let i = 0; i < workoutA.exercises.length; i++) {
      if(workoutA.exercises[i].name !== workoutB.exercises[i].name) return false;

      for (let j = 0; j < workoutA.exercises[i].points.length; j++) {
        if(workoutA.exercises[i].points[j].reps !== workoutB.exercises[i].points[j].reps) return false;
        if(workoutA.exercises[i].points[j].sets !== workoutB.exercises[i].points[j].sets) return false;
        if(workoutA.exercises[i].points[j].weight !== workoutB.exercises[i].points[j].weight) return false;
      }
    }

    return true;
}


export default matchWorkouts