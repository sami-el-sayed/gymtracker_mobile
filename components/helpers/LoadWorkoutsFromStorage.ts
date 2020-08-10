import AsyncStorage from "@react-native-community/async-storage"

import Workout from "components/models/Workout"

const LoadWorkoutsFromStorage = async (dateKey:string) : Promise<[Workout[],string?]> => {


    try {
        const workoutsString:string | null = await AsyncStorage.getItem(dateKey)
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

