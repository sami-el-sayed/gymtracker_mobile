import AsyncStorage from "@react-native-community/async-storage"
import Workout from "../../models/Workout"
import getMonthYear from "../date/getMonthYear";
import checkIfWorkoutExists from "./checkIfWorkoutExists";

//Adds workout to storage
//If Workout is being edited doesnt check if such workout already exists
const AddWorkoutToStorage = async (workout:Workout,edited:boolean) : Promise<[boolean,string?]> => {

    const dateKey:string = getMonthYear(new Date(workout.workoutDate));

    const keyFinal:string = `${dateKey}-workouts`

    
    try {

        let workoutsStr:string | null = await  AsyncStorage.getItem(keyFinal);

        if(workoutsStr === null){
            const workouts:Workout[] = [workout];

            const workoutsObj = {
                workouts:workouts
            }
            workoutsStr = await JSON.stringify(workoutsObj)
            await AsyncStorage.setItem(keyFinal, workoutsStr)
            return [true]
        }

        else{
            const workouts:Workout[] = await JSON.parse(workoutsStr).workouts;

            if(edited === false){
                const foundDuplicate:boolean = checkIfWorkoutExists(workouts,workout.workoutDate)

                if(foundDuplicate === true){
                    return [false,`You already have a workout on this day`]
                }    
            }

            workouts.push(workout)

            const workoutsObj = {
                workouts:workouts
            }
            workoutsStr = await JSON.stringify(workoutsObj)
            await AsyncStorage.setItem(keyFinal, workoutsStr)

            return [true]
        }
    } 
    catch (e) {
        return [false,`An Error Occured: ${e}`]
    }
    
}

export default AddWorkoutToStorage

