import React, { useState, useEffect, useMemo, forwardRef } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	Image,
	Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

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

type BeneficiaryBottomSheetProps = {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	onUserSelect: (user: Beneficiary) => void;
	selectedUser: Beneficiary | null;
	selectedCampaignId: string | null;
};

const BeneficiaryBottomSheet = forwardRef<
	BottomSheet,
	BeneficiaryBottomSheetProps
>(
	(
		{
			searchQuery,
			setSearchQuery,
			onUserSelect,
			selectedUser,
			selectedCampaignId,
		},
		ref
	) => {
		const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
		const [loading, setLoading] = useState<boolean>(false);

		// Fetch beneficiaries for the selected campaign
		useEffect(() => {
			const fetchBeneficiaries = async () => {
				if (!selectedCampaignId) {
					return;
				}

				try {
					setLoading(true);

					// Fetch campaign details from API
					const response = await axios.get(
						`https://api.shalomescort.org/project/project/${selectedCampaignId}/`
					);
					const data = response.data;

					console.log("API Response:", data);

					// Extract beneficiaries directly from the beneficiarys array
					const beneficiariesArray = data?.beneficiarys || [];

					console.log("Extracted Beneficiaries:", beneficiariesArray);

					setBeneficiaries(beneficiariesArray);
				} catch (error) {
					Alert.alert("Error", "Failed to fetch beneficiaries.");
					console.error("Error fetching beneficiaries:", error);
				} finally {
					setLoading(false);
				}
			};

			fetchBeneficiaries();
		}, [selectedCampaignId]);

		const snapPoints = useMemo(() => ["25%", "90%"], []);

		// Filter beneficiaries based on search query
		const filteredBeneficiaries = beneficiaries.filter(
			(beneficiary) =>
				`${beneficiary.first_name} ${beneficiary.last_name}`
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				beneficiary.beneficiary_id
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
		);

		console.log("Filtered Beneficiaries:", filteredBeneficiaries);

		return (
			<BottomSheet
				ref={ref}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose={true}
			>
				<View style={{ paddingHorizontal: 16 }}>
					<Text
						style={{
							fontSize: 18,
							fontFamily: "GilroyMedium",
							color: "#25396F",
						}}
					>
						Select Beneficiary
					</Text>

					<TextInput
						placeholder='Search Beneficiary'
						placeholderTextColor='#646A86'
						style={{
							borderWidth: 1,
							borderColor: "#F5F6F8",
							borderRadius: 12,
							padding: 12,
							marginVertical: 16,
							backgroundColor: "#F5F6F8",
						}}
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
				</View>
				<View style={{ backgroundColor: "#FAFAFA", flex: 1, padding: 20 }}>
					{!selectedCampaignId ? (
						<View style={{ alignItems: "center", justifyContent: "center" }}>
							<Text>Please select a campaign first.</Text>
						</View>
					) : loading ? (
						<ActivityIndicator size='large' color='#000' />
					) : (
						<BottomSheetFlatList
							data={filteredBeneficiaries}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => {
								const isSelected = selectedUser?.id === item.id;
								return (
									<TouchableOpacity
										onPress={() => onUserSelect(item)}
										style={{
											backgroundColor: isSelected ? "#E8F0FE" : "#ffffff",
											padding: 16,
											marginBottom: 16,
											borderRadius: 16,
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												gap: 8,
											}}
										>
											{/* <Image
												source={require("@/assets/images/Avatar (1).png")}
												style={{ width: 40, height: 40, borderRadius: 20 }}
											/> */}
											<View>
												<Text>{`${item.first_name} ${item.last_name}`}</Text>
												<Text>{item.beneficiary_id}</Text>
											</View>
										</View>
										{isSelected && (
											<FontAwesome
												name='check-circle'
												size={24}
												color='#25396F'
											/>
										)}
									</TouchableOpacity>
								);
							}}
						/>
					)}
				</View>
			</BottomSheet>
		);
	}
);

export default BeneficiaryBottomSheet;
