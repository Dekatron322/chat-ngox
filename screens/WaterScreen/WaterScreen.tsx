import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	SafeAreaView,
} from "react-native";
import { styles } from "@/styles/general/general";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import BottomSheet from "@gorhom/bottom-sheet";
import ProductBottomSheet from "@/components/CustomUIComponets/ProductBottomSheet";
import Feather from "@expo/vector-icons/build/Feather";
import BeneficiaryBottomSheet from "@/components/CustomUIComponets/BeneficiaryBottomSheet";
import CampaignBottomSheet from "@/components/CustomUIComponets/CampaignBottomSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type User = {
	id?: string;
	name: string;
	user_id?: string;
	email: string;
};

type Beneficiary = {
	id: string;
	beneficiary_id: string;
	beneficiary_type: string;
	first_name: string;
	last_name: string;
	gender: string;
	dob: string;
	age: string;
	category: string;
	location: string;
	created_at: string;
	status: boolean;
	pub_date: string;
};

type Campaign = {
	id: string;
	name: string;
	vendor: string;
	price: number;
	quantity: number;
};

type Product = {
	id: string;
	name: string;
	cost: string;
	quantity: number;
	tag: string;
};

type Transaction = {
	id: string;
	customerName: string;
	amount: string;
	pub_date: string;
	paymentChannelAmount: string;
};

