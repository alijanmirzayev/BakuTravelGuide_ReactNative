import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserFavorites = async (product:any) => {
    try {
        await AsyncStorage.setItem("userFavorites", JSON.stringify(product));
        return product;
    } catch (error) {
        console.log(error);
    }
}

export const getUserFavorites = async () => {
    try {
        const userFavorites = await AsyncStorage.getItem("userFavorites");
        if (userFavorites !== null) {
            return JSON.parse(userFavorites);
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}