import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	StatusBar,
	TextInput,
	ActivityIndicator,
	RefreshControl,
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
	const [refreshing, setRefreshing] = useState(false); // state to track refresh

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
			setRefreshing(false); // stop refreshing after data is loaded
		}
	};

	// Call fetchUserData when the component mounts
	useEffect(() => {
		fetchUserData();
	}, []);

	// Function to handle refresh when user pulls down
	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		fetchUserData(); // Fetch data again to refresh the screen
	}, []);

	const totalAmount = useMemo(() => {
		return payments.reduce((sum, payment) => {
			// Retrieve amount and quantity, ensuring they default to 0 if not present
			const amount = parseFloat(payment.products[0]?.amount || "0");
			const quantity = parseFloat(payment.products[0]?.quantity || "0");
			return sum + amount * quantity; // Multiply amount by quantity
		}, 0);
	}, [payments]);

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

			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh} // Trigger the refresh when user pulls down
					/>
				}
			>
				{/* <Spacer size={20} />
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
							></Text>{" "}
							{totalAmount.toLocaleString("en-NG", {
								style: "currency",
								currency: "NGN",
							})}
						</Text>
						<Spacer size={16} />
						<Spacer size={16} />
					</View>
				</View> */}

				<Spacer size={16} />

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
						onPress={() => router.push("/(routes)/details")}
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
					{payments
						.sort(
							(a, b) =>
								new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime()
						) // Sort by latest date
						.slice(0, 5) // Limit to 5 transactions
						.map((payment) => (
							<TouchableOpacity
								key={payment.id}
								style={styles.transactionList}
								onPress={async () => {
									try {
										await AsyncStorage.setItem("selectedPaymentId", payment.id); // Store payment ID
										router.push("/(routes)/waterReciept"); // Navigate to the payment receipt screen
									} catch (error) {
										console.error("Error storing payment ID:", error);
									}
								}}
							>
								<View>
									<Text style={styles.bottomText}>Amount</Text>
									<Spacer size={4} />
									<Text style={styles.topText}>
										NGN {payment.products[0]?.amount || "N/A"} x{" "}
										{payment.products[0]?.quantity || "N/A"}
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
										Completed
									</Text>
									<Spacer size={10} />
									<Text style={styles.bottomText}>Date</Text>
									<Text style={styles.topText}>
										{new Date(payment.date).toLocaleString() || "N/A"}
									</Text>
								</View>
							</TouchableOpacity>
						))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
