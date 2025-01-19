import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/general/general";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";

export default function PowerDetailScreen() {
	const [buttonSpinner, setButtonSpinner] = useState(false);
	const [isScanning, setIsScanning] = useState(false);

	useEffect(() => {
		// If you want to simulate NFC, no need to initialize NfcManager
		// but if you want to keep the code for real NFC initialization, you can still do it here
		const initializeNfc = async () => {
			// You can log this and skip further NFC initialization for simulation purposes.
			console.log("Simulating NFC Initialization...");
		};

		initializeNfc();

		// Cleanup: cancel any NFC technology requests
		return () => {
			console.log("Cleaning up NFC simulation...");
		};
	}, []);

	const handleNfcScan = async () => {
		try {
			setIsScanning(true);

			// Simulate NFC scanning
			const simulatedTag = {
				id: "12345", // Simulated tag ID
				type: "NFC_TAG_TYPE", // Simulated tag type
				payload: "Sample NFC Data", // Simulated payload data
			};

			// Simulate a delay as if scanning
			setTimeout(() => {
				console.log("Simulated NFC Tag detected:", simulatedTag);
				showMessage({
					message: "Success",
					description: "Scanned Succeffully!",
					type: "success",
					backgroundColor: "#17CE89", // Optional color customization
					color: "#fff", // Text color
					textStyle: { fontFamily: "GilroyMedium" },
				});
				// Alert.alert("Success", "Simulated NFC Tag detected successfully.");
				setIsScanning(false);
				// Uncomment to navigate:
				router.push("/(routes)/success");
			}, 10000); // Simulate a 2-second delay for scanning
		} catch (error) {
			console.error("Error simulating NFC scan:", error);
			Alert.alert("Error", "Failed to simulate NFC scan. Please try again.");
			setIsScanning(false);
		}
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

			<View
				style={{
					justifyContent: "center",
					backgroundColor: "#ffffff",
					alignItems: "center",
					paddingTop: 20,
					borderTopLeftRadius: 16,
					borderTopRightRadius: 16,
				}}
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
					Hold and tap on your NFC card here to scan
				</Text>
			</View>

			<View style={{ padding: 20, backgroundColor: "#ffffff" }}>
				<TouchableOpacity
					style={styles.btnContainerOutline}
					onPress={handleNfcScan}
				>
					{isScanning ? (
						<ActivityIndicator size='small' color='#17CE89' />
					) : (
						<Text style={styles.btnOutlineContent}>Start Scan</Text>
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
