import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	Alert,
	TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/general/general";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { Feather } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";

export default function SuccessScreen() {
	const [buttonSpinner, setButtonSpinner] = useState(false);
	const [code, setCode] = useState(new Array(4).fill(""));
	const [passwordVisible, setPasswordVisible] = useState(false);

	const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));

	useEffect(() => {
		// Check if all 4 digits have been entered
		if (code.every((digit) => digit !== "")) {
			const enteredPin = code.join(""); // Join the array to make a string

			// Check if the entered pin is '0000'
			if (enteredPin === "0000") {
				showMessage({
					message: "Success",
					description: "PIN Verified Successfully!",
					type: "success",
					backgroundColor: "#17CE89", // Optional color customization
					color: "#fff", // Text color
					textStyle: { fontFamily: "GilroyMedium" },
				});
				router.push("/(routes)/forgotSuccess");
			} else {
				showMessage({
					message: "Error",
					description: "Incorrect PIN",
					type: "danger",
					backgroundColor: "#FF3B30", // Optional color customization
					textStyle: { fontFamily: "GilroyMedium" },
				});
			}
		}
	}, [code]); // This hook will run every time `code` changes

	const handleInput = (text: any, index: any) => {
		const newCode = [...code];
		newCode[index] = text;
		setCode(newCode);

		// Move focus automatically to the next input when a digit is entered
		if (text && index < 3) {
			inputs.current[index + 1].current.focus();
		}

		// If a digit is erased, move focus to the previous input
		if (text === "" && index > 0) {
			inputs.current[index - 1].current.focus();
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#646A86B2" }}>
			<Spacer size={8} />

			<ScrollView showsHorizontalScrollIndicator={false}>
				<Spacer size={28} />
			</ScrollView>

			<View
				style={{
					justifyContent: "center",
					backgroundColor: "#ffffff",
					alignItems: "center",
					paddingTop: 20,
					borderTopLeftRadius: 16,
					borderTopRightRadius: 16,
				}}
			>
				<Text
					style={{
						paddingVertical: 20,
						color: "#25396F",
						fontFamily: "GilroyMedium",
						fontSize: 18,
					}}
				>
					NFC Scan Completed
				</Text>
				<Image
					style={{ alignSelf: "center", height: 140, width: 140 }}
					source={require("@/assets/images/Verifcation icon status.png")}
				/>
			</View>

			<View style={{ padding: 20, backgroundColor: "#ffffff" }}>
				<View style={styles.inputContainer}>
					{code.map((_, index) => (
						<TextInput
							key={index}
							style={styles.inputBox}
							keyboardType='number-pad'
							secureTextEntry={!passwordVisible}
							maxLength={1}
							onChangeText={(text) => handleInput(text, index)}
							value={code[index]}
							ref={inputs.current[index]}
							autoFocus={index === 0}
						/>
					))}
					<TouchableOpacity
						onPress={() => setPasswordVisible(!passwordVisible)}
					>
						{passwordVisible ? (
							<Feather name='eye' size={20} color={"#333333"} />
						) : (
							<Image source={require("@/assets/images/eye-close-line.png")} />
						)}
					</TouchableOpacity>
				</View>

				<Spacer size={30} />
			</View>
		</SafeAreaView>
	);
}
