import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	Image,
	StatusBar,
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
	StyleSheet,
} from "react-native";
import React, {
	useState,
	useRef,
	useCallback,
	useMemo,
	RefObject,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function SignUp() {
	// --- Form states ---
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [meterNumber, setMeterNumber] = useState("");
	const [password, setPassword] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [buttonSpinner, setButtonSpinner] = useState(false);
	const [focusedInput, setFocusedInput] = useState<string | null>(null);

	// --- PIN creation states ---
	const [pin, setPin] = useState<string[]>(["", "", "", ""]);
	const [pinSpinner, setPinSpinner] = useState(false);
	const [userId, setUserId] = useState<number | null>(null);

	// refs for PIN boxes
	const pinRefs = useRef<Array<RefObject<TextInput>>>(
		Array.from({ length: 4 }, () => React.createRef<TextInput>())
	);

	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["35%"], []);

	const openBottomSheet = useCallback(() => {
		bottomSheetRef.current?.expand();
	}, []);
	const closeBottomSheet = useCallback(() => {
		bottomSheetRef.current?.close();
	}, []);

	// handle signup as before...
	const handleSignUp = async () => {
		if (!firstName || !lastName || !email || !meterNumber || !password) {
			showMessage({
				message: "Error",
				description: "Please fill in all fields",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			return;
		}
		setButtonSpinner(true);
		try {
			const payload = {
				first_name: firstName,
				last_name: lastName,
				email,
				meter_number: meterNumber,
				password1: password,
			};
			const res = await fetch(
				"https://cb-api.caregiverhospital.com/custom-user/sign-up/",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				}
			);
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Failed to sign up");
			setUserId(data.id);
			showMessage({
				message: "Success",
				description: "Sign-up successful! Please create a PIN",
				type: "success",
				backgroundColor: "#008000",
				color: "#fff",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			openBottomSheet();
		} catch (err: any) {
			showMessage({
				message: "Error",
				description: err.message || "Signup failed",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
		} finally {
			setButtonSpinner(false);
		}
	};

	// move focus on digit entry/backspace
	const onPinChange = (
		value: string,
		idx: number,
		arr: string[],
		refs: Array<RefObject<TextInput>>
	) => {
		const newArr = [...arr];
		newArr[idx] = value;
		setPin(newArr);
		if (value && idx < 3) {
			refs[idx + 1].current?.focus();
		}
	};
	const onPinKeyPress = (
		e: NativeSyntheticEvent<TextInputKeyPressEventData>,
		idx: number,
		refs: Array<RefObject<TextInput>>
	) => {
		if (
			e.nativeEvent.key === "Backspace" &&
			idx > 0 &&
			!e.currentTarget?.props.value
		) {
			refs[idx - 1].current?.focus();
		}
	};

	const handleCreatePin = async () => {
		if (pin.some((d) => !d)) {
			showMessage({
				message: "Error",
				description: "Please enter all 4 digits",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			return;
		}

		setPinSpinner(true);
		try {
			const response = await fetch(
				`https://cb-api.caregiverhospital.com/custom-user/update/${userId}/add-pin/`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ pin: pin.join("") }),
				}
			);
			const data = await response.json();
			if (!response.ok) throw new Error(data.message || "Failed to create PIN");
			showMessage({
				message: "Success",
				description: "PIN created successfully!",
				type: "success",
				backgroundColor: "#008000",
				color: "#fff",
				textStyle: { fontFamily: "GilroyMedium" },
			});
			closeBottomSheet();
			router.push("/(routes)/login");
		} catch (err: any) {
			showMessage({
				message: "Error",
				description: err.message || "PIN creation failed",
				type: "danger",
				backgroundColor: "#FF3B30",
				textStyle: { fontFamily: "GilroyMedium" },
			});
		} finally {
			setPinSpinner(false);
		}
	};

	return (
		<LinearGradient
			colors={["#F6F6F6", "#F6F6F6", "#F6F6F6"]}
			style={{ flex: 1 }}
		>
			<SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
				<StatusBar barStyle='dark-content' />

				<ScrollView showsVerticalScrollIndicator={false}>
					<Spacer size={20} />
					<Image
						source={require("@/assets/images/kelogo.png")}
						style={styles.slideImage}
					/>

					<Spacer size={30} />
					<View>
						<Image
							source={require("@/assets/images/Frame 23.png")}
							style={styles.slideImage}
						/>

						<Spacer size={20} />

						{/* First Name Input */}
						<View
							style={[
								styles.TextInput,
								focusedInput === "first_name" && {
									borderColor: "#008000",
									borderWidth: 1,
								},
							]}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View>
									<Text style={styles.TextInputTitle}>First Name</Text>
									<TextInput
										maxLength={100}
										placeholder='John'
										placeholderTextColor='#212121'
										style={{
											padding: 2,
											marginTop: 3,
											fontSize: 16,
											width: "100%",
											fontFamily: "LufgaRegular",
										}}
										onFocus={() => setFocusedInput("first_name")}
										onBlur={() => setFocusedInput(null)}
										value={firstName}
										onChangeText={setFirstName}
									/>
								</View>
							</View>
						</View>
						<Spacer size={16} />

						{/* Last Name Input */}
						<View
							style={[
								styles.TextInput,
								focusedInput === "last_name" && {
									borderColor: "#008000",
									borderWidth: 1,
								},
							]}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View>
									<Text style={styles.TextInputTitle}>Last Name</Text>
									<TextInput
										maxLength={100}
										placeholder='Doe'
										placeholderTextColor='#212121'
										style={{
											padding: 2,
											marginTop: 3,
											fontSize: 16,
											width: "100%",
											fontFamily: "LufgaRegular",
										}}
										onFocus={() => setFocusedInput("last_name")}
										onBlur={() => setFocusedInput(null)}
										value={lastName}
										onChangeText={setLastName}
									/>
								</View>
							</View>
						</View>
						<Spacer size={16} />

						{/* Meter Number Input */}
						<View
							style={[
								styles.TextInput,
								focusedInput === "meter_number" && {
									borderColor: "#008000",
									borderWidth: 1,
								},
							]}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View>
									<Text style={styles.TextInputTitle}>Meter Number</Text>
									<TextInput
										maxLength={100}
										placeholder='12345665829'
										placeholderTextColor='#212121'
										style={{
											padding: 2,
											marginTop: 3,
											fontSize: 16,
											width: "100%",
											fontFamily: "LufgaRegular",
										}}
										onFocus={() => setFocusedInput("meter_number")}
										onBlur={() => setFocusedInput(null)}
										value={meterNumber}
										onChangeText={setMeterNumber}
									/>
								</View>
							</View>
						</View>
						<Spacer size={16} />

						{/* Email Input */}
						<View
							style={[
								styles.TextInput,
								focusedInput === "email" && {
									borderColor: "#008000",
									borderWidth: 1,
								},
							]}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View>
									<Text style={styles.TextInputTitle}>Email</Text>
									<TextInput
										maxLength={100}
										placeholder='grosolar@gmail.com'
										placeholderTextColor='#212121'
										style={{
											padding: 2,
											marginTop: 3,
											fontSize: 16,
											width: "100%",
											fontFamily: "LufgaRegular",
										}}
										value={email}
										onChangeText={setEmail}
										onFocus={() => setFocusedInput("email")}
										onBlur={() => setFocusedInput(null)}
										keyboardType='email-address'
										autoCapitalize='none'
									/>
								</View>
							</View>
						</View>
						<Spacer size={16} />

						{/* Password Input */}
						<View
							style={[
								styles.TextInput,
								focusedInput === "password" && {
									borderColor: "#008000",
									borderWidth: 1,
								},
							]}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View>
									<Text style={styles.TextInputTitle}>Password</Text>
									<TextInput
										maxLength={25}
										placeholder='***********'
										placeholderTextColor='#212121'
										style={{ padding: 0, marginTop: 3, fontSize: 16 }}
										secureTextEntry={!passwordVisible}
										onChangeText={setPassword}
										value={password}
										onFocus={() => setFocusedInput("password")}
										onBlur={() => setFocusedInput(null)}
										autoCapitalize='none'
									/>
								</View>
								<TouchableOpacity
									onPress={() => setPasswordVisible(!passwordVisible)}
								>
									{passwordVisible ? (
										<Feather name='eye' size={20} color={"#333333"} />
									) : (
										<Image
											source={require("@/assets/images/eye-close-line.png")}
										/>
									)}
								</TouchableOpacity>
							</View>
						</View>

						<Spacer size={8} />

						<TouchableOpacity
							onPress={() => router.push("/(routes)/forgotPassword")}
						>
							<Text
								style={{
									textAlign: "right",
									fontFamily: "LufgaMedium",
									opacity: 0.6,
									color: "#00000099",
								}}
							>
								Forgot Password?
							</Text>
						</TouchableOpacity>

						<Spacer size={16} />
						<TouchableOpacity
							style={styles.btnContainer}
							onPress={handleSignUp}
							disabled={buttonSpinner}
						>
							{buttonSpinner ? (
								<ActivityIndicator size='small' color='#ffffff' />
							) : (
								<Text style={styles.btnContent}>Proceed</Text>
							)}
						</TouchableOpacity>
					</View>
					<View
						style={{
							marginTop: 20,
							flex: 1,
							alignItems: "center",
						}}
					>
						<TouchableOpacity onPress={() => router.push("/(routes)/login")}>
							<Text
								style={{
									textAlign: "center",
									fontFamily: "LufgaMedium",
									opacity: 0.6,
									color: "#00000099",
								}}
							>
								Already have an Account{" "}
								<Text style={{ color: "#008000" }}>Sign In </Text>
							</Text>
						</TouchableOpacity>
					</View>

					<Spacer size={20} />
				</ScrollView>
				<View style={styles.footerContainer}>
					<Text style={{ fontFamily: "LufgaRegular", color: "#00000033" }}>
						Powered By Blumentech
					</Text>
				</View>

				{/* PIN Creation Bottom Sheet */}
				<BottomSheet
					ref={bottomSheetRef}
					index={-1}
					snapPoints={snapPoints}
					enablePanDownToClose={false}
					backgroundStyle={{ backgroundColor: "#E0FFE0" }}
					containerStyle={styles.sheetShadow}
				>
					<BottomSheetView style={{ padding: 20 }}>
						<Text
							style={{
								fontSize: 20,
								fontFamily: "GilroyBold",
								textAlign: "center",
								marginBottom: 20,
							}}
						>
							Create Your 4-Digit PIN
						</Text>

						{/* PIN */}
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-evenly",
								marginBottom: 24,
							}}
						>
							{pin.map((digit, i) => (
								<TextInput
									key={`pin-${i}`}
									ref={pinRefs.current[i]}
									value={digit}
									onChangeText={(val) =>
										onPinChange(
											val.replace(/[^0-9]/g, ""),
											i,
											pin,
											pinRefs.current
										)
									}
									onKeyPress={(e) => onPinKeyPress(e, i, pinRefs.current)}
									keyboardType='number-pad'
									maxLength={1}
									style={{
										width: 60,
										height: 60,
										borderWidth: 2,
										borderRadius: 10,
										backgroundColor: "#fff",
										borderColor:
											focusedInput === `pin${i}` ? "#008000" : "#ccc",
										textAlign: "center",
										fontSize: 24,
										fontFamily: "LufgaRegular",
									}}
									onFocus={() => setFocusedInput(`pin${i}`)}
									onBlur={() => setFocusedInput(null)}
								/>
							))}
						</View>

						<TouchableOpacity
							style={[styles.btnContainer, { marginBottom: 16 }]}
							onPress={handleCreatePin}
							disabled={pinSpinner}
						>
							{pinSpinner ? (
								<ActivityIndicator size='small' color='#fff' />
							) : (
								<Text style={styles.btnContent}>Create PIN</Text>
							)}
						</TouchableOpacity>
					</BottomSheetView>
				</BottomSheet>
			</SafeAreaView>
		</LinearGradient>
	);
}
