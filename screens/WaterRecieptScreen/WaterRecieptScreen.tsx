import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/general/general";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";

export default function PowerRecieptScreen() {
	const [paymentDetails, setPaymentDetails] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchPaymentDetails = async () => {
		setLoading(true);
		try {
			const paymentId = await AsyncStorage.getItem("selectedPaymentId");
			if (!paymentId) {
				console.error("No payment ID found");
				return;
			}

			const response = await fetch(
				`https://api.donorsrec.chats.cash/payment/payment/${paymentId}/`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch payment details");
			}

			const data = await response.json();
			setPaymentDetails(data); // Store payment details in state
		} catch (error) {
			console.error("Error fetching payment details:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPaymentDetails();
	}, []);

	const calculateTotalTransaction = () => {
		if (!paymentDetails?.products) return 0;

		return paymentDetails.products.reduce((total: number, product: any) => {
			const productAmount = parseFloat(product.amount) || 0;
			const productQuantity = product.quantity || 0;
			return total + productAmount * productQuantity;
		}, 0);
	};

	const totalTransaction = calculateTotalTransaction();

	if (loading) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size='large' color='#17CE89' />
			</SafeAreaView>
		);
	}

	if (!paymentDetails) {
		return (
			<SafeAreaView style={styles.container}>
				<Text>No payment details found</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Spacer size={6} />
			<CustomHeader title='Transaction Details' showHistory={true} />
			<ScrollView showsHorizontalScrollIndicator={false}>
				<Spacer size={16} />
				<View style={{ paddingHorizontal: 24 }}>
					<Text
						style={{
							textAlign: "center",
							fontFamily: "GilroySemiBold",
							color: "#25396F",
							fontSize: 18,
						}}
					>
						{paymentDetails.campaign_name || "N/A"}
					</Text>
					<Spacer size={10} />
					<View
						style={{
							flex: 1,
							justifyContent: "space-between",
							borderStyle: "dashed",
							borderColor: "#707FA3",
							borderWidth: 1,
							borderRadius: 8,
							padding: 16,
							backgroundColor: "#F5F6F8",
						}}
					>
						<View
							style={{
								justifyContent: "space-between",
								flexDirection: "row",
								alignItems: "flex-start",
							}}
						>
							<View>
								<Text
									style={{
										color: "#707FA3",
										fontFamily: "GilroyRegular",
										fontSize: 12,
										marginBottom: 4,
									}}
								>
									Beneficiary
								</Text>
								<Text style={{ fontFamily: "GilroyMedium", color: "#25396F" }}>
									{paymentDetails.beneficiarys[0]?.first_name}{" "}
									{paymentDetails.beneficiarys[0]?.last_name || "N/A"}
								</Text>
							</View>
							{/* <View>
								<Text
									style={{
										color: "#707FA3",
										fontFamily: "GilroyRegular",
										fontSize: 12,
										marginBottom: 4,
									}}
								>
									Amount
								</Text>
								<Text style={{ fontFamily: "GilroyMedium", color: "#25396F" }}>
									NGN {paymentDetails.products[0]?.amount || "N/A"}
								</Text>
							</View> */}
						</View>
						<Spacer size={20} />

						<View
							style={{
								justifyContent: "space-between",
								flexDirection: "row",
							}}
						>
							<View>
								<Text
									style={{
										color: "#707FA3",
										fontFamily: "GilroyRegular",
										fontSize: 12,
										marginBottom: 4,
									}}
								>
									DATE
								</Text>
								<Text style={{ fontFamily: "GilroyMedium", color: "#25396F" }}>
									{new Date(paymentDetails.pub_date).toLocaleString()}
								</Text>
							</View>
							<View>
								<Text
									style={{
										color: "#707FA3",
										fontFamily: "GilroyRegular",
										fontSize: 12,
										marginBottom: 4,
									}}
								>
									Status
								</Text>
								<Text style={{ fontFamily: "GilroyMedium", color: "#25396F" }}>
									Completed
								</Text>
							</View>
						</View>
						<Spacer size={28} />
						<Text
							style={{
								fontFamily: "GilroyMedium",
								color: "#25396F",
								fontSize: 16,
							}}
						>
							Product/Service:
						</Text>
						{paymentDetails.products?.map((product: any, index: number) => (
							<View
								key={index}
								style={{
									paddingVertical: 12,
								}}
							>
								<Text
									style={{
										color: "#707FA3",
										fontFamily: "GilroyRegular",
										fontSize: 14,
									}}
								>
									{product.name || "N/A"} (Price:{product.amount} - Qty:
									{product.quantity})
								</Text>
								{/* <Text
									style={{
										color: "#707FA3",
										fontFamily: "GilroyRegular",
										fontSize: 14,
									}}
								>
									Amount: NGN {product.amount || "N/A"}
								</Text> */}
							</View>
						))}
					</View>
					<Spacer size={10} />
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text
							style={{
								color: "#707FA3",
								fontFamily: "GilroyRegular",
								fontSize: 14,
							}}
						>
							Total Transaction
						</Text>
						<Text
							style={{
								fontFamily: "GilroyMedium",
								color: "#25396F",
								fontSize: 14,
							}}
						>
							NGN {totalTransaction.toFixed(2)}
						</Text>
					</View>

					{/* List of products */}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
