import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/general/general";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";

export default function PowerDetailScreen() {
	const [buttonSpinner, setButtonSpinner] = useState(false);
	const [isScanning, setIsScanning] = useState(false);
	const [tapCount, setTapCount] = useState(0);

	const handleTap = (event) => {
		const { locationX, locationY } = event.nativeEvent;
		// Simulate shape detection logic
		const isHandDetected = detectHandShape(locationX, locationY);

		if (isHandDetected) {
			showMessage({
				message: "Invalid Tap",
				description: "Please try again!",
				type: "danger",
				backgroundColor: "#FF3B30",
				color: "#fff",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			return; // Stop the process if a hand is detected
		}

		// If a hand is NOT detected, proceed with scanning
		setTapCount((prevCount) => prevCount + 1);
		showMessage({
			message: "Card Detected",
			description: "Hang on while we scan this!",
			type: "success",
			backgroundColor: "#17CE89",
			color: "#fff",
			textStyle: { fontFamily: "GilroyMedium" },
		});

		// Start scanning process
		setIsScanning(true);

		// After 10 seconds, navigate to the success screen
		setTimeout(() => {
			setIsScanning(false); // Optional: Reset scanning state
			router.push("/(routes)/success");
		}, 10000); // 10 seconds
	};

	const detectHandShape = (x, y) => {
		// Simulate hand detection logic
		// For example, assume a hand touch is detected if the touch area is large
		const touchAreaSize = x * y; // Placeholder for touch area size
		return touchAreaSize > 2000; // Return true if the touch area is large (hand)
	};

	const handleCancel = () => {
		setButtonSpinner(true);
		router.push("/(routes)/signup");
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#646A86B2" }}>
			<Spacer size={8} />

			<ScrollView showsHorizontalScrollIndicator={false}>
				<Spacer size={28} />
			</ScrollView>

			<TouchableOpacity
				style={{
					justifyContent: "center",
					backgroundColor: "#ffffff",
					alignItems: "center",
					paddingTop: 20,
					borderTopLeftRadius: 16,
					borderTopRightRadius: 16,
				}}
				onPress={handleTap}
				disabled={isScanning} // Disable button during scan
			>
				<Image
					style={{ alignSelf: "center", height: 140, width: 140 }}
					source={require("@/assets/images/Frame 45173.png")}
				/>
				<Text
					style={{
						paddingVertical: 20,
						color: "#25396F",
						fontFamily: "GilroyMedium",
					}}
				>
					Hold and tap your NFC card here to scan
				</Text>
			</TouchableOpacity>

			<View style={{ padding: 20, backgroundColor: "#ffffff" }}>
				<TouchableOpacity style={styles.btnContainerOutline}>
					{isScanning ? (
						<View style={{ flexDirection: "row", gap: 5 }}>
							<Text style={styles.btnOutlineContent}>Scanning</Text>
							<ActivityIndicator size='small' color='#17CE89' />
						</View>
					) : (
						<Text style={styles.btnOutlineContent}>Begin Scan</Text>
					)}
				</TouchableOpacity>

				<Spacer size={16} />

				<TouchableOpacity
					style={styles.btnContainerOutline}
					onPress={handleCancel}
				>
					{buttonSpinner ? (
						<ActivityIndicator size='small' color='#ffffff' />
					) : (
						<Text style={styles.btnOutlineContent}>Cancel</Text>
					)}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
