import Point from "../../models/Point"
import Workout from "../../models/Workout";

const  loadProgress = (workouts:Workout[],exercise:string):Point[] => {
    const points:Point[] = [];
    for (let i = 0; i < workouts.length; i++) {
        for (let j = 0; j < workouts[i].exercises.length; j++) {
            if(workouts[i].exercises[j].name === exercise){
                const newPoint:Point = workouts[i].exercises[j].points[0];
                newPoint.date = new Date(workouts[i].workoutDate)
                points.push(newPoint)
            }

        }
    }
    return points
} 

export default loadProgress