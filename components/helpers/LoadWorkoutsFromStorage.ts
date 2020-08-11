import AsyncStorage from "@react-native-community/async-storage"

import Workout from "components/models/Workout"
import sortWorkouts from "./sortWorkouts"

const LoadWorkoutsFromStorage = async (dateKey:string) : Promise<[Workout[],string?]> => {

    try {
        const workoutsString:string | null = await AsyncStorage.getItem(dateKey)
        if(workoutsString !== null ){
            const workoutsOBJ = await JSON.parse(workoutsString)
            const sortedWorkouts = sortWorkouts(workoutsOBJ.workouts)
            console.log(sortedWorkouts)
            return [sortedWorkouts]
        }
        else return [[]]
    
    } 
    catch(e) {
        return [[],`An Error occured loading Workouts: ${e}`]
    }
}

export default LoadWorkoutsFromStorage

