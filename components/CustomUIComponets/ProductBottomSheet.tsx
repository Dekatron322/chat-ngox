import React, { useState, useEffect, forwardRef, useCallback } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	Dimensions,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import axios from "axios";
import { styles } from "@/styles/general/general";
import { Checkbox } from "react-native-paper";

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

const { height: screenHeight } = Dimensions.get("window");

const ProductBottomSheet = forwardRef<BottomSheet, ProductBottomSheetProps>(
	({ onProductSelects }, ref) => {
		const [products, setProducts] = useState<Product[]>([]);
		const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
		const [loading, setLoading] = useState<boolean>(true);
		const [error, setError] = useState<string | null>(null);
		const [bottomSheetHeight, setBottomSheetHeight] = useState(0); // Track bottom sheet height

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
					name: product.tag, // Adjusted for the desired property
					cost: product.cost,
					quantity: product.quantity || "N/A",
					tag: product.tag,
				}));

				setProducts(formattedProducts);
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
			onProductSelects(updatedSelections);
		};

		const isProductSelected = (product: Product) =>
			selectedProducts.some((p) => p.id === product.id);

		// Handle BottomSheet state change
		const handleSheetChanges = useCallback((index: number) => {
			// Update the height based on the snap point
			const snapPoint = index === 0 ? "50%" : "70%"; // Modify as per your snap points
			const newHeight = snapPoint === "50%" ? 0.5 : 0.7;
			setBottomSheetHeight(screenHeight * newHeight);
		}, []);

		// Render loading spinner
		if (loading) {
			return (
				<BottomSheet
					enablePanDownToClose={true}
					ref={ref}
					index={-1} // Closed by default
					snapPoints={["50%", "70%"]}
					onChange={handleSheetChanges}
				>
					<View style={{ padding: 20, alignItems: "center" }}>
						<ActivityIndicator size='large' color='#0000ff' />
					</View>
				</BottomSheet>
			);
		}

		// Render error message
		if (error) {
			return (
				<BottomSheet
					enablePanDownToClose={true}
					ref={ref}
					index={-1} // Closed by default
					snapPoints={["50%", "70%"]}
					onChange={handleSheetChanges}
				>
					<View style={{ padding: 20, alignItems: "center" }}>
						<Text>{error}</Text>
					</View>
				</BottomSheet>
			);
		}

		// Render product list
		return (
			<BottomSheet
				enablePanDownToClose={true}
				ref={ref}
				index={-1} // Closed by default
				snapPoints={["50%", "70%"]}
				onChange={handleSheetChanges}
			>
				<View style={{ flex: 1, paddingHorizontal: 20 }}>
					<BottomSheetScrollView
						contentContainerStyle={{
							paddingBottom: 20,
						}}
						showsVerticalScrollIndicator={false}
					>
						{products.map((product) => (
							<TouchableOpacity
								key={product.id}
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 15,
								}}
								onPress={() => toggleProductSelection(product)}
							>
								<Checkbox
									status={isProductSelected(product) ? "checked" : "unchecked"}
									onPress={() => toggleProductSelection(product)}
								/>
								<View style={{ marginLeft: 10 }}>
									<Text style={styles.info}>{product.name}</Text>
								</View>
							</TouchableOpacity>
						))}
					</BottomSheetScrollView>
				</View>
			</BottomSheet>
		);
	}
);

export default ProductBottomSheet;
