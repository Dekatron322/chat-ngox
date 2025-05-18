import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	TextInput,
	ActivityIndicator,
	Alert,
	Modal,
	Pressable,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
import { styles } from "@/styles/general/general";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

type User = {
	id: string;
	meter_number: string;
	pin: string;
};

type CustomerDetails = {
	customerId: string;
	customerAutoNumber: number;
	customerAccountNo: string;
	customerAddress: string;
	customerName: string;
	customerMobileNo: string | null;
	customerState: string;
	feeder33kV: string;
	feeder11KV: string;
	regionalOffice: string;
	serviceCenter: string;
	meterNumber: string;
	customerTransformer: string;
	isPPM: boolean;
	isMD: boolean;
};

export default function PrepaidScreen() {
	const [buttonSpinner, setButtonSpiner] = useState(false);
	const [meterNumber, setMeterNumber] = useState("");
	const PRICE_PER_UNIT = 600;
	const [amount, setAmount] = useState("");
	const [units, setUnits] = useState(0);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [selectedOption, setSelectedOption] = useState("SELF");

	const [showPinModal, setShowPinModal] = useState(false);
	const [pin, setPin] = useState<string[]>(["", "", "", ""]);
	const [pinError, setPinError] = useState("");

	const [showVerificationModal, setShowVerificationModal] = useState(false);
	const [customerDetails, setCustomerDetails] =
		useState<CustomerDetails | null>(null);
	const [verificationLoading, setVerificationLoading] = useState(false);

	const pin1Ref = useRef<TextInput>(null);
	const pin2Ref = useRef<TextInput>(null);
	const pin3Ref = useRef<TextInput>(null);
	const pin4Ref = useRef<TextInput>(null);
	const pinRefs = [pin1Ref, pin2Ref, pin3Ref, pin4Ref] as const;

	const handleAmountChange = (text: string) => {
		const enteredAmount = parseFloat(text) || 0;
		setAmount(text);
		setUnits(enteredAmount / PRICE_PER_UNIT);
	};

	const handleOptionSelect = (option: string) => {
		setSelectedOption(option);
	};

	const fetchUserData = async () => {
		try {
			const userId = await AsyncStorage.getItem("userId");
			if (userId) {
				const response = await fetch(
					`https://cb-api.caregiverhospital.com/custom-user/get-user-detail/${userId}/`
				);
				const data = await response.json();
				const { id, meter_number, pin } = data;
				setUser({ id, meter_number, pin });
			} else {
				console.error("No user ID found.");
			}
		} catch (error) {
			console.error("Failed to fetch user data:", error);
		} finally {
			setLoading(false);
		}
	};

	const handlePinChange = (text: string, index: number) => {
		if (!/^\d?$/.test(text)) return;
		const newPin = [...pin];
		newPin[index] = text;
		setPin(newPin);
		if (pinError) setPinError("");

		if (text && index < pinRefs.length - 1) {
			pinRefs[index + 1].current?.focus();
		}
	};

	const handleKeyPress = (
		e: { nativeEvent: { key: string } },
		index: number
	) => {
		if (e.nativeEvent.key === "Backspace" && pin[index] === "" && index > 0) {
			pinRefs[index - 1].current?.focus();
		}
	};

	useEffect(() => {
		if (showPinModal) {
			setPin(["", "", "", ""]);
			setPinError("");
			setTimeout(() => {
				pin1Ref.current?.focus();
			}, 100);
		}
	}, [showPinModal]);

	const verifyPin = () => {
		const pinString = pin.join("");
		if (pinString.length === 0) {
			setPinError("Please enter your PIN");
			return false;
		}
		if (pinString.length < 4) {
			setPinError("PIN must be 4 digits");
			return false;
		}
		if (user?.pin !== pinString) {
			setPinError("Incorrect PIN");
			return false;
		}
		setPinError("");
		return true;
	};

	const verifyMeterNumber = async () => {
		if (!meterNumber) {
			showMessage({
				message: "Error",
				description: "Please enter a meter number",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			return;
		}

		setVerificationLoading(true);
		try {
			const response = await fetch(
				`https://cb-api.caregiverhospital.com/payment/verify-customer/${meterNumber}/`
			);
			const result = await response.json();

			if (result.status && result.data) {
				setCustomerDetails(result.data);
				setShowVerificationModal(true);
			} else {
				showMessage({
					message: "Error",
					description:
						"Meter number verification failed. Please check the number and try again.",
					type: "danger",
					backgroundColor: "#FF3B30",
					textStyle: { fontFamily: "GilroyMedium" },
				});
			}
		} catch (error) {
			showMessage({
				message: "Error",
				description: "An error occurred during verification. Please try again.",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
		} finally {
			setVerificationLoading(false);
		}
	};

	const handlePaymentConfirmation = () => {
		if (verifyPin()) {
			setShowPinModal(false);
			processPayment();
		}
	};

	const processPayment = async () => {
		if (!user || !user.id || !user.meter_number) {
			showMessage({
				message: "Error",
				description: "User data is not available. Please try again later.",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			return;
		}

		setButtonSpiner(true);

		const paymentData = {
			customerId: user.id,
			agentId: "1",
			meterNumber: selectedOption === "SELF" ? user.meter_number : meterNumber,
			type: "prepaid",
			amount,
			locationOfPayment: "Kaduna",
			channel: "cash",
			notes: "pay",
			telephoneNumber: "08012345678",
			laitude: "1",
			longitude: "1",
		};

		try {
			const response = await fetch(
				`https://cb-api.caregiverhospital.com/payment/wallet-pay/${user.id}/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(paymentData),
				}
			);

			const result = await response.json();

			if (response.ok) {
				showMessage({
					message: "Success",
					description: "Payment initialized successfully.",
					type: "success",
					backgroundColor: "#008000",
					color: "#fff",
					textStyle: { fontFamily: "GilroyMedium" },
				});
				router.push({
					pathname: "/(routes)/waterReciept",
					params: {
						transactionId: result.id.toString(),
					},
				});
			} else {
				showMessage({
					message: "Error",
					description: result?.message || "Payment initialization failed.",
					type: "danger",
					backgroundColor: "#FF3B30",
					textStyle: { fontFamily: "GilroyMedium" },
				});
			}
		} catch (error) {
			showMessage({
				message: "Error",
				description: "An unexpected error occurred. Please try again.",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
		} finally {
			setButtonSpiner(false);
		}
	};

	const initializePayment = async () => {
		if (loading) {
			showMessage({
				message: "Loading",
				description: "User data is still being fetched. Please try again.",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			return;
		}

		if (!user || !user.id || !user.meter_number) {
			showMessage({
				message: "Error",
				description: "User data is not available. Please try again later.",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			return;
		}

		if (!amount || parseFloat(amount) <= 0) {
			showMessage({
				message: "Error",
				description: "Please enter a valid amount.",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			return;
		}

		if (selectedOption === "OTHERS") {
			if (!meterNumber) {
				showMessage({
					message: "Error",
					description: "Please enter the meter number for 'Buy for Others'.",
					type: "danger",
					backgroundColor: "#FF3B30",
					textStyle: { fontFamily: "GilroyMedium" },
				});
				return;
			}
			// For "Buy for Others", verify meter first
			verifyMeterNumber();
		} else {
			// For "Buy for Self", show PIN directly
			setShowPinModal(true);
		}
	};

	const handleVerifiedPayment = () => {
		setShowVerificationModal(false);
		setShowPinModal(true);
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<CustomHeader title='Payment' showHistory={true} />
			<View style={styles.border}></View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Spacer size={20} />
				<View style={{ paddingHorizontal: 20 }}>
					<TouchableOpacity
						style={[styles.headerArea, { borderRadius: 8 }]}
						onPress={() => handleOptionSelect("SELF")}
					>
						<View
							style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
						>
							<View>
								<Text style={styles.johnDoe}>Buy for Self</Text>
								<Spacer size={4} />
								<Text style={styles.posId}>
									Meter Number: {user?.meter_number}
								</Text>
							</View>
						</View>
						{selectedOption === "SELF" && (
							<Image
								style={{ height: 24, width: 24, objectFit: "contain" }}
								source={require("@/assets/images/AccountConfirm.png")}
							/>
						)}
					</TouchableOpacity>
					<Spacer size={16} />
					<TouchableOpacity
						style={[styles.headerArea, { borderRadius: 8 }]}
						onPress={() => handleOptionSelect("OTHERS")}
					>
						<View
							style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
						>
							<View>
								<Text style={styles.johnDoe}>Buy for Others</Text>
								<Spacer size={4} />
							</View>
						</View>
						{selectedOption === "OTHERS" && (
							<Image
								style={{ height: 24, width: 24, objectFit: "contain" }}
								source={require("@/assets/images/AccountConfirm.png")}
							/>
						)}
					</TouchableOpacity>
					<Spacer size={16} />

					<View style={[styles.cardContainer]}>
						{selectedOption === "OTHERS" && (
							<>
								<Text style={styles.info}>Meter Number</Text>
								<TextInput
									maxLength={100}
									placeholder='Enter Meter Number'
									placeholderTextColor='#212121'
									style={styles.enterAmount}
									value={meterNumber}
									onChangeText={setMeterNumber}
								/>
								<View
									style={[styles.newBorder, { borderColor: "#008000" }]}
								></View>
								<Spacer size={16} />
							</>
						)}
						<Text style={styles.info}>Amount</Text>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={{ fontFamily: "LufgaMedium", fontSize: 24 }}>₦</Text>
							<TextInput
								keyboardType='number-pad'
								maxLength={100}
								placeholder='2500'
								placeholderTextColor='#212121'
								style={styles.enterAmount}
								value={amount}
								onChangeText={handleAmountChange}
							/>
						</View>
						<View style={[styles.newBorder, { borderColor: "#008000" }]}></View>
						<Spacer size={16} />
						<Text style={styles.info}>Unit</Text>
						<Spacer size={8} />
						<Text style={{ fontFamily: "LufgaMedium", fontSize: 24 }}>
							{units.toFixed(2)}{" "}
						</Text>
						<Spacer size={8} />
						<TouchableOpacity
							style={[styles.btnContainer, { width: "100%", height: 48 }]}
							onPress={initializePayment}
							disabled={buttonSpinner}
						>
							{buttonSpinner ? (
								<ActivityIndicator size='small' color='#FFFFFF' />
							) : (
								<Text style={styles.btnContent}>Continue</Text>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>

			{/* PIN Verification Modal */}
			<Modal
				animationType='slide'
				transparent
				visible={showPinModal}
				onRequestClose={() => {
					setShowPinModal(false);
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						backgroundColor: "rgba(0,0,0,0.5)",
					}}
				>
					<View
						style={{
							backgroundColor: "white",
							padding: 20,
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
						}}
					>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
								marginBottom: 20,
							}}
						>
							Enter your 4-digit PIN
						</Text>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-evenly",
								marginBottom: 10,
							}}
						>
							{pinRefs.map((ref, idx) => (
								<TextInput
									key={idx}
									ref={ref}
									value={pin[idx]}
									onChangeText={(text) => handlePinChange(text, idx)}
									onKeyPress={(e) => handleKeyPress(e, idx)}
									keyboardType='number-pad'
									maxLength={1}
									secureTextEntry
									style={{
										width: 60,
										height: 60,
										borderWidth: 1,
										borderColor: pinError ? "#FF3B30" : "#E0E0E0",
										borderRadius: 8,
										textAlign: "center",
										fontSize: 24,
									}}
								/>
							))}
						</View>

						{pinError ? (
							<Text style={{ color: "#FF3B30", marginBottom: 10 }}>
								{pinError}
							</Text>
						) : null}

						<View
							style={{ flexDirection: "row", justifyContent: "space-between" }}
						>
							<Pressable
								style={{
									backgroundColor: "#E0E0E0",
									padding: 15,
									borderRadius: 8,
									flex: 1,
									marginRight: 10,
									alignItems: "center",
								}}
								onPress={() => {
									setShowPinModal(false);
									setPin(["", "", "", ""]);
									setPinError("");
								}}
							>
								<Text style={{ color: "#212121" }}>Cancel</Text>
							</Pressable>

							<Pressable
								style={{
									backgroundColor: "#008000",
									padding: 15,
									borderRadius: 8,
									flex: 1,
									marginLeft: 10,
									alignItems: "center",
								}}
								onPress={handlePaymentConfirmation}
							>
								<Text style={{ color: "white" }}>Confirm</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			{/* Meter Verification Modal */}
			<Modal
				animationType='slide'
				transparent
				visible={showVerificationModal}
				onRequestClose={() => {
					setShowVerificationModal(false);
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						backgroundColor: "rgba(0,0,0,0.5)",
					}}
				>
					<View
						style={{
							backgroundColor: "white",
							padding: 20,
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
						}}
					>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
								marginBottom: 20,
								textAlign: "center",
							}}
						>
							Meter Verification
						</Text>

						{customerDetails && (
							<View style={{ marginBottom: 20 }}>
								<View style={styles.verificationRow}>
									<Text style={styles.verificationLabel}>Name:</Text>
									<Text style={styles.verificationValue}>
										{customerDetails.customerName}
									</Text>
								</View>
								<View style={styles.verificationRow}>
									<Text style={styles.verificationLabel}>Account No:</Text>
									<Text style={styles.verificationValue}>
										{customerDetails.customerAccountNo}
									</Text>
								</View>
								<View style={styles.verificationRow}>
									<Text style={styles.verificationLabel}>Address:</Text>
									<Text style={styles.verificationValue}>
										{customerDetails.customerAddress}
									</Text>
								</View>
								<View style={styles.verificationRow}>
									<Text style={styles.verificationLabel}>Amount:</Text>
									<Text style={styles.verificationValue}>₦{amount}</Text>
								</View>
								<View style={styles.verificationRow}>
									<Text style={styles.verificationLabel}>Units:</Text>
									<Text style={styles.verificationValue}>
										{units.toFixed(2)}
									</Text>
								</View>
							</View>
						)}

						<View
							style={{ flexDirection: "row", justifyContent: "space-between" }}
						>
							<Pressable
								style={{
									backgroundColor: "#E0E0E0",
									padding: 15,
									borderRadius: 8,
									flex: 1,
									marginRight: 10,
									alignItems: "center",
								}}
								onPress={() => {
									setShowVerificationModal(false);
								}}
							>
								<Text style={{ color: "#212121" }}>Cancel</Text>
							</Pressable>

							<Pressable
								style={{
									backgroundColor: "#008000",
									padding: 15,
									borderRadius: 8,
									flex: 1,
									marginLeft: 10,
									alignItems: "center",
								}}
								onPress={handleVerifiedPayment}
								disabled={verificationLoading}
							>
								{verificationLoading ? (
									<ActivityIndicator size='small' color='#FFFFFF' />
								) : (
									<Text style={{ color: "white" }}>Confirm</Text>
								)}
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}
