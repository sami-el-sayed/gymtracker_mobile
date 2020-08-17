import getAllQuartersAndYearsSorted from "./workouts_quarters/getAllQuartersAndYearsSorted"
import AsyncStorage from "@react-native-community/async-storage";

const clearWorkoutsFromStorage = async () => {

    const quarters:string[] = await getAllQuartersAndYearsSorted();
    for (let i = 0; i < quarters.length; i++) {
        await AsyncStorage.removeItem(quarters[i])
    }

}

export default clearWorkoutsFromStorage