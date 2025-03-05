import React, { forwardRef, useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet from "@gorhom/bottom-sheet";
import { styles } from "@/styles/general/general";

type Campaign = {
	id: string;
	name: string;
	vendor: string;
	price: number;
	quantity: number;
};

type CampaignBottomSheetProps = {
	onCampaignSelect: (campaign: Campaign) => void;
};

const CampaignBottomSheet = forwardRef<BottomSheet, CampaignBottomSheetProps>(
	({ onCampaignSelect }, ref) => {
		const [campaigns, setCampaigns] = useState<Campaign[]>([]);
		const [loading, setLoading] = useState<boolean>(true);
		const [error, setError] = useState<string | null>(null);

		// Fetch campaigns from the API
		const fetchCampaigns = async () => {
			try {
				// Retrieve `user_id` from AsyncStorage
				const user_id = await AsyncStorage.getItem("userId");

				if (!user_id) {
					throw new Error("User ID not found. Please log in again.");
				}

				// Fetch campaigns using the `user_id`
				const response = await axios.get(
					`https://api.donorsrec.chats.cash/project/project/filter/by-user-id/${user_id}/`
				);
				const data = response.data;

				// Format data from the API to match the `Campaign` type
				const formattedCampaigns = data.map((campaign: any) => ({
					id: campaign.id,
					name: campaign.title, // Use 'title' as the name
				}));

				setCampaigns(formattedCampaigns); // Set campaigns in state
			} catch (err) {
				setError("Failed to load campaigns. Please try again later.");
				console.error("Error fetching campaigns:", err);
			} finally {
				setLoading(false);
			}
		};

		useEffect(() => {
			fetchCampaigns();
		}, []);

		// Handle campaign selection
		const handleCampaignSelect = async (campaign: Campaign) => {
			// Save the selected campaign ID to AsyncStorage
			await AsyncStorage.setItem("selectedCampaignId", campaign.id);

			// Log the selected campaign ID
			console.log("Selected Campaign ID:", campaign.id);

			// Call the `onCampaignSelect` prop
			onCampaignSelect(campaign);
		};

		if (loading) {
			return (
				<BottomSheet
					enablePanDownToClose={true}
					ref={ref}
					index={-1}
					snapPoints={["50%", "50%"]}
				>
					<View style={{ padding: 20, alignItems: "center" }}>
						<ActivityIndicator size='large' color='#0000ff' />
					</View>
				</BottomSheet>
			);
		}

		if (error) {
			return (
				<BottomSheet
					enablePanDownToClose={true}
					ref={ref}
					index={-1}
					snapPoints={["50%", "50%"]}
				>
					<View style={{ padding: 20, alignItems: "center" }}>
						<Text>{error}</Text>
					</View>
				</BottomSheet>
			);
		}

		return (
			<BottomSheet
				enablePanDownToClose={true}
				ref={ref}
				index={-1}
				snapPoints={["50%", "50%"]}
			>
				<View style={{ padding: 20 }}>
					<ScrollView>
						{campaigns.map((campaign) => (
							<TouchableOpacity
								key={campaign.id}
								style={styles.cardContainer}
								onPress={() => handleCampaignSelect(campaign)}
							>
								<Text style={styles.info}>{campaign.name}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</BottomSheet>
		);
	}
);

export default CampaignBottomSheet;
