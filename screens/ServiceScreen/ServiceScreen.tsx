import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
import { styles } from "@/styles/general/general";
import BottomSheet from "@gorhom/bottom-sheet";
import { AntDesign, Feather, Fontisto } from "@expo/vector-icons";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { router } from "expo-router";

export default function ServiceScreen() {
  const [selectedYear, setSelectedYear] = useState(100);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const amountPerYear = 1500;
  const totalAmount = amountPerYear * selectedYear;
  const [selectedMethod, setSelectedMethod] = useState("Wallet");
  const [toggleOn, setToggleOn] = useState(false);
  const [code, setCode] = useState(new Array(4).fill(""));

  const handleMethodSelect = (method: React.SetStateAction<string>) => {
    setSelectedMethod(method);
  };

  const percentages = [50, 100];

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const pinBottomSheetRef = useRef<BottomSheetMethods>(null);
  const snapPoints = useMemo(() => ["25%", "72%"], []);
  const pinSnapPoints = useMemo(() => ["30%", "50%"], []);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpiner] = useState(false);

  const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(routes)/serviceSuccess");
    }, 3000);
  };

  const handleInput = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].current.focus();
    }

    if (text === "" && index > 0) {
      inputs.current[index - 1].current.focus();
    }
  };

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleOpenPinBottomSheet = () => {
    bottomSheetRef.current?.close(); // Close the first bottom sheet
    pinBottomSheetRef.current?.expand(); // Open the second bottom sheet
  };

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index >= 0);
  }, []);

  const handleToggle = () => {
    setToggleOn((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Service Charge" showHistory={true} />
      <View style={styles.border}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer size={20} />

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.titleText}>Property Details</Text>
          <Spacer size={8} />
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.textSubTitle}>Property ID:</Text>
              <Spacer size={8} />
              <Text style={styles.titleText}>AMD-0001</Text>
            </View>
            <View style={styles.border}></View>

            <Text style={styles.textSubTitle}>Address:</Text>
            <Spacer size={8} />
            <Text style={styles.titleText}>
              Address: No 38 Campbell Street, Lagos Island, Lagos State,
              Nigeria.
            </Text>
            <View style={styles.border}></View>

            <Text style={styles.textSubTitle}>House Owner:</Text>
            <Spacer size={8} />
            <Text style={styles.titleText}>Mal. Abubakar Umar Sodangi</Text>
          </View>

          <Spacer size={16} />
          <Text style={styles.titleText}>Payment Amount</Text>
          <Spacer size={8} />
          <View style={styles.cardContainer}>
            <Text style={styles.textSubTitle}>Amount</Text>

            <Spacer size={8} />

            <Text
              style={{
                color: "#044982",
                fontFamily: "GilroyBold",
                fontSize: 16,
              }}
            >
              ₦150,000 / Month
            </Text>
            <View style={styles.border}></View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.titleText}>List of services Expected</Text>
              <AntDesign name="down" size={18} />
            </View>
            <View style={styles.border}></View>

            <Text style={styles.textSubTitle}>
              This Consist of the all the services that are rendered based on
              the service charge
            </Text>
          </View>

          <Spacer size={16} />
          <Text style={styles.titleText}>Payment Duration</Text>
          <Spacer size={8} />
          <View style={styles.cardContainer}>
            <Text style={styles.textSubTitle}>Select Amount</Text>

            <Spacer size={8} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {percentages.map((percentage) => (
                <TouchableOpacity
                  key={percentage}
                  style={{
                    backgroundColor:
                      selectedYear === percentage ? "#044982" : "#F3F3F3",
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    width: "48%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    marginBottom: 10, // To ensure proper spacing between rows
                  }}
                  onPress={() => setSelectedYear(percentage)}
                >
                  <Text
                    style={{
                      color:
                        selectedYear === percentage ? "#ffffff" : "#000000",
                      fontFamily: "GilroyMedium",
                      fontSize: 14,
                    }}
                  >
                    {percentage} %
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.border}></View>

            <Text style={styles.textSubTitle}>Total Amount</Text>

            <Spacer size={8} />

            <Text
              style={{
                color: "#044982",
                fontFamily: "GilroyBold",
                fontSize: 16,
              }}
            >
              ₦{totalAmount.toLocaleString()}
            </Text>
            <Spacer size={8} />
          </View>
        </View>
        <Spacer size={20} />
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: "#ffffff",
          height: 75,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#044982",
            fontFamily: "GilroyBold",
            fontSize: 20,
          }}
        >
          ₦{totalAmount.toLocaleString()}
        </Text>
        <TouchableOpacity
          style={[styles.btnContainer, { width: 139, height: 48 }]}
          onPress={handleOpenBottomSheet}
        >
          <Text style={styles.btnContent}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      {/* Overlay for shadow background */}
      {isBottomSheetOpen && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
          }}
        />
      )}

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#F7F9FB" }}
      >
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "#212121",
                fontFamily: "GilroyMedium",
                textAlign: "center",
                flex: 1,
              }}
            >
              Payment
            </Text>
            <Feather
              name="x"
              size={18}
              onPress={() => bottomSheetRef.current?.close()}
            />
          </View>
          <Spacer size={16} />
          <Text
            style={{
              color: "#044982",
              fontFamily: "GilroyBold",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            ₦{totalAmount.toLocaleString()}
          </Text>
          <Spacer size={8} />
          {/* <Text>
              {selectedYear} year{selectedYear > 1 ? "s" : ""}
            </Text> */}
          {/* Add more payment information as needed */}
          <View style={styles.cardContainer}>
            <View style={styles.rowContent}>
              <Text style={styles.textSubTitle}>Amount</Text>

              <Text style={styles.moreSubTitle}>
                {" "}
                ₦{totalAmount.toLocaleString()}
              </Text>
            </View>

            <Spacer size={10} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.textSubTitle}>Biller Name</Text>

              <Text style={styles.moreSubTitle}>Mal. Umar Suleman Sodangi</Text>
            </View>
            <Spacer size={10} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.textSubTitle}>House ID</Text>

              <Text style={styles.moreSubTitle}>AMD-0001</Text>
            </View>
          </View>

          <Spacer size={16} />
          <Text style={styles.titleText}>Payment Method</Text>
          <Spacer size={8} />
          <View style={styles.cardContainer}>
            {/* Wallet Option */}
            <View style={styles.rowContent}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                onPress={() => handleMethodSelect("Wallet")}
              >
                <Image source={require("@/assets/images/Wallet.png")} />
                <Text style={styles.textSubTitle}>Wallet</Text>
                <Text style={styles.moreSubTitle}>
                  {" "}
                  ₦{totalAmount.toLocaleString()}
                </Text>
              </TouchableOpacity>

              {/* Check mark only for selected method */}
              {selectedMethod === "Wallet" && (
                <Image source={require("@/assets/images/Check.png")} />
              )}
            </View>

            <Spacer size={10} />
            <View style={styles.border}></View>
            <Spacer size={10} />

            {/* Paystack Option */}
            <View style={styles.rowContent}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
                onPress={() => handleMethodSelect("Paystack")}
              >
                <Image source={require("@/assets/images/Paystack.png")} />
                <Text style={styles.textSubTitle}>Paystack</Text>
              </TouchableOpacity>

              {/* Check mark only for selected method */}
              {selectedMethod === "Paystack" && (
                <Image source={require("@/assets/images/Check.png")} />
              )}
            </View>
          </View>
          <Spacer size={16} />
          <View style={styles.cardContainer}>
            <View style={styles.rowContent}>
              <Text style={styles.textSubTitle}>Automatic Renewal</Text>

              <TouchableOpacity onPress={handleToggle}>
                <Fontisto
                  name={toggleOn ? "toggle-on" : "toggle-off"} // Conditional rendering
                  style={{ color: toggleOn ? "#044982" : "#D0D0D0" }} // Color changes with state
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Spacer size={16} />
          <TouchableOpacity
            style={[styles.btnContainer]}
            onPress={handleOpenPinBottomSheet}
          >
            <Text style={styles.btnContent}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {/* Bottom Sheet for PIN Entry */}

      <BottomSheet
        ref={pinBottomSheetRef}
        index={-1}
        snapPoints={pinSnapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#FFFFFF" }}
      >
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "#212121",
                fontFamily: "GilroyMedium",
                textAlign: "center",
                flex: 1,
              }}
            >
              Enter Pin To Pay
            </Text>
            <Feather
              name="x"
              size={18}
              onPress={() => pinBottomSheetRef.current?.close()}
            />
          </View>
          <Spacer size={16} />
          <Text
            style={{
              color: "#044982",
              fontFamily: "GilroyBold",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            ₦{totalAmount.toLocaleString()}
          </Text>
          <Spacer size={16} />
          <View style={styles.inputContainer}>
            {code.map((_, index) => (
              <TextInput
                key={index}
                style={styles.inputBox}
                keyboardType="number-pad"
                secureTextEntry={!passwordVisible}
                maxLength={1}
                onChangeText={(text) => handleInput(text, index)}
                value={code[index]}
                ref={inputs.current[index]}
                // returnKeyType="done"
                autoFocus={index === 0}
              />
            ))}
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <Feather name="eye" size={20} color={"#333333"} />
              ) : (
                <Image source={require("@/assets/images/eye-close-line.png")} />
              )}
            </TouchableOpacity>
          </View>
          <Spacer size={16} />
          <Text
            style={{
              color: "#044982",
              fontFamily: "GilroyMedium",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Forgot Pin
          </Text>
          {/* Add number buttons if needed */}
          {/* Example of a number button grid */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* Render number buttons */}
          </View>
          <Spacer size={16} />
          <TouchableOpacity style={styles.btnContainer} onPress={handleSignIn}>
            {buttonSpinner ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.btnContent}>Confirm</Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
