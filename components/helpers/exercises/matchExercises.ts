
import Exercise from "../../models/Exercise";

const matchExercises = (exerciseA:Exercise,exerciseB:Exercise):boolean => {

    if(exerciseA.name !== exerciseB.name) return false;
    
    for (let i = 0; i < exerciseA.points.length; i++) {

        if(exerciseA.points[i].reps !== exerciseB.points[i].reps) return false;
        if(exerciseA.points[i].sets !== exerciseB.points[i].sets) return false;
        if(exerciseA.points[i].weight !== exerciseB.points[i].weight) return false;
        if(exerciseA.points[i].status !== exerciseB.points[i].status) return false;
      }

    return true;
}


export default matchExercises