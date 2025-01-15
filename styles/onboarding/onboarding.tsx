import { StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
	firstContainer: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	logo: {
		width: wp("70%"),
		// height: hp("50%"),
		objectFit: "contain",
	},
	titleWrapper: {
		flexDirection: "column",
	},
	titleText: {
		fontSize: hp("4%"),
		textAlign: "center",
		marginTop: 40,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	inputBox: {
		width: 60,
		height: 60,
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
		backgroundColor: "#F7F9FB",
		textAlign: "center",
		fontSize: 20,
	},
	paragraphText: {
		fontSize: 14,
		textAlign: "center",
	},
	footerContainer: {
		alignItems: "center",
		flex: 1,
		width: 100,
		paddingBottom: 20,
		marginTop: 8,
	},
	successCirle: {
		flex: 1,
		backgroundColor: "#ffffff",
		padding: 30,
		borderRadius: 8,
		justifyContent: "center",
	},

	inputText: {
		padding: 2,
		marginTop: 3,
		fontSize: 14,
		flex: 1,
		width: "100%",
		fontFamily: "LufgaRegular",
	},

	inputText2: {
		padding: 2,

		fontSize: 14,
		flex: 1,
		width: "100%",
		fontFamily: "LufgaRegular",
	},

	btnContainer: {
		height: 50,
		backgroundColor: "#17CE89",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
	},

	btnContainerOutline: {
		height: 50,
		backgroundColor: "#ffffff",
		alignItems: "center",
		borderColor: "#17CE89",
		borderWidth: 1,
		justifyContent: "center",
		borderRadius: 10,
	},

	btnOutlineContainer: {
		height: 60,
		borderColor: "#004680",
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
	},

	buttonContainer: {
		flexDirection: "row",
		height: 60,
		borderWidth: 1,
		width: "100%",
		borderRadius: 100,
		borderColor: "#0a0a0a",
		backgroundColor: "#0a0a0a",
		justifyContent: "flex-end",
		position: "absolute",
		bottom: 50, // Adjust this value as needed
		alignSelf: "center",
	},

	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	newButtonContainer: {
		flexDirection: "row",
		backgroundColor: "#000000",
		width: responsiveWidth(88),
		height: responsiveHeight(7.5),
		borderColor: "#000000",

		borderRadius: 100,
		color: "#FAB319",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 5,
	},
	dot: {
		backgroundColor: "#16194A",
		width: 8,
		height: 8,
		borderRadius: 100,
		marginHorizontal: 5,
		marginBottom: 70,
	},
	activeDot: {
		backgroundColor: "#004680",
		width: 8,
		height: 8,
		borderRadius: 100,
		marginHorizontal: 5,
		marginBottom: 70,
	},
	slideImage: {
		alignSelf: "center",
		marginBottom: 20,
	},
	screenContent: {
		justifyContent: "flex-end",
		flexDirection: "column",
		backgroundColor: "#ffffff",
		padding: 20,
		borderRadius: 8,
		flex: 1,
	},
	headerText: {
		fontSize: 20,
		lineHeight: 28,
		textAlign: "center",
	},
	TextInput: {
		borderColor: "#f3f3f3",
		backgroundColor: "#F5F6F8",
		justifyContent: "center",
		borderRadius: 12,
		paddingHorizontal: 20,
		paddingVertical: 10,
		margin: 0,
		fontSize: 16,
		textDecorationLine: "none",
	},
	topText: {
		color: "#000000",
		fontFamily: "LufgaMedium",
		fontSize: 16,
	},
	TextInputTitle: {
		fontFamily: "GilroyRegular",
		color: "#25396F",
		fontSize: 14,
	},
	selectionCardContainer: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		backgroundColor: "#F1F1F1",
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 12,
	},

	selectionHeader: {
		fontFamily: "LufgaMedium",
		fontSize: 24,
	},

	selectionBody: {
		fontFamily: "LufgaRegular",
		fontSize: 12,
		color: "#4F4F4F",
		paddingRight: 10,
	},

	selectionCardContainerActive: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		backgroundColor: "#F1F1F1",
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#004680",
	},
	imageStyling: {
		height: 24,
		width: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	btnContent: {
		fontFamily: "GilroyMedium",
		color: "#ffffff",
		fontSize: 16,
	},
	btnOutlineContent: {
		fontFamily: "GilroyMedium",
		color: "#17CE89",
		fontSize: 16,
	},
	TextinputBody: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	action: {
		fontFamily: "Manrope_600SemiBold",
		color: "#16194A",
		textDecorationLine: "underline",
	},
	status: {
		fontFamily: "LufgaSemiBold",
		color: "#008000",
		textAlign: "center",
		fontSize: 20,
	},
	message: {
		fontFamily: "LufgaRegular",
		color: "#00000066",
		textAlign: "center",
		fontSize: 14,
	},
});
