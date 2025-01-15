import React, { useState, useEffect, forwardRef } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import axios from "axios";
import { styles } from "@/styles/general/general";
import { Checkbox } from "react-native-paper"; // You can use any checkbox library or custom checkbox component

type Product = {
	id: string;
	name: string;
	cost: string;
	quantity: number;
	tag: string;
};

type ProductBottomSheetProps = {
	onProductSelects: (selectedProducts: Product[]) => void;
};

const ProductBottomSheet = forwardRef<BottomSheet, ProductBottomSheetProps>(
	({ onProductSelects }, ref) => {
		const [products, setProducts] = useState<Product[]>([]);
		const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
		const [loading, setLoading] = useState<boolean>(true);
		const [error, setError] = useState<string | null>(null);

		// Fetch products from the API
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					"https://api.shalomescort.org/product/product/"
				);
				const data = response.data;

				// Format data to match the `Product` type
				const formattedProducts = data.map((product: any) => ({
					id: product.id,
					name: product.tag, // You can change this to any property you want to display
					cost: product.cost,
					quantity: product.quantity || "N/A", // Handle missing quantities
					tag: product.tag,
				}));

				setProducts(formattedProducts); // Set products in state
			} catch (err) {
				setError("Failed to load products. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		useEffect(() => {
			fetchProducts();
		}, []);

		const toggleProductSelection = (product: Product) => {
			const isSelected = selectedProducts.some((p) => p.id === product.id);
			let updatedSelections;

			if (isSelected) {
				updatedSelections = selectedProducts.filter((p) => p.id !== product.id);
			} else {
				updatedSelections = [...selectedProducts, product];
			}

			setSelectedProducts(updatedSelections);
			onProductSelects(updatedSelections); // Notify parent of changes
		};

		const isProductSelected = (product: Product) =>
			selectedProducts.some((p) => p.id === product.id);

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
						{products.map((product) => (
							<TouchableOpacity
								key={product.id}
								style={[
									styles.cardContainer,
									{ flexDirection: "row", alignItems: "center" },
								]}
								onPress={() => toggleProductSelection(product)}
							>
								<Checkbox
									status={isProductSelected(product) ? "checked" : "unchecked"}
									onPress={() => toggleProductSelection(product)}
								/>
								<View>
									<Text style={styles.info}>{product.name}</Text>
									<Text style={styles.info}>{`Cost: ${product.cost}`}</Text>
									<Text
										style={styles.info}
									>{`Quantity: ${product.quantity}`}</Text>
								</View>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</BottomSheet>
		);
	}
);

export default ProductBottomSheet;
