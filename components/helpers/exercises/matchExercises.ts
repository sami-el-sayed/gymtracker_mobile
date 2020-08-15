
import Exercise from "../../models/Exercise";

const matchExercises = (exerciseA:Exercise,exerciseB:Exercise):boolean => {

    if(exerciseA.name !== exerciseB.name) return false;
    
    for (let i = 0; i < exerciseA.points.length; i++) {

        if(exerciseA.points[i].reps !== exerciseA.points[i].reps) return false;
        if(exerciseA.points[i].sets !== exerciseA.points[i].sets) return false;
        if(exerciseA.points[i].weight !== exerciseA.points[i].weight) return false;
      }

    return true;
}


export default matchExercises