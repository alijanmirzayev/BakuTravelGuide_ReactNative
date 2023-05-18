import AsyncStorage from "@react-native-async-storage/async-storage";

interface Category{
    id: string;
    name: string;
    image: string;
}

export const saveUserCategories = async (categories: Category[]) => {
    try {
        await AsyncStorage.setItem("userCategories", JSON.stringify(categories));
    } catch (error) {
        console.log(error);
    }
}

export const getUserCategories = async () => {
    try {
        const userCategories = await AsyncStorage.getItem("userCategories");
        if (userCategories !== null) {
            return JSON.parse(userCategories);
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const removeAllUserCategories = async () => {
    try {
        await AsyncStorage.removeItem("userCategories");
    } catch (error) {
        console.log(error);
    }
}