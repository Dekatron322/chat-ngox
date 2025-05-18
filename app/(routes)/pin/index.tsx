// app/(routes)/pin.tsx
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	StatusBar,
	ActivityIndicator,
	TextInput,
	Keyboard,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const PinPage = () => {
	const [pin, setPin] = useState<string[]>(Array(4).fill(""));
	const [isLoading, setIsLoading] = useState(true);
	const [verifying, setVerifying] = useState(false);
	const [userId, setUserId] = useState<string | null>(null);
	const inputRefs = useRef<Array<TextInput | null>>([]);

	useEffect(() => {
		const checkAuth = async () => {
			const token = await AsyncStorage.getItem("authToken");
			const id = await AsyncStorage.getItem("userId");
			if (!token || !id) {
				router.replace("/(routes)/login");
			} else {
				setUserId(id);
				setIsLoading(false);
			}
		};
		checkAuth();
	}, []);

	const handlePinChange = (text: string, index: number) => {
		if (/^\d*$/.test(text)) {
			// Only allow numbers - Added missing parenthesis
			const newPin = [...pin];
			newPin[index] = text;
			setPin(newPin);

			// Auto-focus to next input
			if (text && index < 3) {
				inputRefs.current[index + 1]?.focus();
			}

			// Submit if last digit entered
			if (text && index === 3) {
				handleSubmit(newPin.join(""));
			}
		}
	};

	const handleKeyPress = (e: any, index: number) => {
		if (e.nativeEvent.key === "Backspace" && !pin[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handleSubmit = async (enteredPin: string) => {
		if (enteredPin.length !== 4) return;

		setVerifying(true);
		Keyboard.dismiss();

		try {
			if (!userId) {
				throw new Error("User ID not found");
			}

			const response = await fetch(
				`https://cb-api.caregiverhospital.com/custom-user/get-user-detail/${userId}/`
			);

			if (!response.ok) {
				throw new Error("Failed to fetch user details");
			}

			const userData = await response.json();

			if (userData.pin === enteredPin) {
				// PIN is correct, proceed to home
				showMessage({
					message: "Success",
					description: "PIN verified successfully!",
					type: "success",
					backgroundColor: "#008000",
					color: "#fff",
				});
				router.replace("/(tabs)/home");
			} else {
				// Incorrect PIN
				showMessage({
					message: "Error",
					description: "Incorrect PIN. Please try again.",
					type: "danger",
					backgroundColor: "#FF3B30",
				});
				// Clear PIN inputs
				setPin(Array(4).fill(""));
				inputRefs.current[0]?.focus();
			}
		} catch (error) {
			console.error("Error verifying PIN:", error);
			showMessage({
				message: "Error",
				description: "An error occurred. Please try again.",
				type: "danger",
				backgroundColor: "#FF3B30",
			});
			// Clear PIN inputs
			setPin(Array(4).fill(""));
			inputRefs.current[0]?.focus();
		} finally {
			setVerifying(false);
		}
	};

	const handleForgotPin = () => {
		// Implement forgot PIN flow
		showMessage({
			message: "Info",
			description: "Please contact support to reset your PIN",
			type: "info",
			backgroundColor: "#007AFF",
		});
	};

	if (isLoading) {
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

	return (
		<LinearGradient
			colors={["#F6F6F6", "#F6F6F6", "#F6F6F6"]}
			style={{ flex: 1 }}
		>
			<SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
				<StatusBar barStyle='dark-content' />

				<View style={{ alignItems: "center", marginTop: 40 }}>
					<Image
						source={require("@/assets/images/kelogo.png")}
						style={{ width: 150, height: 50, resizeMode: "contain" }}
					/>
				</View>

				<View style={{ marginTop: 60, alignItems: "center" }}>
					<Text style={{ fontFamily: "LufgaBold", fontSize: 24 }}>
						Enter Your PIN
					</Text>
					<Text
						style={{
							fontFamily: "LufgaRegular",
							fontSize: 16,
							marginTop: 10,
							color: "#666",
						}}
					>
						Secure access to your account
					</Text>
				</View>

				<View style={styles.pinContainer}>
					{Array(4)
						.fill(0)
						.map((_, index) => (
							<TextInput
								key={index}
								ref={(ref) => (inputRefs.current[index] = ref)}
								style={[
									styles.pinInput,
									pin[index] ? styles.pinInputFilled : null,
								]}
								keyboardType='numeric'
								maxLength={1}
								value={pin[index]}
								onChangeText={(text) => handlePinChange(text, index)}
								onKeyPress={(e) => handleKeyPress(e, index)}
								secureTextEntry={true}
								selectTextOnFocus
								editable={!verifying}
							/>
						))}
				</View>

				{verifying && (
					<View style={styles.verifyingContainer}>
						<ActivityIndicator size='small' color='#008000' />
						<Text style={styles.verifyingText}>Verifying...</Text>
					</View>
				)}

				<TouchableOpacity
					style={{ marginTop: 30, alignSelf: "center" }}
					onPress={handleForgotPin}
					disabled={verifying}
				>
					<Text style={{ fontFamily: "LufgaMedium", color: "#008000" }}>
						Forgot PIN?
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	pinContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 40,
		gap: 16,
	},
	pinInput: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: "#D1D1D1",
		borderRadius: 8,
		textAlign: "center",
		fontSize: 24,
		fontFamily: "LufgaBold",
		color: "#000",
		backgroundColor: "#FFF",
	},
	pinInputFilled: {
		borderColor: "#008000",
		backgroundColor: "#F0FFF0",
	},
	verifyingContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		gap: 8,
	},
	verifyingText: {
		fontFamily: "LufgaMedium",
		color: "#666",
	},
});

export default PinPage;
