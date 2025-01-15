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

type User = {
	id: string;
	name: string;
	user_id: string;
	email: string;
};

export default function HomeScreen() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const accountNumberSheetRef = useRef<BottomSheet>(null);
	const meterNumberSheetRef = useRef<BottomSheet>(null);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const snapPoints = useMemo(() => ["30%", "35%"], []);
	const [user, setUser] = useState<User | null>(null);
	const [payments, setPayments] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchUserData = async () => {
		setLoading(true);
		try {
			const userId = await AsyncStorage.getItem("userId");
			if (!userId) {
				router.push("/login");
				return;
			}

			const response = await fetch(
				`https://api.shalomescort.org/vendor/${userId}/`
			);
			if (!response.ok) {
				throw new Error(`Failed to fetch user data: ${response.statusText}`);
			}

			const data = await response.json();
			setUser({
				id: data.id,
				name: data.name,
				user_id: data.user_id,
				email: data.email,
			});
			setPayments(data.payments || []); // Store payments in state
		} catch (error) {
			console.error("Failed to fetch user data:", error);
		} finally {
			setLoading(false);
		}
	};

	// Call fetchUserData when the component mounts
	useEffect(() => {
		fetchUserData();
	}, []);

	useState(false);
	const [selectedPaymentType, setSelectedPaymentType] =
		useState<string>("Post Paid");
	const [accountNumber, setAccountNumber] = useState("");
	const [meterNumber, setMeterNumber] = useState("");

	const formatEmail = (email: string | undefined) => {
		const firstPartLength = 4; // First part of the email before "****"
		if (email) {
			const [localPart, domain] = email.split("@");
			if (localPart.length > firstPartLength) {
				return (
					localPart.slice(0, firstPartLength) +
					"****" +
					localPart.slice(-3) +
					"@" +
					domain
				);
			}
		}
		return email || ""; // Return the email or empty string if undefined
	};

	const handleSheetChanges = useCallback((index: number) => {
		setIsBottomSheetOpen(index >= 0);
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
			<StatusBar
				barStyle='light-content'
				backgroundColor='#17CE89'
				translucent={false}
			/>

			<View style={styles.headerArea}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
					<Image source={require("@/assets/images/Frame 43986.png")} />
					<View>
						{user && (
							<Text
								style={{
									color: "#25396F",
									fontSize: 16,
									fontFamily: "GilroyMedium",
								}}
							>
								Welcome, {user.name || "User"}!
							</Text>
						)}

						<Spacer size={4} />
					</View>
				</View>
				<Image source={require("@/assets/images/notification-bing.png")} />
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Spacer size={20} />
				<View style={{ paddingHorizontal: 20 }}>
					<View style={styles.walletContainer}>
						<View style={styles.walletContent}>
							<Text style={styles.walletText}>Total Transactions</Text>
							<Image source={require("@/assets/images/vector copy.png")} />
						</View>
						<Spacer size={4} />

						<Text
							style={[styles.walletAmount, { color: "#25396F", fontSize: 26 }]}
						>
							<Text
								style={[
									styles.walletAmount,
									{ color: "#25396F", fontSize: 14 },
								]}
							>
								N
							</Text>{" "}
							1,250,000.00
						</Text>
						<Spacer size={16} />

						{/* <TouchableOpacity
							style={styles.bottomArea}
							onPress={() => router.push("/(routes)/stats")}
						>
							<Image source={require("@/assets/images/ChartDonut.png")} />

							<Text style={styles.walletAmountSmall}>
								View Transaction Stats
							</Text>
						</TouchableOpacity> */}
						<Spacer size={16} />
						{/* <View style={styles.newBorder}></View> */}

						{/* <TouchableOpacity
							style={styles.btnContainer}
							// onPress={handleOpenBottomSheet}
							onPress={() => {
								console.log("Account Number:", meterNumber);
								accountNumberSheetRef.current?.close();
								router.push("/(routes)/water");
							}}
						>
							<Text style={styles.btnContent}>Buy Power</Text>
						</TouchableOpacity> */}
					</View>
				</View>
				{/* <Spacer size={30} /> */}

				<View style={styles.transactionContainer}>
					<Text style={styles.transactionBody}>Quick Actions</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						gap: 24,
						paddingHorizontal: 20,
						marginVertical: 16,
					}}
				>
					<TouchableOpacity
						style={{
							backgroundColor: "#ffffff",
							borderRadius: 12,
							padding: 16,
							flex: 1,
						}}
						onPress={() => {
							router.push("/(routes)/water");
						}}
					>
						<Image source={require("@/assets/images/Icon container (2).png")} />
						<Spacer size={6} />
						<Text
							style={{
								fontFamily: "GilroySemiBold",
								fontSize: 16,
								color: "#25396F",
							}}
						>
							Create New Payment
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							backgroundColor: "#ffffff",
							borderRadius: 12,
							padding: 16,
							flex: 1,
						}}
					>
						<Image source={require("@/assets/images/Icon container (3).png")} />
						<Spacer size={6} />
						<Text
							style={{
								fontFamily: "GilroySemiBold",
								fontSize: 16,
								color: "#25396F",
							}}
						>
							My Transactions
						</Text>
					</TouchableOpacity>
				</View>

				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<View style={styles.transactionContainer}>
						<Text style={styles.transactionBody}>Payment History</Text>
						<TouchableOpacity onPress={() => router.push("/(routes)/details")}>
							<Text style={styles.viewAll}>View all</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View>
					{/* <ActivityIndicator size='large' color='#008000' /> */}

					{payments.map((payment) => (
						<TouchableOpacity key={payment.id} style={styles.transactionList}>
							<View>
								<Text style={styles.bottomText}>Amount</Text>
								<Spacer size={4} />
								<Text style={styles.topText}>
									NGN {payment.products[0]?.amount || "N/A"}
								</Text>
								<Spacer size={10} />
								<Text style={styles.bottomText}>Beneficiary</Text>
								<Spacer size={4} />
								<Text style={styles.topText}>
									{payment.beneficiarys[0]?.first_name}{" "}
									{payment.beneficiarys[0]?.last_name || "N/A"}
								</Text>
							</View>
							<View
								style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
							>
								<Text
									style={{
										backgroundColor: "#EEFCF6",
										color: "#35C78A",
										padding: 10,
										borderRadius: 100,
									}}
								>
									{payment.beneficiarys[0]?.first_name || "N/A"}
								</Text>
								<Spacer size={10} />
								<Text style={styles.bottomText}>Date</Text>
								<Text style={styles.topText}>
									{new Date(payment.pub_date).toLocaleString() || "N/A"}
								</Text>
							</View>
						</TouchableOpacity>
					))}

					{/* <View
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
							gap: 6,
							height: 300,
						}}
					>
						<Image source={require("@/assets/images/bin.png")} />
						<Text style={[styles.walletAmountSmall, { color: "#00000055" }]}>
							No transactions found
						</Text>
					</View> */}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
