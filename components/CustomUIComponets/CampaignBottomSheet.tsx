import React, { forwardRef, useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import axios from "axios";
import BottomSheet from "@gorhom/bottom-sheet";
import { styles } from "@/styles/general/general";

type Campaign = {
	id: string;
	name: string;
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
				const response = await axios.get(
					"https://api.shalomescort.org/project/project/"
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
			} finally {
				setLoading(false);
			}
		};

		useEffect(() => {
			fetchCampaigns();
		}, []);

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
								onPress={() => onCampaignSelect(campaign)}
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
