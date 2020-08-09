import AsyncStorage from "@react-native-community/async-storage"

const LoadExercisesFromStorage = async () : Promise<[string[],string?]> => {

    try {
        const exercisesString:string | null = await AsyncStorage.getItem('exercises')
        if(exercisesString !== null ){

            const exercisesObj = JSON.parse(exercisesString)
            return [exercisesObj.exercises]
        }
        else return [[]]
    
    } 
    catch(e) {
        return [[],`An Error occured loading exercises: ${e}`]
    }
}

export default LoadExercisesFromStorage

