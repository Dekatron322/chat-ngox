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

	TextInput: {
		borderColor: "#f3f3f3",
		backgroundColor: "#ffffff",
		justifyContent: "center",
		borderRadius: 6,
		paddingHorizontal: 20,
		paddingVertical: 6,
		flex: 1,
		margin: 0,
		fontSize: 14,
		textDecorationLine: "none",
	},

	paragraphText: {
		fontSize: 14,
		textAlign: "center",
	},
	footerContainer: {
		alignItems: "center",
		paddingBottom: 20,
		marginTop: 8,
	},

	btnContainer: {
		height: 50,
		backgroundColor: "#008000",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		flex: 1,
	},

	btnContainer2: {
		height: 50,
		backgroundColor: "#0080001A",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		flex: 1,
	},

	btnDisabled: {
		height: 60,
		backgroundColor: "#0449824A",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		flex: 1,
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
	container: {
		flex: 1,
		backgroundColor: "#F6F6F6",
	},
	container2: {
		backgroundColor: "#ffffff",
	},
	border: {
		borderBottomWidth: 1,
		borderColor: "#000000",
		opacity: 0.1,
		marginVertical: 10,
	},
	titleText: { color: "#171D19", fontFamily: "LufgaMedium", lineHeight: 24 },
	cardContainer: {
		borderRadius: 8,
		backgroundColor: "#ffffff",
		padding: 20,
	},

	titleTextBold: {
		color: "#212121",
		fontFamily: "LufgaMedium",
		lineHeight: 30,
		fontSize: 24,
	},

	textSubTitle: {
		color: "#00000080",
		fontFamily: "LufgaMedium",
		fontSize: 12,
	},
	moreSubTitle: {
		color: "#212121",
		fontFamily: "LufgaMedium",
		fontSize: 12,
	},
	rowContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	selectDate: {
		backgroundColor: "#F3F3F3",
		padding: 4,
		flexDirection: "row",
		gap: 16,
		alignItems: "center",
		borderRadius: 4,
	},
	btnContent: {
		fontFamily: "LufgaRegular",
		color: "#ffffff",
		fontSize: 16,
	},
	btnContent2: {
		fontFamily: "LufgaRegular",
		color: "#008000",
		fontSize: 16,
	},
	textContent: {
		fontFamily: "Manrope_500Medium",
		color: "#044982",
		fontSize: 16,
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
	backgroundImage: {
		flex: 1,
	},
	imgContainer: {
		flex: 1,

		backgroundColor: "#ffffff",
	},

	power: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	powerContent: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
	wrapContent: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	maintenanceContainer: {
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
	},
	maintainanceLabel: {
		color: "#000000",
		fontFamily: "GilroyMedium",
		fontSize: 12,
	},
	requestContainer: {
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
	},
	requestText: {
		color: "#000000",
		fontFamily: "GilroyMedium",
		fontSize: 16,
	},
	buttonRequest: {
		backgroundColor: "#044982",
		padding: 10,
		borderRadius: 100,
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	buttonInnerText: {
		color: "#ffffff",
		fontFamily: "GilroyMedium",
		fontSize: 14,
	},
	tabActive: {
		color: "#044982",
		fontFamily: "GilroyMedium",
		fontSize: 14,
	},
	tab: {
		color: "#0000004D",
		fontFamily: "GilroyMedium",
		fontSize: 14,
	},

	underline: {
		height: 2,
		backgroundColor: "#044982", // or any color you prefer
		width: "130%",
		marginTop: 10, // adjust the spacing as needed
	},
	requestBodyContainer: {
		flexDirection: "row",
		padding: 20,
		borderRadius: 16,
		alignItems: "center",
		backgroundColor: "#ffffff",
		justifyContent: "space-between",
	},
	requestBodyContent: {
		flexDirection: "row",

		borderRadius: 16,
		alignItems: "center",

		gap: 6,
	},
	requestContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},

	requestBody: {
		fontFamily: "GilroyMedium",
		color: "#212121",
		opacity: 0.5,
		fontSize: 12,
	},

	transactionContainer: {
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
	},

	transactionBody: {
		color: "#171D19",
		fontFamily: "LufgaMedium",
		fontSize: 20,
	},
	viewAll: {
		color: "#008000",
		fontFamily: "LufgaMedium",
		fontSize: 14,
	},

	transactionList: {
		borderBottomColor: "#0000000D",
		borderBottomWidth: 1,
		paddingVertical: 20,
		alignItems: "center",

		justifyContent: "space-between",
		flexDirection: "row",
	},
	tranLHS: { gap: 10, flexDirection: "row", alignItems: "center" },
	topText: {
		color: "#000000",
		fontFamily: "LufgaMedium",
		fontSize: 14,
	},
	bottomText: {
		color: "#00000099",
		fontFamily: "LufgaRegular",
		fontSize: 12,
	},
	amount: {
		color: "#008000",
		textAlign: "right",
		fontFamily: "LufgaMedium",
		fontSize: 16,
	},
	outstanding: {
		color: "#FF3B30",
		textAlign: "right",
		fontFamily: "LufgaMedium",
		fontSize: 20,
	},
	walletContainer: {
		borderWidth: 1.5,
		borderColor: "#008000",
		borderStyle: "dashed",
		padding: 16,
		borderRadius: 15,
		position: "relative",
	},

	walletContent: {
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
	},
	walletText: {
		color: "#00000099",
		fontFamily: "LufgaRegular",
		fontSize: 12,
	},
	walletAmount: {
		color: "#000000",
		fontFamily: "LufgaMedium",
		fontSize: 20,
	},
	walletTotal: {
		color: "#0000001A",
		fontFamily: "LufgaMedium",
		fontSize: 20,
	},
	walletAmountSmall: {
		color: "#000000",
		fontFamily: "LufgaMedium",
		fontSize: 14,
	},
	walletAmountSmallB: {
		color: "#00000080",
		fontFamily: "LufgaMedium",
		fontSize: 12,
	},
	walletTotalSmall: {
		color: "#0000001A",
		fontFamily: "LufgaMedium",
		fontSize: 14,
	},
	newBorder: {
		borderBottomColor: "#0000000D",
		borderBottomWidth: 1,
		width: "100%",
	},
	headerArea: {
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
	},
	johnDoe: {
		fontFamily: "LufgaMedium",
		fontSize: 16,
		color: "#000000",
	},
	info: {
		fontFamily: "LufgaRegular",
		fontSize: 14,
		color: "#00000066",
	},
	posId: {
		fontFamily: "LufgaRegular",
		fontSize: 12,
		color: "#00000066",
	},
	bottomArea: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 2,
	},
	// Custom Indicator Styles
	indicatorContainer: {
		flexDirection: "row",
		width: "100%",
		height: 19, // Adjust height to your preference

		overflow: "hidden",
	},
	indicatorSegment1: {
		flex: 1,
		backgroundColor: "#004B23", // Dark green
	},
	indicatorSegment2: {
		flex: 1.5,
		backgroundColor: "#008000", // Medium green
	},
	indicatorSegment3: {
		flex: 2,
		backgroundColor: "#6CAE27", // Light green
	},
	descrription: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		gap: 16,
	},
	bottomSheetTitle: {
		fontSize: 18,
		color: "#212121",
		fontFamily: "LufgaMedium",
		textAlign: "center",
		flex: 1,
	},
	bottomSheetSelect: {
		padding: 15,
		backgroundColor: "#F6F6F6",
		borderRadius: 10,
		marginBottom: 10,
	},
	bottomSheetSelect2: {
		padding: 10,
		backgroundColor: "#ffffff",
		borderRadius: 10,
		marginBottom: 10,
	},
	bottomSheetContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	bottomSheetInner: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
	textInputStyle: {
		paddingHorizontal: 8,
		marginTop: 3,
		fontSize: 18,
		height: 50,
		borderRadius: 8,
		width: "100%",
		fontFamily: "LufgaMedium",
		backgroundColor: "#F6F6F6",
	},
	enterAmount: {
		// paddingHorizontal: 8,
		// marginTop: 3,
		fontSize: 16,
		height: 50,
		borderRadius: 8,
		width: "100%",
		fontFamily: "LufgaMedium",
		backgroundColor: "#ffffff",
	},
	calculator: {
		fontFamily: "LufgaRegular",
		fontSize: 14,
		justifyContent: "center",
		textAlign: "center",
		color: "#0000004D",
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	topContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	paymentDetail: {
		backgroundColor: "#ffffff",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 16,
	},
	paymentInner: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 6,
	},
	paymentLHS: {
		color: "#00000080",
		fontFamily: "LufgaMedium",
		fontSize: 12,
	},
	paymentRHS: {
		color: "#212121",
		fontFamily: "LufgaMedium",
		fontSize: 12,
	},
	viewDetails: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
		alignItems: "center",
	},
	detailText: {
		color: "#212121",
		fontFamily: "LufgaMedium",
		fontSize: 14,
		textDecorationLine: "underline",
		textAlign: "center",
	},
	bottomTextContainer: {
		flexDirection: "row",
		gap: 10,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	headerText: {
		fontSize: 20,
		paddingBottom: 6,
	},
	paymentHistoryGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	monthContainer: {
		width: "22%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
	TextInputTitle: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#F6F6F6",
		padding: 8,
		borderRadius: 8,
		width: "47%",
		flex: 1,
	},
	waterDetailCard: {
		backgroundColor: "#ffffff",
		padding: 20,
		borderRadius: 16,
	},
	anotherRandomness: {
		gap: 4,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	random: {
		backgroundColor: "#ffffff",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 16,
	},
	outer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10,
	},
	inner: {
		color: "#00000080",
		fontFamily: "LufgaMedium",
		fontSize: 14,
	},
	anotherInner: {
		color: "#212121",
		fontFamily: "LufgaMedium",
		fontSize: 14,
	},
	transactionToken: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#0080000F",
		padding: 10,
	},
	transactionCard: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	transactionInner: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10,
	},
	transactionRHS: {
		color: "#00000080",
		fontFamily: "GilroyMedium",
		fontSize: 14,
	},
	transactionLHS: {
		color: "#212121",
		fontFamily: "GilroyMedium",
		fontSize: 14,
	},

	verificationRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	verificationLabel: {
		fontWeight: "bold",
		color: "#333",
	},
	verificationValue: {
		color: "#666",
	},
});
