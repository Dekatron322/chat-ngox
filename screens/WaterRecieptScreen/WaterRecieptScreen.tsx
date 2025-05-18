import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	ImageBackground,
	Clipboard,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { styles } from "@/styles/general/general";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router, useLocalSearchParams } from "expo-router";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";

interface Transaction {
	amount: string;
	token: string;
	result: string;
	pub_date: string;
	meterNumber: string;
	customerName: string;
	payment_type: string;
	totalUnitVended: string;
	paymentChannelAmount: string;
	latitude: string;
	longitude: string;
	tariffCode: string;
	tariffRate: string;
}

export default function PowerReceiptScreen() {
	const [transaction, setTransaction] = useState<Transaction | null>(null);
	const [loading, setLoading] = useState(true);
	const [savingImage, setSavingImage] = useState(false);
	const { transactionId } = useLocalSearchParams();
	const viewRef = useRef<ViewShot>(null);

	useEffect(() => {
		(async () => {
			try {
				const resp = await fetch(
					`https://cb-api.caregiverhospital.com/transaction/transaction/${transactionId}/`
				);
				const data = await resp.json();
				setTransaction(data);
			} catch (err) {
				console.error(err);
				Alert.alert("Error", "Failed to load transaction.");
			} finally {
				setLoading(false);
			}
		})();
	}, [transactionId]);

	const copyToClipboard = (text: string) => {
		Clipboard.setString(text);
		Alert.alert("Copied", "Transaction result has been copied to clipboard.");
	};

	const handleSaveImage = async () => {
		if (!viewRef.current || !transaction) return;
		try {
			setSavingImage(true);

			// 1) Capture the view as a PNG
			const snapshotUri = await viewRef.current.capture({
				format: "png",
				quality: 0.9,
			});

			// 2) Move it into Documents with a nice name
			const filename = `${FileSystem.documentDirectory}receipt_${transactionId}.png`;
			await FileSystem.moveAsync({
				from: snapshotUri,
				to: filename,
			});

			// 3) Notify user & offer to share
			Alert.alert("Saved", `Image saved to:\n${filename}`);
			await Sharing.shareAsync(filename);
		} catch (err) {
			console.error(err);
			Alert.alert("Error", "Could not save document as image.");
		} finally {
			setSavingImage(false);
		}
	};

	if (loading) {
		return <ActivityIndicator size='large' color='#008000' />;
	}
	if (!transaction) {
		return <Text>No transaction data found</Text>;
	}

	return (
		<SafeAreaView style={styles.container}>
			<Spacer size={6} />
			<CustomHeader title='Transaction Details' showHistory={true} />

			<ScrollView showsVerticalScrollIndicator={false}>
				<Spacer size={28} />
				{/* Wrap entire receipt in ViewShot */}
				<ViewShot ref={viewRef} options={{ format: "png", quality: 0.9 }}>
					<View style={{ paddingHorizontal: 20 }}>
						<ImageBackground
							source={require("@/assets/images/Subtract.png")}
							style={{ width: "100%" }}
							resizeMode='stretch'
						>
							<View style={{ padding: 20, paddingVertical: 40 }}>
								<Image
									style={{ alignSelf: "center" }}
									source={require("@/assets/images/Kad_logo.png")}
								/>
								<Spacer size={16} />
								<Text
									style={[
										styles.titleTextBold,
										{ textAlign: "center", color: "#008000" },
									]}
								>
									+₦{transaction.amount || transaction.paymentChannelAmount}
								</Text>
								<Spacer size={4} />
								<View
									style={{
										gap: 4,
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Text style={[styles.textSubTitle, { color: "#171D19" }]}>
										Successful Transaction
									</Text>
									<Text style={[styles.textSubTitle, { color: "#171D19" }]}>
										{new Date(transaction.pub_date).toLocaleString()}
									</Text>
								</View>
								<Spacer size={8} />
								{transaction.result ? (
									<View style={styles.transactionToken}>
										<Text
											style={[
												styles.textSubTitle,
												{ color: "#008000", fontSize: 16 },
											]}
										>
											Token:
										</Text>
										<Text
											style={[
												styles.textSubTitle,
												{ color: "#008000", fontSize: 16 },
											]}
										>
											{transaction.result}
										</Text>
										<TouchableOpacity
											onPress={() => copyToClipboard(transaction.result)}
										>
											<Image
												source={require("@/assets/images/CopySimple.png")}
												style={{ width: 18, height: 18 }}
											/>
										</TouchableOpacity>
									</View>
								) : (
									<View style={styles.transactionToken}>
										<Text
											style={[
												styles.textSubTitle,
												{
													color: "#008000",
													fontSize: 16,
													textAlign: "center",
													flex: 1,
												},
											]}
										>
											Cash Postpaid
										</Text>
									</View>
								)}
							</View>
							<Image
								style={{ alignSelf: "center" }}
								source={require("@/assets/images/darkline.png")}
							/>
							<View style={styles.transactionCard}>
								{/* Transaction details table */}
								<View style={styles.transactionInner}>
									<Text style={styles.transactionRHS}>Transaction Type</Text>
									<Text style={styles.transactionLHS}>Electricity Bill</Text>
								</View>
								<View style={styles.transactionInner}>
									<Text style={styles.transactionRHS}>Bill Provider</Text>
									<Text style={styles.transactionLHS}>Kaduna Electric</Text>
								</View>
								{transaction.meterNumber && (
									<View style={styles.transactionInner}>
										<Text style={styles.transactionRHS}>Meter Number</Text>
										<Text style={styles.transactionLHS}>
											{transaction.meterNumber}
										</Text>
									</View>
								)}
								<View style={styles.transactionInner}>
									<Text style={styles.transactionRHS}>Order Amount</Text>
									<Text style={styles.transactionLHS}>
										+₦{transaction.amount || transaction.paymentChannelAmount}
									</Text>
								</View>
								<View style={styles.transactionInner}>
									<Text style={styles.transactionRHS}>Customer Name</Text>
									<Text style={styles.transactionLHS}>
										{transaction.customerName}
									</Text>
								</View>
								<View style={styles.transactionInner}>
									<Text style={styles.transactionRHS}>Transaction Date</Text>
									<Text style={styles.transactionLHS}>
										{new Date(transaction.pub_date).toLocaleString()}
									</Text>
								</View>
								<View style={styles.transactionInner}>
									<Text style={styles.transactionRHS}>Unit Purchased</Text>
									<Text style={styles.transactionLHS}>
										{transaction.totalUnitVended} Units
									</Text>
								</View>
								<View style={styles.transactionInner}>
									<Text style={styles.transactionRHS}>Payment Method</Text>
									<Text style={styles.transactionLHS}>
										{transaction.payment_type}
									</Text>
								</View>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										marginVertical: 10,
									}}
								>
									<Text
										style={{
											color: "#00000080",
											fontFamily: "GilroyMedium",
											fontSize: 14,
										}}
									>
										Status
									</Text>
									<Text
										style={{
											color: "#008000",
											fontFamily: "GilroyMedium",
											fontSize: 14,
										}}
									>
										Successful
									</Text>
								</View>
								<View style={styles.transactionInner}>
									<Text style={styles.transactionRHS}>Tariff Code</Text>
									<Text style={styles.transactionLHS}>
										{transaction.tariffCode}
									</Text>
								</View>
								<View style={styles.transactionInner}>
									<Text style={styles.transactionRHS}>Tariff Rate</Text>
									<Text style={styles.transactionLHS}>
										{transaction.tariffRate}
									</Text>
								</View>
							</View>
						</ImageBackground>
					</View>
				</ViewShot>
				<Spacer size={8} />
			</ScrollView>

			{/* Footer buttons */}
			<View
				style={{
					flexDirection: "row",
					gap: 10,
					justifyContent: "space-between",
					backgroundColor: "#fff",
					alignItems: "center",
					paddingHorizontal: 20,
				}}
			>
				<TouchableOpacity
					style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
					onPress={() => router.push("/(tabs)/home")}
				>
					<Image
						style={{ width: 20, height: 20 }}
						source={require("@/assets/images/House.png")}
					/>
					<Text
						style={{
							paddingVertical: 20,
							color: "#008000",
							fontFamily: "LufgaMedium",
						}}
					>
						Return Home
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
					onPress={handleSaveImage}
					disabled={savingImage}
				>
					{savingImage ? (
						<ActivityIndicator size='small' color='#008000' />
					) : (
						<>
							<Image
								style={{ width: 20, height: 20 }}
								source={require("@/assets/images/DownloadSimple.png")}
							/>
							<Text
								style={{
									paddingVertical: 20,
									color: "#008000",
									fontFamily: "LufgaMedium",
								}}
							>
								Save as Image
							</Text>
						</>
					)}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
