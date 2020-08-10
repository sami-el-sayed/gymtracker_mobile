import AsyncStorage from "@react-native-community/async-storage"

import Workout from "../models/Workout"
import getMonthYear from "./getMonthYear"
import parseDate from "./parseDate";

const removeWorkoutFromStorage = async (workoutDate:Date) : Promise<[boolean,string?]> => {
    const finalKey:string = `${getMonthYear(workoutDate)}-workouts`;
    console.log(finalKey)
    const workoutDateStr = parseDate(workoutDate);

    try {
        const workoutsString:string | null = await AsyncStorage.getItem(finalKey)


        if(workoutsString !== null ){
            
            let workouts:Workout[] = await JSON.parse(workoutsString).workouts
            workouts = workouts.filter((workout)=> {
                console.log("WORKOUT FILTERED DATE" + workout.workoutDate)
                console.log("WORKOUT TO DELETE" + workoutDateStr)
                return workout.workoutDate !== workoutDateStr
            });

    

            if(workouts.length === 0) {

                await AsyncStorage.removeItem(finalKey);
                return [true];
            }

            else{   
                const workoutsObj = {
                    workouts:workouts
                }

                await AsyncStorage.setItem(finalKey,await JSON.stringify(workoutsObj))
                return [true];    
            }

        }
        else return [false,"No Workout to remove"]
    
    } 
    catch(e) {
        console.log(e)
        return [false,`An Error occured loading Workouts: ${e}`]
    }
}

export default removeWorkoutFromStorage

