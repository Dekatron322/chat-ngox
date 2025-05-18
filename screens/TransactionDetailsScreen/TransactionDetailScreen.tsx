import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	StatusBar,
	TextInput,
	ActivityIndicator,
} from "react-native";
import React, {
	useRef,
	useMemo,
	useCallback,
	useState,
	useEffect,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";
import { styles } from "../../styles/general/general";
import BottomSheet from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";

type Transaction = {
	id: string;
	customerName: string;
	amount: string;
	pub_date: string;
	paymentChannelAmount: string;
};

type User = {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	agentId: string;
	collectionLimit: string;
};

export default function TransactionScreen() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const accountNumberSheetRef = useRef<BottomSheet>(null);
	const meterNumberSheetRef = useRef<BottomSheet>(null);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const snapPoints = useMemo(() => ["50%", "100%"], []);
	const validateSnapPoints = useMemo(() => ["50%", "100%"], []);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [isAccountNumberSheetOpen, setIsAccountNumberSheetOpen] =
		useState(false);
	const [selectedPaymentType, setSelectedPaymentType] =
		useState<string>("Post Paid");
	const [accountNumber, setAccountNumber] = useState("");
	const [meterNumber, setMeterNumber] = useState("");
	const [user, setUser] = useState<User | null>(null);
	const [customerName, setCustomerName] = useState(""); // To store the customer's name

	const handleSelectPaymentType = (type: string) => {
		setSelectedPaymentType(type);
	};

	const handleOpenBottomSheet = useCallback(() => {
		bottomSheetRef.current?.expand();
	}, []);

	const handleSheetChanges = useCallback((index: number) => {
		setIsBottomSheetOpen(index >= 0);
	}, []);

	const handleValidate = () => {
		if (selectedPaymentType === "Post Paid") {
			bottomSheetRef.current?.close();
			accountNumberSheetRef.current?.expand();
		} else if (selectedPaymentType === "Prepaid") {
			bottomSheetRef.current?.close();
			meterNumberSheetRef.current?.expand();
		}
	};

	const fetchUserData = async () => {
		try {
			// Retrieve user ID from AsyncStorage
			const userId = await AsyncStorage.getItem("userId");

			if (userId) {
				const response = await fetch(
					`https://cb-api.caregiverhospital.com/custom-user/get-user-detail/${userId}/`
				);
				const data = await response.json();

				// Set user information
				const {
					id,
					first_name,
					last_name,
					username,
					agentId,
					collectionLimit,
				} = data;
				setUser({
					id,
					first_name,
					last_name,
					username,
					agentId,
					collectionLimit,
				});

				// Check if transactions exist
				if (data.transactions) {
					setTransactions(data.transactions);
				} else {
					setTransactions([]);
				}
			} else {
				console.error("No user ID found.");
			}
		} catch (error) {
			console.error("Failed to fetch user data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	const handleValidateMeterNumber = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`https://kad-api.fyber.site/payment/verify-customer/${meterNumber}/`
			);
			const data = await response.json();
			console.log("Response data:", data);

			if (response.ok && data.status) {
				meterNumberSheetRef.current?.close();

				// Check selected payment type and route accordingly
				if (selectedPaymentType === "Post Paid") {
					router.push({
						pathname: "/(routes)/power", // Post Paid routing
						params: {
							meterNumber: meterNumber,
							customerName: data.data.customerName,
							customerAddress: data.data.customerAddress,
							customerState: data.data.customerState,
							amount: data.amount,
							transactionId: data.id,
							longitude: data.data.longitude,
							latitude: data.data.laitude,
							pub_date: data.data.pub_date,
						},
					});
				} else {
					router.push({
						pathname: "/(routes)/water", // Prepaid routing
						params: {
							meterNumber: meterNumber,
							customerName: data.data.customerName,
							customerAddress: data.data.customerAddress,
							customerState: data.data.customerState,
							amount: data.amount,
							transactionId: data.id,
							longitude: data.data.longitude,
							latitude: data.data.laitude,
							pub_date: data.data.pub_date,
						},
					});
				}
			} else {
				alert("Invalid meter number. Please try again.");
			}
		} catch (error) {
			console.error("Failed to validate meter number:", error);
			alert("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (transactions.length > 0) {
			setLoading(false); // Once transactions are fetched, stop loading
		}
	}, [transactions]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
			<StatusBar
				barStyle='light-content'
				backgroundColor='#008000'
				translucent={false}
			/>
			<CustomHeader title='Transaction History' showHistory={true} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ paddingHorizontal: 20 }}>
					{loading ? (
						<ActivityIndicator size='large' color='#008000' />
					) : transactions.length > 0 ? (
						transactions
							.sort(
								(a, b) =>
									new Date(b.pub_date).getTime() -
									new Date(a.pub_date).getTime()
							) // Sort by date, most recent first

							.map((transaction) => (
								<TouchableOpacity
									style={styles.transactionList}
									key={transaction.id}
									onPress={() =>
										router.push({
											pathname: "/(routes)/waterReciept",
											params: { transactionId: transaction.id }, // Passing transactionId as a parameter
										})
									}
								>
									<View style={styles.tranLHS}>
										<Image
											source={require("@/assets/images/money.png")}
											style={{ height: 30, width: 30 }}
										/>
										<View>
											<Text style={styles.topText}>
												{transaction.customerName}
											</Text>
											<Spacer size={4} />
											<Text style={styles.bottomText}>
												{new Date(transaction.pub_date).toLocaleString()}
											</Text>
										</View>
									</View>
									<View>
										<Text style={styles.amount}>
											{" "}
											+₦
											{transaction.amount
												? transaction.amount
												: transaction.paymentChannelAmount}
										</Text>
									</View>
								</TouchableOpacity>
							))
					) : (
						<Text>No transactions found</Text>
					)}
				</View>
			</ScrollView>
			{isBottomSheetOpen && <View style={styles.overlay} />}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose={true}
				onChange={handleSheetChanges}
			>
				<View style={{ flex: 1 }}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingVertical: 10,
							paddingHorizontal: 20,
						}}
					>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={styles.bottomSheetTitle}>Payment Type</Text>
							<Feather
								name='x'
								size={18}
								onPress={() => bottomSheetRef.current?.close()}
							/>
						</View>
						<Spacer size={16} />
						<View style={styles.bottomSheetSelect}>
							<TouchableOpacity
								style={styles.bottomSheetContent}
								onPress={() => handleSelectPaymentType("Post Paid")}
							>
								<View style={styles.bottomSheetInner}>
									<Image source={require("@/assets/images/Group2.png")} />
									<Text style={{ fontSize: 16, fontFamily: "LufgaMedium" }}>
										Post Paid
									</Text>
								</View>
								{selectedPaymentType === "Post Paid" && (
									<Image source={require("@/assets/images/CheckCircle.png")} />
								)}
							</TouchableOpacity>
							<Spacer size={6} />
							<View style={styles.newBorder}></View>
							<Spacer size={6} />
							<TouchableOpacity
								style={styles.bottomSheetContent}
								onPress={() => handleSelectPaymentType("Prepaid")}
							>
								<View style={styles.bottomSheetInner}>
									<Image source={require("@/assets/images/Group2.png")} />
									<Text style={{ fontSize: 16, fontFamily: "LufgaMedium" }}>
										Prepaid
									</Text>
								</View>
								{selectedPaymentType === "Prepaid" && (
									<Image source={require("@/assets/images/CheckCircle.png")} />
								)}
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							style={styles.btnContainer}
							onPress={handleValidate}
						>
							<Text style={styles.btnContent}>Validate</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</BottomSheet>

			<BottomSheet
				ref={accountNumberSheetRef}
				index={-1}
				snapPoints={validateSnapPoints}
				enablePanDownToClose={true}
				onChange={handleSheetChanges}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 20 }}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={styles.bottomSheetTitle}>Enter Account Number</Text>
							<Feather
								name='x'
								size={18}
								onPress={() => accountNumberSheetRef.current?.close()}
							/>
						</View>
						<Spacer size={16} />
						<View>
							<TextInput
								keyboardType='number-pad'
								maxLength={100}
								placeholder='123456789'
								placeholderTextColor='#212121'
								style={styles.textInputStyle}
								value={meterNumber}
								onChangeText={setMeterNumber}
							/>
						</View>
						<Spacer size={16} />
						<TouchableOpacity
							style={styles.btnContainer}
							onPress={handleValidateMeterNumber}
						>
							<Text style={styles.btnContent}>
								{loading ? "Validating..." : "Validate"}
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</BottomSheet>
			<BottomSheet
				ref={meterNumberSheetRef}
				index={-1}
				snapPoints={["50%", "100%"]}
				enablePanDownToClose={true}
				onChange={() => {}}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingVertical: 10,
					}}
				>
					<View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 20 }}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={styles.bottomSheetTitle}>Enter Meter Number</Text>
							<Feather
								name='x'
								size={18}
								onPress={() => meterNumberSheetRef.current?.close()}
							/>
						</View>
						<Spacer size={16} />
						<View>
							<TextInput
								keyboardType='number-pad'
								maxLength={100}
								placeholder='123456789'
								placeholderTextColor='#212121'
								style={styles.textInputStyle}
								value={meterNumber}
								onChangeText={setMeterNumber}
							/>
						</View>
						<Spacer size={16} />
						<TouchableOpacity
							style={styles.btnContainer}
							onPress={handleValidateMeterNumber}
							disabled={loading}
						>
							<Text style={styles.btnContent}>
								{loading ? "Validating..." : "Validate"}
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</BottomSheet>
		</SafeAreaView>
	);
}
