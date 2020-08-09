import AsyncStorage from "@react-native-community/async-storage"
import Workout from "../models/Workout"
import removeWorkoutFromStorage from "./removeWorkoutFromStorage"
import AddWorkoutToStorage from "./AddWorkoutToStorage";
import getMonthYear from "./getMonthYear";

const editWorkoutToStorage = async (workout:Workout,originalDate:Date) : Promise<[boolean,string?]> => {

    try{
        const workoutRemoved = await removeWorkoutFromStorage(originalDate);

        if(workoutRemoved[0] === false) return [false,`An error occured: ${workoutRemoved[1]}`];

        else {
            const workoutAdded = await AddWorkoutToStorage(workout);
            if(workoutAdded[0] === true) return [true]
            else return [false,`An error occured: ${workoutAdded[1]}`]
        }
    
    }
    catch(e){
        console.log(e)
        return [false,`An error occured: ${e}`]
    }
    
}

export default editWorkoutToStorage
