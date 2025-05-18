import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	StatusBar,
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
import * as Clipboard from "expo-clipboard";

type User = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	meter_number: string;
	accountNumber: string; // added
};

type Transaction = {
	id: string;
	customerName: string;
	amount: string;
	pub_date: string;
	paymentChannelAmount: string;
};

export default function HomeScreen() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const snapPoints = useMemo(() => ["30%", "35%"], []);

	const [user, setUser] = useState<User | null>(null);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [walletBalance, setWalletBalance] = useState<number | null>(null);
	const [accountNumber, setAccountNumber] = useState<string>(""); // new state

	const fetchUserData = async () => {
		try {
			const userId = await AsyncStorage.getItem("userId");
			if (!userId) {
				console.error("No user ID found.");
				return;
			}
			const userRes = await fetch(
				`https://cb-api.caregiverhospital.com/custom-user/get-user-detail/${userId}/`
			);
			const userData = await userRes.json();

			setUser({
				id: userData.id,
				first_name: userData.first_name,
				last_name: userData.last_name,
				email: userData.email,
				meter_number: userData.meter_number,
				accountNumber: userData.accountNumber, // save it
			});
			setAccountNumber(userData.accountNumber); // save to local state
			setTransactions(userData.transactions ?? []);
			fetchBalance(userId);
		} catch (error) {
			console.error("Failed to fetch user data:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchBalance = async (userId: string) => {
		try {
			const balRes = await fetch(
				`https://cb-api.caregiverhospital.com/custom-user/get-balance/${userId}/`
			);
			const balData = await balRes.json();
			setWalletBalance(balData.balance);
		} catch (error) {
			console.error("Failed to fetch balance:", error);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	const formatEmail = (email: string | undefined) => {
		const firstPartLength = 4;
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
		return email || "";
	};

	const handleSheetChanges = useCallback((index: number) => {
		setIsBottomSheetOpen(index >= 0);
	}, []);

	const copyToClipboard = async () => {
		if (accountNumber) {
			await Clipboard.setStringAsync(accountNumber);
			// You might want to show a toast or alert to confirm the copy
			alert("Account number copied to clipboard!");
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
			<StatusBar
				barStyle='light-content'
				backgroundColor='#008000'
				translucent={false}
			/>

			{/* Header */}
			<View style={styles.headerArea}>
				<Image
					source={require("@/assets/images/LOGO-HORIZONTAL-COLOUR (1).png")}
				/>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
					<View>
						<Text style={styles.johnDoe}>Welcome, {user?.first_name} </Text>
						<Spacer size={4} />
						<Text style={styles.posId}>{formatEmail(user?.email)}</Text>
					</View>
					<Image source={require("@/assets/images/Group.png")} />
				</View>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				<Spacer size={20} />

				{/* Wallet Card */}
				<View style={{ paddingHorizontal: 20 }}>
					<View style={styles.walletContainer}>
						<View style={styles.walletContent}>
							<Text style={styles.walletText}>Wallet Balance</Text>
							<Image source={require("@/assets/images/Eye.png")} />
						</View>
						<Spacer size={4} />
						{walletBalance !== null ? (
							<Text
								style={[
									styles.walletAmount,
									{ color: "#008000", fontSize: 26 },
								]}
							>
								₦{walletBalance}.00
							</Text>
						) : (
							<ActivityIndicator size='small' color='#008000' />
						)}
						<Spacer size={16} />
						<View style={styles.newBorder} />
						<Spacer size={16} />
						<TouchableOpacity
							style={styles.bottomArea}
							onPress={() => router.push("/(routes)/stats")}
						>
							<Image source={require("@/assets/images/ChartDonut.png")} />
							<Text style={styles.walletAmountSmall}>
								View Transaction Stats
							</Text>
						</TouchableOpacity>
						<Spacer size={16} />
						<View style={styles.newBorder} />
						<Spacer size={16} />

						{/* Two buttons side by side */}
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								gap: 10,
							}}
						>
							<TouchableOpacity
								style={styles.btnContainer}
								onPress={() => {
									router.push("/(routes)/water");
								}}
							>
								<Text style={styles.btnContent}>Buy Power</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.btnContainer2}
								onPress={() => {
									bottomSheetRef.current?.expand();
								}}
							>
								<Text style={styles.btnContent2}>Top Up Wallet</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<Spacer size={30} />
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<View style={styles.transactionContainer}>
						<Text style={styles.transactionBody}>Transaction History</Text>
						<TouchableOpacity onPress={() => router.push("/(routes)/details")}>
							<Text style={styles.viewAll}>View all</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Transaction History */}
				<View style={{ paddingHorizontal: 20 }}>
					{loading ? (
						<ActivityIndicator size='large' color='#008000' />
					) : transactions.length > 0 ? (
						transactions
							.sort(
								(a, b) =>
									new Date(b.pub_date).getTime() -
									new Date(a.pub_date).getTime()
							)
							.slice(0, 7)
							.map((transaction) => (
								<TouchableOpacity
									style={styles.transactionList}
									key={transaction.id}
									onPress={() =>
										router.push({
											pathname: "/(routes)/waterReciept",
											params: { transactionId: transaction.id },
										})
									}
								>
									<View style={styles.tranLHS}>
										<Image
											source={require("@/assets/images/payment.png")}
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
											+₦
											{transaction.amount || transaction.paymentChannelAmount}
										</Text>
									</View>
								</TouchableOpacity>
							))
					) : (
						<View
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
						</View>
					)}
				</View>
			</ScrollView>

			{isBottomSheetOpen && <View style={styles.overlay} />}

			{/* Bottom Sheet for Top Up */}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose
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
							<Text style={styles.bottomSheetTitle}>Top Up Wallet</Text>
							<Feather
								name='x'
								size={18}
								onPress={() => bottomSheetRef.current?.close()}
							/>
						</View>
						<Spacer size={16} />

						{/* Dynamic account number */}
						<View style={styles.transactionList}>
							<View style={styles.tranLHS}>
								<Image
									source={require("@/assets/images/top-up.png")}
									style={{ height: 40, width: 40 }}
								/>
								<View>
									<Text style={styles.topText}>Paga</Text>
									<Spacer size={4} />
									<Text style={styles.bottomText}>Bank Name</Text>
								</View>
							</View>
							<View style={{ flexDirection: "row", gap: 6 }}>
								<View>
									<Text style={styles.amount}>{accountNumber}</Text>
									<Text style={styles.bottomText}>Account Number</Text>
								</View>
								<TouchableOpacity onPress={copyToClipboard}>
									<Image
										source={require("@/assets/images/CopySimple.png")}
										style={{ height: 20, width: 20 }}
									/>
								</TouchableOpacity>
							</View>
						</View>

						<Spacer size={4} />
						<Text style={styles.bottomText}>
							Money Transfers sent to this wallet will top up your Paga account
							automatically and can be used for transactions
						</Text>
					</ScrollView>
				</View>
			</BottomSheet>
		</SafeAreaView>
	);
}
