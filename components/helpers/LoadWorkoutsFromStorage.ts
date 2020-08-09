import AsyncStorage from "@react-native-community/async-storage"

import Workout from "components/models/Workout"
import getMonthYear from "./getMonthYear"

const LoadWorkoutsFromStorage = async () : Promise<[Workout[],string?]> => {

    const dateKey:string = getMonthYear(new Date());

    console.log(dateKey)

    try {
        const workoutsString:string | null = await AsyncStorage.getItem(`${dateKey}-workouts`)
        if(workoutsString !== null ){
            const workoutsOBJ = await JSON.parse(workoutsString)
            return [workoutsOBJ.workouts]
        }
        else return [[]]
    
    } 
    catch(e) {
        return [[],`An Error occured loading Workouts: ${e}`]
    }
}

export default LoadWorkoutsFromStorage

