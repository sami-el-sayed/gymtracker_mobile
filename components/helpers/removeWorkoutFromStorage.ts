import AsyncStorage from "@react-native-community/async-storage"

import Workout from "../models/Workout"
import getMonthYear from "./getMonthYear"
import parseDate from "./parseDate";
import matchWorkouts from "./matchWorkouts";



//Removes Workout from Storage
//Can be given a Workout that has to be kept even with the same date
const removeWorkoutFromStorage = async (DateToRemove:Date,workoutToKeep?:Workout) : Promise<[boolean,string?]> => {

    const finalKey:string = `${getMonthYear(DateToRemove)}-workouts`;
    const workoutDateStr = parseDate(DateToRemove);

    try {
        const workoutsString:string | null = await AsyncStorage.getItem(finalKey)


        if(workoutsString !== null ){

            let filteredWorkouts:Workout[] = [];
            const workouts:Workout[] = await JSON.parse(workoutsString).workouts

            //Filters Workouts based on Date
            //if Workout to kept was given searches it in the loop and laters matches it 
            for (let i = 0; i < workouts.length; i++) {

                if(workouts[i].workoutDate !== workoutDateStr) filteredWorkouts.push(workouts[i])
                
                else if(workoutToKeep !== undefined){
                    if(matchWorkouts(workouts[i],workoutToKeep) === true ) filteredWorkouts.push(workouts[i])
                }

            }
    

            if(filteredWorkouts.length === 0) {

                await AsyncStorage.removeItem(finalKey);
                return [true];
            }

            else{   
                const workoutsObj = {
                    workouts:filteredWorkouts
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

