import Workout from "../../models/Workout"
import removeWorkoutFromStorage from "./removeWorkoutFromStorage"
import AddWorkoutToStorage from "./AddWorkoutToStorage";
import parseDate from "../date/parseDate";
import matchWorkouts from "./matchWorkouts";

const editWorkoutToStorage = async (workout:Workout,originalWorkout:Workout,originalDate:Date) : Promise<[boolean,string?]> => {

    try{

        if(matchWorkouts(workout,originalWorkout)) return [false,`Workouts are the same!`];
        
        const dateChanged:boolean = workout.workoutDate !== parseDate(originalDate);
        const workoutAdded = await AddWorkoutToStorage(workout,dateChanged ? false : true);

        if(workoutAdded[0] === true) {

            const workoutRemoved = await removeWorkoutFromStorage(originalDate,dateChanged ? undefined : workout);

            if(workoutRemoved[0] === false) return [false,`An error occured: ${workoutRemoved[1]}`];

            else  return [true]
    
        }
        
        return [false,`An error occured: ${workoutAdded[1]}`]
    
    }
    catch(e){
        return [false,`An error occured: ${e}`]
    }
    
}

export default editWorkoutToStorage

