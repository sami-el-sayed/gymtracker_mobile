import AsyncStorage from "@react-native-community/async-storage";

const clearExercisesFromStorage = async () => {
    await AsyncStorage.removeItem("exercises");
}

export default clearExercisesFromStorage