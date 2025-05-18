// utils/authCheck.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const checkAuthStatus = async () => {
	try {
		const token = await AsyncStorage.getItem("authToken");
		const userId = await AsyncStorage.getItem("userId");

		if (token && userId) {
			// User is logged in, redirect to pin page
			router.replace("/(routes)/pin");
		}
		// If not logged in, do nothing (will show the login/signup pages)
	} catch (error) {
		console.error("Error checking auth status:", error);
	}
};
