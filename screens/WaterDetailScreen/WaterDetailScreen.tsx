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
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { styles } from "@/styles/general/general";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";

export default function PowerDetailScreen() {
	const [buttonSpinner, setButtonSpinner] = useState(false);
	const [isScanning, setIsScanning] = useState(false);

	useEffect(() => {
		const initializeNfc = async () => {
			try {
				const isSupported = await NfcManager.isSupported();
				if (!isSupported) {
					Alert.alert("NFC Not Supported", "This device does not support NFC.");
					return;
				}

				const result = await NfcManager.start();
				console.log("NFC Manager initialized:", result);

				if (result === null) {
					throw new Error("NFC Manager returned null.");
				}
			} catch (error) {
				console.error("Error initializing NFC Manager:", error);
				Alert.alert("Error", "Failed to initialize NFC. Restart the app.");
			}
		};

		initializeNfc();

		return () => {
			NfcManager.cancelTechnologyRequest();
			NfcManager.stop();
		};
	}, []);

	const handleNfcScan = async () => {
		try {
			setIsScanning(true);

			const isEnabled = await NfcManager.isEnabled();
			if (!isEnabled) {
				Alert.alert(
					"NFC Disabled",
					"Please enable NFC in your device settings."
				);
				setIsScanning(false);
				return;
			}

			await NfcManager.requestTechnology(NfcTech.Ndef);
			const tag = await NfcManager.getTag();

			if (tag) {
				console.log("NFC Tag detected:", tag);
				Alert.alert("Success", "NFC Tag detected successfully.");
				// Uncomment to navigate:
				// router.push("/(routes)/success");
			} else {
				Alert.alert("Error", "No NFC tag detected. Please try again.");
			}
		} catch (error) {
			console.error("Error scanning NFC tag:", error);
			Alert.alert("Error", "Failed to scan NFC tag. Please try again.");
		} finally {
			setIsScanning(false);
			NfcManager.cancelTechnologyRequest();
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
						<ActivityIndicator size='small' color='#ffffff' />
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
