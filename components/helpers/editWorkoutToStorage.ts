import Workout from "../models/Workout"
import removeWorkoutFromStorage from "./removeWorkoutFromStorage"
import AddWorkoutToStorage from "./AddWorkoutToStorage";
import parseDate from "./parseDate";

const editWorkoutToStorage = async (workout:Workout,originalDate:Date) : Promise<[boolean,string?]> => {

    try{

        const dateChanged:boolean = workout.workoutDate !== parseDate(originalDate);
        const workoutAdded = await AddWorkoutToStorage(workout,dateChanged ? false : true);

        if(workoutAdded[0] === true) {

            const workoutRemoved = await removeWorkoutFromStorage(originalDate,workout);

            if(workoutRemoved[0] === false) return [false,`An error occured: ${workoutRemoved[1]}`];

            else  return [true]
    
        }
        
        return [false,`An error occured: ${workoutAdded[1]}`]
    
    }
    catch(e){
        console.log(e)
        return [false,`An error occured: ${e}`]
    }
    
}

export default editWorkoutToStorage

