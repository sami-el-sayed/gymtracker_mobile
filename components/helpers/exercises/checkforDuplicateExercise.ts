import Exercise from "../../models/Exercise";
import matchExercises from "./matchExercises";

const checkForDuplicateExercise = (exercise:Exercise,exerciseArr:Exercise[]):boolean => {
    let foundDuplicate:boolean = false;
    for (let i = 0; i < exerciseArr.length; i++) {

      if(matchExercises(exercise,exerciseArr[i]) === true ){
        foundDuplicate = true;
        break;
      }
      
    }
    return foundDuplicate
}

export default checkForDuplicateExercise;

