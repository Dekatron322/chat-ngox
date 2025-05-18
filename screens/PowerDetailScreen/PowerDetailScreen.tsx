import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	Alert,
	Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/general/general";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router, useLocalSearchParams } from "expo-router";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
import { Audio } from "expo-av";
import { showMessage } from "react-native-flash-message";

export default function PaymentDetailScreen() {
	const [buttonSpinner, setButtonSpiner] = useState(false);

	// Extracting the necessary payment details from the params
	const {
		agentId,
		amount,
		token,
		result,
		checkoutUrl,
		customerName,
		meterNumber,
		totalUnitVended,
		reference,
	} = useLocalSearchParams();

	// Log the parameters to ensure they are being passed correctly
	useEffect(() => {
		console.log("Params received:", {
			agentId,
			amount,
			token,
			checkoutUrl,
			customerName,
			meterNumber,
			totalUnitVended,
			reference,
		});
	}, [
		agentId,
		amount,
		token,
		checkoutUrl,
		customerName,
		meterNumber,
		totalUnitVended,
		reference,
	]);

	// Handle receipt button press and finalize payment
	const handleFinalizePayment = async () => {
		setButtonSpiner(true);
		try {
			const response = await fetch(
				`https://cb-api.caregiverhospital.com/payment/finalize/online-pay/${reference}/${meterNumber}/`,
				{
					method: "GET",
				}
			);

			const data = await response.json();

			if (response.ok) {
				showMessage({
					message: "Success",
					description: "Payment Finalized Successfully!",
					type: "success",
					backgroundColor: "#008000", // Optional color customization
					color: "#fff", // Text color
					textStyle: { fontFamily: "GilroyMedium" },
				});
				console.log("Payment Successful. Response data:", data);

				const transactionId = data.id; // Extract transactionId
				router.push({
					pathname: "/(routes)/waterReciept",
					params: { transactionId },
				});
			} else {
				console.error("Finalize Payment Failed:", data);
				showMessage({
					message: "Error",
					description: data?.message || "Payment finalization failed.",
					type: "danger",
					backgroundColor: "#FF3B30", // Optional color customization
					textStyle: { fontFamily: "GilroyMedium" },
				});
			}
		} catch (error) {
			console.error("Error finalizing payment:", error);
			showMessage({
				message: "Error",
				description: "An unexpected error occurred. Please try again.",
				type: "danger",
				backgroundColor: "#FF3B30", // Optional color customization
				textStyle: { fontFamily: "GilroyMedium" },
			});
		} finally {
			setButtonSpiner(false);
		}
	};

	// Handle the click on the Paystack checkout URL
	const handleCheckoutUrlPress = () => {
		if (checkoutUrl) {
			const url = Array.isArray(checkoutUrl) ? checkoutUrl[0] : checkoutUrl; // Ensure it's a string
			Linking.openURL(url).catch((err) =>
				Alert.alert("Error", "Failed to open the URL.")
			);
		} else {
			Alert.alert("Error", "Checkout URL is missing.");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Spacer size={8} />
			<CustomHeader title='Payment Details' showHistory={true} />
			<ScrollView showsHorizontalScrollIndicator={false}>
				<Spacer size={28} />
				<View style={{ flex: 1, justifyContent: "space-between" }}>
					<View style={{ paddingHorizontal: 20 }}>
						<View style={styles.waterDetailCard}>
							<Image
								style={{ alignSelf: "center" }}
								source={require("@/assets/images/Group2.png")}
							/>
							<Spacer size={8} />
							<Text
								style={[
									styles.titleText,
									{ fontSize: 20, textAlign: "center" },
								]}
							>
								Power Bill
							</Text>
							<Spacer size={8} />
							<Text style={[styles.titleTextBold, { textAlign: "center" }]}>
								₦{amount}
							</Text>
							<Spacer size={8} />
							<View style={styles.anotherRandomness}>
								<Image
									style={{ alignSelf: "center", height: 14, width: 14 }}
									source={require("@/assets/images/green.png")}
								/>
								<Text style={[styles.textSubTitle, { fontSize: 14 }]}>
									Successful
								</Text>
							</View>
						</View>
						<Spacer size={16} />
						<View style={styles.random}>
							<View style={styles.outer}>
								<Text style={styles.inner}>Meter Number</Text>
								<Text style={styles.anotherInner}>{meterNumber}</Text>
							</View>

							<View style={styles.outer}>
								<Text style={styles.inner}>Reference</Text>
								<Text style={styles.anotherInner}>{reference}</Text>
							</View>

							{checkoutUrl && (
								<TouchableOpacity onPress={handleCheckoutUrlPress}>
									<Text style={styles.inner}>Payment Checkout URL</Text>
									<Text style={[styles.anotherInner, { color: "blue" }]}>
										{checkoutUrl}
									</Text>
								</TouchableOpacity>
							)}
						</View>

						<Spacer size={8} />
					</View>
				</View>
			</ScrollView>
			<TouchableOpacity
				style={{
					flexDirection: "row",
					gap: 10,
					justifyContent: "center",
					backgroundColor: "#ffffff",
					alignItems: "center",
				}}
				onPress={handleFinalizePayment}
				disabled={buttonSpinner}
			>
				<Image
					style={{ alignSelf: "center", height: 20, width: 20 }}
					source={require("@/assets/images/Note1.png")}
				/>
				<Text
					style={{
						paddingVertical: 20,
						color: "#008000",
						fontFamily: "LufgaMedium",
					}}
				>
					{buttonSpinner ? "Finalizing..." : "Finalize Payment"}
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
