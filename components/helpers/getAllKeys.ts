import AsyncStorage from "@react-native-community/async-storage"


const getAllKeys = async (): Promise<string[]> => {
    return await AsyncStorage.getAllKeys();
}

export default getAllKeys

