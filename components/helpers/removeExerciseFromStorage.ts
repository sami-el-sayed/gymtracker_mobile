import AsyncStorage from "@react-native-community/async-storage"

const removeExerciseFromStorage = async (exerciseToRemove:string,exercises:string[]) : Promise<[string[],string?]> => {

    try{
        const filteredExercises = exercises.filter((exercise)=>exercise !== exerciseToRemove)

        const exercisesObj = {
            exercises: filteredExercises
        }

        await AsyncStorage.setItem('exercises', JSON.stringify(exercisesObj))
        return [filteredExercises]

    }

    catch(e)
    {
        return [exercises,`An Error occured: ${e}`]
    }

}

export default removeExerciseFromStorage

