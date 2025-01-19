import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ForgotSuccessScreen() {
	const [buttonSpinner, setButtonSpiner] = useState(false);
	const [buttonOutlineSpinner, setOutlineButtonSpiner] = useState(false);

	const handleSignIn = () => {
		setButtonSpiner(true);

		setTimeout(() => {
			setButtonSpiner(false);
			router.push("/(tabs)/home");
		}, 3000);
	};

	const handleEmail = () => {
		setOutlineButtonSpiner(true);

		setTimeout(() => {
			setOutlineButtonSpiner(false);
			router.push("/(routes)/resetPassword");
		}, 3000);
	};

	return (
		<LinearGradient
			colors={["#ffffff", "#ffffff", "#ffffff"]}
			style={{ flex: 1 }}
		>
			<SafeAreaView
				style={{
					paddingHorizontal: 20,
					flex: 1,
				}}
			>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Image
						source={require("@/assets/images/Feedback state.png")}
						style={styles.slideImage}
					/>
					<Text
						style={{
							fontFamily: "GilroyMedium",
							fontSize: 16,
							color: "#25396F",
							textAlign: "center",
						}}
					>
						Payment Successful
					</Text>
					<Spacer size={20} />

					<TouchableOpacity style={styles.btnContainer} onPress={handleSignIn}>
						{buttonSpinner ? (
							<ActivityIndicator size='small' color='#ffffff' />
						) : (
							<Text style={styles.btnContent}>Close</Text>
						)}
					</TouchableOpacity>
					<View
						style={{
							marginTop: 20,

							alignItems: "center",
						}}
					></View>
					<Spacer size={10} />
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
}