export default function PrepaidScreen() {
	const [buttonSpinner, setButtonSpinner] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState<Beneficiary[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
		null
	);
	const [selectedCampaigns, setSelectedCampaigns] = useState<Product[]>([]);
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]); // new state for selected products
	const [userId, setUserId] = useState<string | null>(null); // New state for userId
	const [user, setUser] = useState<User | null>(null);
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const campaigns = [
		{ id: "1", name: "Campaign Alpha", price: "500" },
		{ id: "2", name: "Campaign Beta", price: "500" },
		{ id: "3", name: "Campaign Gamma", price: "500" },
	];

	const beneficiaryBottomSheetRef = useRef<BottomSheet>(null);
	const campaignBottomSheetRef = useRef<BottomSheet>(null);
	const productBottomSheetRef = useRef<BottomSheet>(null);

	// Fetch users from API
	const fetchUserData = async () => {
		setLoading(true);
		try {
			// Retrieve user ID from AsyncStorage
			const fetchedUserId = await AsyncStorage.getItem("userId");
			if (!fetchedUserId) {
				console.error("No user ID found. Redirecting to login...");
				router.push("/login"); // Navigate to login if userId is missing
				return;
			}

			// Log the retrieved userId
			console.log("Retrieved user_id from AsyncStorage:", fetchedUserId);

			// Fetch user data using the retrieved userId
			const response = await fetch(
				`https://api.shalomescort.org/vendor/${fetchedUserId}/`
			);
			if (!response.ok) {
				throw new Error(`Failed to fetch user data: ${response.statusText}`);
			}

			const data = await response.json();

			// Log the fetched data
			console.log("Fetched user data:", data);

			// Set user information
			const { id, name, user_id, email, transactions = [] } = data;
			setUser({ id, name, user_id, email });
			setTransactions(transactions);

			// Set the userId in state
			setUserId(fetchedUserId); // Set the userId in state here
		} catch (error) {
			console.error("Failed to fetch user data:", error);
		} finally {
			setLoading(false);
		}
	};

	// Prepare the payload for the API request
	const preparePayload = () => {
		// Calculate the total cost of selected products
		const totalCost = selectedProducts.reduce((acc, product) => {
			const cost = parseFloat(product.cost) || 0; // Ensure cost is a valid number
			const quantity = product.quantity || 0; // Ensure quantity is a valid number
			return acc + cost * quantity;
		}, 0);

		return {
			beneficiarys: selectedUsers.map((user) => ({
				beneficiary_id: user.beneficiary_id,
				beneficiary_type: user.beneficiary_type,
				first_name: user.first_name,
				last_name: user.last_name,
				gender: user.gender,
				dob: user.dob,
				age: user.age,
				category: user.category,
				location: user.location,
				created_at: user.created_at,
				status: user.status,
				pub_date: new Date().toISOString(),
			})),
			products: selectedProducts.map((product) => ({
				name: product.name,
				amount: product.cost,
				quantity: product.quantity.toString(),
			})),
			campaign_name: selectedCampaign?.name || "",
			vendor_name: selectedCampaign?.vendor || "",
			amount: totalCost, // Set the calculated total cost here
			status: true,
			pub_date: new Date().toISOString(),
		};
	};

	const handlePayment = async () => {
		if (!userId) {
			console.error("User ID is missing");
			router.push("/login"); // Redirect to login if userId is missing
			return;
		}

		const payload = preparePayload();

		try {
			setButtonSpinner(true); // Show spinner while making the request
			const response = await fetch(
				`https://api.shalomescort.org/vendor/add-payment-to-vendor/${userId}/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to add payment to vendor");
			}

			const data = await response.json();
			console.log("Payment successfully added:", data);
			router.push("/(routes)/waterDetail");
			// Optionally handle success (e.g., show a success message or navigate to another screen)
		} catch (error) {
			console.error("Error submitting payment:", error);
		} finally {
			setButtonSpinner(false); // Hide spinner
		}
	};

	useEffect(() => {
		fetchUserData(); // Fetch user data on component mount
	}, []);

	// Handle beneficiary selection
	const handleUserSelect = (user: Beneficiary) => {
		setSelectedUsers([user]);
		beneficiaryBottomSheetRef.current?.close();
	};

	// Handle campaign selection (single)
	const handleCampaignSelect = (campaign: Campaign) => {
		setSelectedCampaign(campaign);
		campaignBottomSheetRef.current?.close();
	};

	// Handle product selection (multiple products)
	const handleProductSelects = (selectedProducts: Product[]) => {
		const updatedProducts = selectedProducts.map((product) => ({
			...product,
			quantity: 1, // Set quantity to 1 by default
		}));
		setSelectedProducts(updatedProducts); // Update the selected products state
		productBottomSheetRef.current?.close();
	};

	// Clear all selections
	const clearSelections = () => {
		setSelectedUsers([]);
		setSelectedCampaign(null);
		setSelectedCampaigns([]);
		setSelectedProducts([]); // Reset the selected products state
	};

	// useEffect(() => {
	// 	fetchUsers();
	// }, []);

	return (
		<SafeAreaView style={styles.container}>
			<CustomHeader title='Create new payment' showHistory={true} />
			<View style={styles.border}></View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Spacer size={20} />
				<View style={[styles.cardContainer]}>
					<Text style={styles.info}>Name Of Beneficiary</Text>
					<Spacer size={6} />
					<TouchableOpacity
						onPress={() => {
							beneficiaryBottomSheetRef.current?.expand();
							campaignBottomSheetRef.current?.close();
						}}
					>
						<Text style={styles.enterAmount}>
							{selectedUsers.length > 0
								? `${selectedUsers[0].first_name} ${selectedUsers[0].last_name}`
								: "Select a Beneficiary"}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={[styles.cardContainer]}>
					<Text style={styles.info}>Name Of Campaign</Text>
					<Spacer size={6} />
					<TouchableOpacity
						onPress={() => {
							beneficiaryBottomSheetRef.current?.close();
							campaignBottomSheetRef.current?.expand();
						}}
					>
						<Text style={styles.enterAmount}>
							{selectedCampaign ? selectedCampaign.name : "Select a Campaign"}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={[styles.cardContainer]}>
					<Text style={styles.info}>Select Product</Text>
					<Spacer size={6} />
					<TouchableOpacity
						onPress={() => {
							productBottomSheetRef.current?.expand();
						}}
					>
						<Text style={styles.enterAmount}>
							{selectedProducts.length > 0
								? `${selectedProducts
										.map((product) => product.name)
										.join(", ")}`
								: "Select Products"}
						</Text>
					</TouchableOpacity>
					<Spacer size={16} />
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 20,
						justifyContent: "space-between",
						paddingHorizontal: 20,
					}}
				>
					<Text style={{ fontFamily: "GilroyBold" }}>Products</Text>
					<Text style={{ fontFamily: "GilroyBold" }}>Qty</Text>
					<Text style={{ fontFamily: "GilroyBold" }}>Amount</Text>
					<Text></Text>
				</View>

				{selectedProducts.length > 0 ? (
					selectedProducts.map((product, index) => (
						<View
							key={product.id}
							style={{ marginBottom: 10, paddingHorizontal: 20 }}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 6,
									justifyContent: "space-between",
								}}
							>
								<Text style={{ width: 100 }}>{product.name}</Text>

								{/* Quantity controls */}
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 10,
									}}
								>
									{/* Decrease Quantity */}
									<TouchableOpacity
										style={{
											borderWidth: 1,
											borderColor: "#17CE89",
											height: 30,
											width: 30,
											borderRadius: 6,
											alignItems: "center",
											justifyContent: "center",
										}}
										onPress={() => {
											setSelectedProducts((prevProducts) =>
												prevProducts.map((p, i) =>
													i === index
														? {
																...p,
																quantity: Math.max((p.quantity || 0) - 1, 0), // Ensure quantity doesn't go below 0
														  }
														: p
												)
											);
										}}
									>
										<Text style={{ color: "#17CE89", fontSize: 20 }}>-</Text>
									</TouchableOpacity>

									{/* Display Quantity */}
									<Text>
										{product.quantity !== undefined && product.quantity !== null
											? product.quantity
											: 0}
									</Text>

									{/* Increase Quantity */}
									<TouchableOpacity
										style={{
											borderWidth: 1,
											borderColor: "#17CE89",
											height: 30,
											width: 30,
											borderRadius: 6,
											alignItems: "center",
											justifyContent: "center",
										}}
										onPress={() => {
											setSelectedProducts((prevProducts) =>
												prevProducts.map((p, i) =>
													i === index
														? {
																...p,
																quantity:
																	(parseInt(p.quantity.toString()) || 0) + 1,
														  } // Ensure quantity is a number
														: p
												)
											);
										}}
									>
										<Text style={{ color: "#17CE89" }}>+</Text>
									</TouchableOpacity>
								</View>

								<Text style={{ width: 60 }}>{product.cost}</Text>

								{/* Delete product */}
								<Feather
									name='trash-2'
									size={18}
									style={{ color: "#FF7576" }}
									onPress={() => {
										setSelectedProducts((prevProducts) =>
											prevProducts.filter((_, i) => i !== index)
										);
									}}
								/>
							</View>
						</View>
					))
				) : (
					<Text style={styles.enterAmount}>No products selected</Text>
				)}

				{/* Total Cost */}
			</ScrollView>

			<View style={{ padding: 20, backgroundColor: "#ffffff" }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Text style={styles.info}>Total Cost</Text>
					<Spacer size={6} />
					<Text>
						{/* Calculate total cost */}
						NGN{" "}
						{selectedProducts.reduce((acc, product) => {
							const cost = parseFloat(product.cost) || 0; // Ensure cost is a valid number
							const quantity = product.quantity || 0; // Ensure quantity is a valid number
							return acc + cost * quantity;
						}, 0)}
					</Text>
				</View>
				<TouchableOpacity
					style={[
						styles.btnContainer,
						{ width: "100%", height: 48, marginTop: 10 },
					]}
					onPress={handlePayment}
					disabled={buttonSpinner}
				>
					{buttonSpinner ? (
						<ActivityIndicator size='small' color='#FFFFFF' />
					) : (
						<Text style={styles.btnContent}>Confirm</Text>
					)}
				</TouchableOpacity>
			</View>

			<BeneficiaryBottomSheet
				ref={beneficiaryBottomSheetRef}
				users={users}
				loading={loading}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				onUserSelect={handleUserSelect}
				selectedUsers={selectedUsers}
			/>

			{/* Campaign BottomSheet */}
			<CampaignBottomSheet
				ref={campaignBottomSheetRef}
				campaigns={campaigns}
				onCampaignSelect={handleCampaignSelect}
			/>

			{/* Product BottomSheet */}
			<ProductBottomSheet
				ref={productBottomSheetRef}
				onProductSelects={handleProductSelects}
			/>
		</SafeAreaView>
	);
}
