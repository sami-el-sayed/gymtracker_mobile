import AsyncStorage from "@react-native-community/async-storage"

const AddExercisesToStorage = async (exercises:string[]) : Promise<[boolean,string?]> => {

    const exercisesObj ={
        exercises:exercises
    }
    
    try {
        await AsyncStorage.setItem('exercises', JSON.stringify(exercisesObj))
        return [true]
    } 
    catch (e) {
        return [false,`An Error Occured: ${e}`]
    }
    
}

export default AddExercisesToStorage

