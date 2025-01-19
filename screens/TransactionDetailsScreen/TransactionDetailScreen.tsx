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

type User = {
	id: string;
	name: string;
	user_id: string;
	email: string;
};

export default function TransactionScreen() {
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

			<CustomHeader title='Transaction' showHistory={true} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<Spacer size={20} />

				<View>
					{payments.map((payment) => (
						<TouchableOpacity
							onPress={async () => {
								try {
									await AsyncStorage.setItem("selectedPaymentId", payment.id); // Store payment ID
									router.push("/(routes)/waterReciept"); // Navigate to the payment receipt screen
								} catch (error) {
									console.error("Error storing payment ID:", error);
								}
							}}
							key={payment.id}
							style={styles.transactionList}
						>
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
									Completed
								</Text>
								<Spacer size={10} />
								<Text style={styles.bottomText}>Date</Text>
								<Text style={styles.topText}>
									{new Date(payment.pub_date).toLocaleString() || "N/A"}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
