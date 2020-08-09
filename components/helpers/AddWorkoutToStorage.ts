import AsyncStorage from "@react-native-community/async-storage"
import Workout from "../models/Workout"
import getMonthYear from "./getMonthYear";

const AddWorkoutToStorage = async (workout:Workout) : Promise<[boolean,string?]> => {

    const dateKey:string = getMonthYear(new Date(workout.workoutDate));

    const keyFinal:string = `${dateKey}-workouts`

    console.log("KEY FINAL" + keyFinal)
    
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

