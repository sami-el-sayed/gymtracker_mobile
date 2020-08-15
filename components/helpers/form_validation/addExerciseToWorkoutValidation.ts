import Exercise from "../../models/Exercise";

const addExerciseToWorkoutValidation = (exercise:Exercise):[boolean,string?] =>  {

    const point = exercise.points[0];

    if (isNaN(point.sets) || isNaN(point.reps) || isNaN(point.weight)) return [false,"Sets,reps,weight have to be numbers!"]
    if (point.sets <= 0 || point.reps <= 0 || point.weight <= 0) return [false,"Sets,reps,weight cant be 0 or less!"]
    if (point.sets > 1000 || point.reps > 1000 ) return [false,"Did you really do more than 1000 sets/reps?"]
    if (point.weight > 1000 ) return [false,"Did you really lift more than 1000kg?"]

    else return [true]
}

export default addExerciseToWorkoutValidation