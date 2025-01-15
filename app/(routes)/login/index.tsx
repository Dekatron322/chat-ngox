import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	Image,
	StatusBar,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { signIn } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [buttonSpinner, setButtonSpinner] = useState(false);
	const [focusedInput, setFocusedInput] = useState<string | null>(null);

	const handleSignIn = async () => {
		setButtonSpinner(true);

		try {
			const response = await signIn({ user_id: email, password });

			console.log("Login Successful:", response);

			// Extract `user_id` from the response
			const {
				vendor: { user_id },
			} = response;

			// Save `user_id` to AsyncStorage
			await AsyncStorage.setItem("userId", user_id);

			// Show success message
			showMessage({
				message: "Success",
				description: "Login Successful!",
				type: "success",
				backgroundColor: "#17CE89", // Optional color customization
				color: "#fff", // Text color
				textStyle: { fontFamily: "GilroyMedium" },
			});

			// Navigate to the home screen
			router.push("/(tabs)/home");
		} catch (error) {
			if (error instanceof Error) {
				showMessage({
					message: "Error",
					description: error?.message || "Email or Password Incorrect!",
					type: "danger",
					backgroundColor: "#FF3B30", // Optional color customization
					textStyle: { fontFamily: "GilroyMedium" },
				});
				console.error("Login failed:", error.message);
			} else {
				showMessage({
					message: "Error",
					description: "An error occurred. Please try again.",
					type: "danger",
					backgroundColor: "#FF3B30",
					textStyle: { fontFamily: "GilroyMedium" },
				});
				console.error("Login failed:", error);
			}
		} finally {
			setButtonSpinner(false);
		}
	};

	return (
		<LinearGradient
			colors={["#ffffff", "#ffffff", "#ffffff"]}
			style={{ flex: 1 }}
		>
			<Spacer size={30} />
			<CustomHeader title='' showHistory={false} />

			<SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
				<StatusBar barStyle='dark-content' />

				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{}}>
						<Text
							style={{
								fontFamily: "GilroySemiBold",
								fontSize: 24,
								color: "#1B1E21",
							}}
						>
							Welcome Back!
						</Text>
						<TouchableOpacity
						// onPress={() => router.push("/(routes)/signup")}
						>
							<Text
								style={{
									fontFamily: "GilroyMedium",
									color: "#25396F",
								}}
							>
								Don't have an Account?{" "}
								<Text style={{ color: "#17CE89" }}>Create Account </Text>
							</Text>
						</TouchableOpacity>
					</View>
					<Spacer size={30} />
					<View>
						<Spacer size={20} />
						<Text style={styles.TextInputTitle}>Vendor ID</Text>
						<Spacer size={6} />
						<View
							style={[
								styles.TextInput,
								focusedInput === "email" && {
									borderColor: "#17CE89",
									borderWidth: 1,
								},
							]}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View>
									<TextInput
										maxLength={100}
										placeholder='Enter Vendor ID'
										placeholderTextColor='#212121'
										style={{
											padding: 2,
											marginTop: 3,
											fontSize: 16,
											width: "100%",
											fontFamily: "GilroyRegular",
										}}
										onFocus={() => setFocusedInput("email")}
										onBlur={() => setFocusedInput(null)}
										value={email}
										onChangeText={setEmail}
									/>
								</View>
							</View>
						</View>
						<Spacer size={16} />
						<Text style={styles.TextInputTitle}>Password</Text>
						<Spacer size={6} />
						<View
							style={[
								styles.TextInput,
								focusedInput === "password" && {
									borderColor: "#17CE89",
									borderWidth: 1,
								},
							]}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View
									style={{
										flexDirection: "row",
										gap: 6,
										alignItems: "center",
									}}
								>
									<TouchableOpacity
										onPress={() => setPasswordVisible(!passwordVisible)}
									>
										<Image
											source={
												focusedInput === "password"
													? require("@/assets/images/Lock-active.png")
													: require("@/assets/images/Locks.png")
											}
										/>
									</TouchableOpacity>
									<TextInput
										maxLength={25}
										placeholder='***********'
										placeholderTextColor='#212121'
										style={{ padding: 0, marginTop: 3, fontSize: 16 }}
										secureTextEntry={!passwordVisible}
										value={password}
										onChangeText={setPassword}
										onFocus={() => setFocusedInput("password")}
										onBlur={() => setFocusedInput(null)}
									/>
								</View>
								<TouchableOpacity
									onPress={() => setPasswordVisible(!passwordVisible)}
								>
									{passwordVisible ? (
										<Feather name='eye' size={20} color={"#333333"} />
									) : (
										<Image
											source={require("@/assets/images/eye-close-line.png")}
										/>
									)}
								</TouchableOpacity>
							</View>
						</View>

						<Spacer size={8} />

						<TouchableOpacity
						// onPress={() => router.push("/(routes)/forgotPassword")}
						>
							<Text
								style={{
									textAlign: "right",
									fontFamily: "LufgaMedium",

									color: "#17CE89",
									textDecorationLine: "underline",
								}}
							>
								Forgot Password?
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
				<Spacer size={16} />
				<TouchableOpacity
					style={styles.btnContainer}
					onPress={handleSignIn}
					disabled={buttonSpinner}
				>
					{buttonSpinner ? (
						<ActivityIndicator size='small' color='#ffffff' />
					) : (
						<Text style={styles.btnContent}>Sign In</Text>
					)}
				</TouchableOpacity>
				<View
					style={{
						marginTop: 20,

						alignItems: "center",
					}}
				>
					<TouchableOpacity
					// onPress={() => router.push("/(routes)/signup")}
					>
						<Text
							style={{
								textAlign: "center",
								fontFamily: "LufgaMedium",
								opacity: 0.6,
								color: "#00000099",
							}}
						>
							By logging in you are agreeing to our{" "}
							<Text
								style={{ color: "#17CE89", textDecorationLine: "underline" }}
							>
								Terms of Service{" "}
							</Text>{" "}
							and{" "}
							<Text
								style={{ color: "#17CE89", textDecorationLine: "underline" }}
							>
								Privacy Policy{" "}
							</Text>
						</Text>
					</TouchableOpacity>
				</View>

				<Spacer size={49} />
			</SafeAreaView>
		</LinearGradient>
	);
}
