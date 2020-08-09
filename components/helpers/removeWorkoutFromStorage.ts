import AsyncStorage from "@react-native-community/async-storage"

import Workout from "../models/Workout"
import getMonthYear from "./getMonthYear"

const removeWorkoutFromStorage = async (workoutDate:Date) : Promise<[boolean,string?]> => {
    const finalKey:string = `${getMonthYear(workoutDate)}-workouts`;

    try {
        const workoutsString:string | null = await AsyncStorage.getItem(finalKey)
        if(workoutsString !== null ){
            console.log("WORKOUTS THAT I GOT!!!!!!!")
            let workouts:Workout[] = await JSON.parse(workoutsString).workouts
            console.log(workouts)
            console.log("--------------------------")

            console.log("WORKOUTS THAT I FILTERED!!!!!!!")
            workouts = await workouts.filter((workout)=> workout.workoutDate !== workoutDate.toString());
            console.log(workouts)
            const workoutsObj = {
                workouts:workouts
            }
            await AsyncStorage.setItem(finalKey,await JSON.stringify(workoutsObj))
            return [true];
        }
        else return [false,"No Workout to remove"]
    
    } 
    catch(e) {
        console.log(e)
        return [false,`An Error occured loading Workouts: ${e}`]
    }
}

export default removeWorkoutFromStorage

