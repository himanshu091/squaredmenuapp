import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (data) => {
    try {
        console.log("data incomming =>", data)
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        console.log("data stringify =>", JSON.stringify(data))
     } catch (error) {
       console.log("Something went wrong", error);
     }
}

export const getToken = async (data) => {
    try {
        let userData = await AsyncStorage.getItem("userData");
        let data = JSON.parse(userData);
        console.log("Store",data);
        return data
    } catch (error) {
        console.log("Something went wrong", error);
        return null
    }
}