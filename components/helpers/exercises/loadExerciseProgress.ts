import Point from "../../models/Point"
import Workout from "../../models/Workout";

const  loadProgress = (workouts:Workout[],exercise:string):Workout[] => {
    const filteredWorkouts:Workout[] = []
    for (let i = 0; i < workouts.length; i++) {
        const singleFilteredWorkout:Workout= new Workout(workouts[i].workoutDate,[]);
        for (let j = 0; j < workouts[i].exercises.length; j++) {
            if(workouts[i].exercises[j].name === exercise){
                const newPoint:Point = workouts[i].exercises[j].points[0];
                newPoint.date = new Date(workouts[i].workoutDate)
                singleFilteredWorkout.exercises.push(workouts[i].exercises[j])
            }
        }
        if(singleFilteredWorkout.exercises.length > 0) filteredWorkouts.push(singleFilteredWorkout)
    }
    return filteredWorkouts
} 

export default loadProgress