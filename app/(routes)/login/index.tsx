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
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { signIn } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { checkAuthStatus } from "@/utils/authCheck";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [buttonSpinner, setButtonSpinner] = useState(false);
	const [focusedInput, setFocusedInput] = useState<string | null>(null);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			await checkAuthStatus();
			setIsCheckingAuth(false);
		};
		checkAuth();
	}, []);

	if (isCheckingAuth) {
		return (
			<LinearGradient
				colors={["#F6F6F6", "#F6F6F6", "#F6F6F6"]}
				style={{ flex: 1 }}
			>
				<SafeAreaView
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator size='large' color='#008000' />
				</SafeAreaView>
			</LinearGradient>
		);
	}

	const handleSignIn = async () => {
		setButtonSpinner(true);

		try {
			const response = await signIn({ email, password });

			console.log("Login Successful:", response);

			// Extract token and id
			const { token, id } = response;

			// Save to AsyncStorage with consistent keys
			await AsyncStorage.setItem("authToken", token);
			await AsyncStorage.setItem("userId", id.toString());

			// Navigate to the home screen
			showMessage({
				message: "Success",
				description: "Login Successful!",
				type: "success",
				backgroundColor: "#008000",
				color: "#fff",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			router.replace("/(tabs)/home");
		} catch (error) {
			if (error instanceof Error) {
				showMessage({
					message: "Error",
					description: error?.message || "Email or Password Incorrect!",
					type: "danger",
					backgroundColor: "#FF3B30",
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
			colors={["#F6F6F6", "#F6F6F6", "#F6F6F6"]}
			style={{ flex: 1 }}
		>
			<SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
				<StatusBar barStyle='dark-content' />

				<ScrollView showsVerticalScrollIndicator={false}>
					<Spacer size={20} />
					<Image
						source={require("@/assets/images/kelogo.png")}
						style={styles.slideImage}
					/>

					<Spacer size={30} />
					<View>
						<Image
							source={require("@/assets/images/Frame23.png")}
							style={styles.imageStyle}
						/>

						<Spacer size={20} />

						<View
							style={[
								styles.TextInput,
								focusedInput === "property_id" && {
									borderColor: "#008000",
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
									<Text style={styles.TextInputTitle}>Email</Text>
									<TextInput
										maxLength={100}
										placeholder='Kad@gmail.com'
										placeholderTextColor='#212121'
										style={{
											padding: 2,
											marginTop: 3,
											fontSize: 16,
											width: "100%",
											fontFamily: "LufgaRegular",
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

						<View
							style={[
								styles.TextInput,
								focusedInput === "password" && {
									borderColor: "#008000",
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
									<Text style={styles.TextInputTitle}>Password</Text>
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
											style={{ width: 20, height: 20 }}
										/>
									)}
								</TouchableOpacity>
							</View>
						</View>

						<Spacer size={8} />

						<TouchableOpacity
							onPress={() => router.push("/(routes)/forgotPassword")}
						>
							<Text
								style={{
									textAlign: "right",
									fontFamily: "LufgaMedium",
									opacity: 0.6,
									color: "#00000099",
								}}
							>
								Forgot Password?
							</Text>
						</TouchableOpacity>

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
					</View>
					<View
						style={{
							marginTop: 20,
							flex: 1,
							alignItems: "center",
						}}
					>
						<TouchableOpacity onPress={() => router.push("/(routes)/signup")}>
							<Text
								style={{
									textAlign: "center",
									fontFamily: "LufgaMedium",
									opacity: 0.6,
									color: "#00000099",
								}}
							>
								Don't have an Account?{" "}
								<Text style={{ color: "#008000" }}>Create Account </Text>
							</Text>
						</TouchableOpacity>
					</View>

					<Spacer size={20} />
				</ScrollView>
				<View style={styles.footerContainer}>
					<Text style={{ fontFamily: "LufgaRegular", color: "#00000033" }}>
						Powered By Blumentech
					</Text>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
}
