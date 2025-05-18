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
import { router } from "expo-router";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
import { showMessage } from "react-native-flash-message";

export default function RequestSuccess() {
	const [meterNumber, setMeterNumber] = useState("");
	const [buttonSpinner, setButtonSpiner] = useState(false);
	const [focusedInput, setFocusedInput] = useState<string | null>(null);
	const [verificationStatus, setVerificationStatus] = useState<{
		verified: boolean;
		message: string;
	} | null>(null);

	const verifyMeterNumber = async () => {
		if (!meterNumber.trim()) {
			showMessage({
				message: "Error",
				description: "Please enter a meter number",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			return;
		}

		setButtonSpiner(true);
		setVerificationStatus(null);

		try {
			const response = await fetch(
				`https://cb-api.caregiverhospital.com/payment/verify-customer/${meterNumber}/`
			);

			const result = await response.json();

			if (response.ok) {
				setVerificationStatus({
					verified: true,
					message: "Meter number verified successfully!",
				});
				showMessage({
					message: "Success",
					description: "Meter number verified successfully!",
					type: "success",
					backgroundColor: "#008000",
					color: "#fff",
					textStyle: { fontFamily: "GilroyMedium" },
				});
				// Navigate to home or payment screen after successful verification
				setTimeout(() => {
					router.push("/(routes)/login");
				}, 1500);
			} else {
				throw new Error(
					result?.detail || "Failed to verify meter number. Please try again."
				);
			}
		} catch (error: any) {
			console.error("Verification Error:", error);
			setVerificationStatus({
				verified: false,
				message: error.message || "Invalid meter number",
			});
			showMessage({
				message: "Error",
				description: error.message || "Invalid meter number",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
		} finally {
			setButtonSpiner(false);
		}
	};

	return (
		<LinearGradient
			colors={["#F6F6F6", "#F6F6F6", "#F6F6F6"]}
			style={{ flex: 1 }}
		>
			<CustomHeader title='Meter Verification' showHistory={true} />
			<SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
				<StatusBar
					barStyle='light-content'
					backgroundColor='#008000'
					translucent={false}
				/>

				<ScrollView showsVerticalScrollIndicator={false}>
					<View>
						<View style={styles.successCirle}>
							<Image
								style={{ alignSelf: "center" }}
								source={require("@/assets/images/CheckCircle3.png")}
							/>
							<Text style={styles.status}>Request Sent</Text>
							<Spacer size={6} />
							<Text style={styles.message}>
								You will be contacted via call from our Agents when your meter
								is Ready, Thank you.
							</Text>
						</View>
						<Spacer size={20} />
						<Text style={styles.message}>
							If you have received your Meter, validate the Meter Number below
							to Proceed
						</Text>
						<Spacer size={10} />
						<View
							style={[
								styles.TextInput,
								focusedInput === "meterNumber" && {
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
									<TextInput
										maxLength={20}
										placeholder='Enter Meter Number'
										placeholderTextColor='#212121'
										style={styles.inputText2}
										value={meterNumber}
										onChangeText={setMeterNumber}
										onFocus={() => setFocusedInput("meterNumber")}
										onBlur={() => setFocusedInput(null)}
										keyboardType='numeric'
									/>
								</View>
							</View>
						</View>

						{verificationStatus && (
							<>
								<Spacer size={10} />
								<Text
									style={{
										color: verificationStatus.verified ? "#008000" : "#FF3B30",
										fontFamily: "GilroyMedium",
										textAlign: "center",
									}}
								>
									{verificationStatus.message}
								</Text>
							</>
						)}

						<Spacer size={16} />

						<TouchableOpacity
							style={styles.btnContainer}
							onPress={verifyMeterNumber}
							disabled={buttonSpinner}
						>
							{buttonSpinner ? (
								<ActivityIndicator size='small' color='#ffffff' />
							) : (
								<Text style={styles.btnContent}>Validate Meter</Text>
							)}
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
