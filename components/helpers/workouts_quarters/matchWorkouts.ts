import Workout from "../../models/Workout";

//Checks if both workouts are the same
//Returns false if not same workouts
const matchWorkouts = (workoutA:Workout,workoutB:Workout) => {
    
    if(workoutA.workoutDate !== workoutB.workoutDate) return false;
    if(workoutA.exercises.length !== workoutB.exercises.length) return false;
    if(workoutA.notes && !workoutB.notes) return false;
    if(workoutB.notes && !workoutA.notes) return false;
    if(workoutA.notes && workoutB.notes){
      if(workoutA.notes.localeCompare(workoutB.notes) !== 0) return false;
    }

    for (let i = 0; i < workoutA.exercises.length; i++) {
      if(workoutA.exercises[i].name !== workoutB.exercises[i].name) return false;

      for (let j = 0; j < workoutA.exercises[i].points.length; j++) {
        if(workoutA.exercises[i].points[j].reps !== workoutB.exercises[i].points[j].reps) return false;
        if(workoutA.exercises[i].points[j].sets !== workoutB.exercises[i].points[j].sets) return false;
        if(workoutA.exercises[i].points[j].weight !== workoutB.exercises[i].points[j].weight) return false;
        if(workoutA.exercises[i].points[j].status !== workoutB.exercises[i].points[j].status) return false;
      }
    }

    return true;
}


export default matchWorkouts