import Exercise from "../../models/Exercise";

const WORKOUT_LIMIT = 50

const addWorkoutValidation = (exercises:Exercise[]):[boolean,string?] =>  {
    if(exercises.length > WORKOUT_LIMIT) return [false, `Can't have more than ${WORKOUT_LIMIT} exercises in a workout!`];
    else return [true]
}

export default addWorkoutValidation