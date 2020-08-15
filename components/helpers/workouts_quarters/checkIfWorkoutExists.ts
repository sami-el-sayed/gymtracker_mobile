import Workout from "../../models/Workout";

const checkIfWorkoutExists = (workouts:Workout[],newWorkoutDate:string):boolean => {

    let found:boolean = false;

    for (let i = 0; i < workouts.length; i++) {
        if(workouts[i].workoutDate === newWorkoutDate) {
            found = true;
            break;
        }
    }
    return found;
}

export default checkIfWorkoutExists;