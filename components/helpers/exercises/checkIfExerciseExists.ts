import Workout from "../../models/Workout";

const checkIfExerciseExists = (exercises:string[],exerciseToAdd:string):boolean => {

    let found:boolean = false;

    for (let i = 0; i < exercises.length; i++) {
        if(exercises[i].toLowerCase().trim() === exerciseToAdd.toLowerCase().trim()) {
            found = true;
            break;
        }
    }
    return found;
}

export default checkIfExerciseExists;