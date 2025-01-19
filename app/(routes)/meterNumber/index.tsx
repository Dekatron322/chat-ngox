import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Platform,
	ActivityIndicator,
	Image,
	StatusBar,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";

export default function SignUp() {
	const [meterNumber, setMeterNumber] = useState("");
	const [buttonSpinner, setButtonSpinner] = useState(false);
	const [focusedInput, setFocusedInput] = useState<string | null>(null);

	const handleLogin = async () => {
		setButtonSpinner(true);

		router.push("/(routes)/login");
		setButtonSpinner(false);
	};

	return (
		<LinearGradient
			colors={["#ffffff", "#ffffff", "#ffffff"]}
			style={{ flex: 1 }}
		>
			<SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
				<StatusBar barStyle='dark-content' />

				<ScrollView showsVerticalScrollIndicator={false}>
					<Spacer size={20} />
					<Image
						source={require("@/assets/images/chatsTransparent.png")}
						style={styles.slideImage}
					/>

					<Spacer size={30} />
					<View>
						<Image
							source={require("@/assets/images/panaa.png")}
							style={styles.slideImage}
						/>

						<Spacer size={20} />

						<TouchableOpacity
							onPress={() => router.push("/(routes)/requestMeterNumber")}
						>
							<Text
								style={{
									textAlign: "center",
									fontFamily: "GilroyBold",
									fontSize: 22,
									color: "#25396F",
								}}
							>
								Simple And Easy
							</Text>
							<Text
								style={{
									textAlign: "center",
									fontFamily: "GilroyRegular",

									color: "#646A86",
								}}
							>
								Easy and straightforward onboarding process
							</Text>
						</TouchableOpacity>

						<Spacer size={16} />
					</View>

					<Spacer size={20} />
				</ScrollView>

				<TouchableOpacity
					style={styles.btnContainerOutline}
					onPress={handleLogin}
				>
					{buttonSpinner ? (
						<ActivityIndicator size='small' color='#17CE89' />
					) : (
						<Text style={styles.btnOutlineContent}>Sign In</Text>
					)}
				</TouchableOpacity>
				<Spacer size={40} />
			</SafeAreaView>
		</LinearGradient>
	);
}
