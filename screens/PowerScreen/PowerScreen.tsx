import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  Dimensions,
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
import PaymentHistory from "@/components/CustomUIComponets/PaymentHistory";

export default function PowerScreen() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const payMethodBottomSheetRef = useRef<BottomSheetMethods>(null);
  const payMethodSnapPoints = useMemo(() => ["70%", "100%"], []);
  const [code, setCode] = useState(new Array(4).fill(""));
  const [selectedPaymentType, setSelectedPaymentType] = useState("CARD");
  const payBottomSheetRef = useRef<BottomSheetMethods>(null);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const pinBottomSheetRef = useRef<BottomSheetMethods>(null);
  const snapPoints = useMemo(() => ["45%", "100%"], []);
  const pinSnapPoints = useMemo(() => ["30%", "100%"], []);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpiner] = useState(false);
  const handleSelectPaymentType = (type: string) => {
    setSelectedPaymentType(type);
    payBottomSheetRef.current?.close();
  };

  const payments = [
    {
      id: 1,
      item: "Account Name",
      value: "Kaduna Electricity",
    },
    {
      id: 2,
      item: "Account Number",
      value: "0104674762",
    },
    {
      id: 3,
      item: "Bank",
      value: "Union Bank",
    },
  ];
  const screenHeight = Dimensions.get("window").height;

  const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(routes)/powerSuccess");
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

  const handleOpenPaymentBottomSheet = () => {
    bottomSheetRef.current?.close();
    payMethodBottomSheetRef.current?.expand(); // Open the payment method selection BottomSheet
  };

  const handleOpenPinBottomSheet = () => {
    payMethodBottomSheetRef.current?.close();
    pinBottomSheetRef.current?.expand(); // Open the payment method selection BottomSheet
  };

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index >= 0);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Payment" showHistory={true} />
      <View style={styles.border}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer size={20} />

        <View style={{ paddingHorizontal: 20 }}>
          <View style={[styles.headerArea, { borderRadius: 8 }]}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image source={require("@/assets/images/Group.png")} />
              <View>
                <Text style={styles.johnDoe}>John Doe</Text>
                <Spacer size={4} />
                <Text style={styles.posId}>Account Number: 23456712</Text>
              </View>
            </View>
            <Image source={require("@/assets/images/AccountConfirm.png")} />
          </View>

          <Spacer size={16} />

          <View style={[styles.cardContainer, { alignItems: "center" }]}>
            <Text style={styles.info}>January 2024</Text>
            <Spacer size={8} />
            <Text style={styles.amount}>₦2,500.0 </Text>
            <Spacer size={16} />
            <Text style={styles.info}>Outstanding</Text>
            <Spacer size={8} />
            <Text style={styles.outstanding}>₦3,000.00 </Text>
          </View>
          <Spacer size={20} />
          <View style={[styles.cardContainer, { alignItems: "center" }]}>
            <PaymentHistory />
            <TouchableOpacity
              style={[styles.btnContainer, { width: "100%", height: 48 }]}
              onPress={handleOpenBottomSheet}
            >
              <Text style={styles.btnContent}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {isBottomSheetOpen && <View style={styles.overlay} />}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#F6F6F6" }}
      >
        <SafeAreaView style={styles.topContainer}>
          <Text style={styles.bottomSheetTitle}>Payment</Text>
          <Feather
            name="x"
            size={18}
            onPress={() => bottomSheetRef.current?.close()}
          />
        </SafeAreaView>

        <Spacer size={16} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
        >
          <Text style={[styles.amount, { textAlign: "center" }]}>₦2,500.0</Text>
          <Spacer size={8} />

          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.cardContainer}>
              <View style={styles.rowContent}>
                <Text style={styles.textSubTitle}>Amount</Text>

                <Text style={styles.moreSubTitle}>₦2,500</Text>
              </View>

              <Spacer size={10} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.textSubTitle}>Biller Name</Text>

                <Text style={styles.moreSubTitle}>Kaduna Electricity</Text>
              </View>
              <Spacer size={10} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.textSubTitle}>Customer</Text>

                <Text style={styles.moreSubTitle}>Musa Umar</Text>
              </View>
              <Spacer size={10} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.textSubTitle}>Account Number</Text>

                <Text style={styles.moreSubTitle}>1234567890</Text>
              </View>
            </View>
            <Spacer size={20} />
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleOpenPaymentBottomSheet}
            >
              <Text style={styles.btnContent}>Validate</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BottomSheet>

      <BottomSheet
        ref={payMethodBottomSheetRef}
        index={-1}
        snapPoints={payMethodSnapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#F6F6F6" }}
      >
        <View style={styles.topContainer}>
          <Text style={styles.bottomSheetTitle}>Payment Method</Text>
          <Feather
            name="x"
            size={18}
            onPress={() => payMethodBottomSheetRef.current?.close()}
          />
        </View>

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 10,

              // Set maxHeight dynamically based on screen size
            }}
          >
            <View style={{ paddingHorizontal: 20 }}>
              <View style={styles.bottomSheetSelect2}>
                <TouchableOpacity
                  style={styles.bottomSheetContent}
                  onPress={() => handleSelectPaymentType("CARD")}
                >
                  <View style={styles.bottomSheetInner}>
                    <Image
                      source={require("@/assets/images/Group2.png")}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text style={{ fontSize: 12, fontFamily: "LufgaMedium" }}>
                      CARD
                    </Text>
                  </View>
                  {selectedPaymentType === "CARD" && (
                    <Image
                      source={require("@/assets/images/CheckCircle.png")}
                    />
                  )}
                </TouchableOpacity>
                <Spacer size={3} />
                <View style={styles.newBorder}></View>
                <Spacer size={3} />
                <TouchableOpacity
                  style={styles.bottomSheetContent}
                  onPress={() => handleSelectPaymentType("CASH")}
                >
                  <View style={styles.bottomSheetInner}>
                    <Image
                      source={require("@/assets/images/Group2.png")}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text style={{ fontSize: 12, fontFamily: "LufgaMedium" }}>
                      CASH
                    </Text>
                  </View>
                  {selectedPaymentType === "CASH" && (
                    <Image
                      source={require("@/assets/images/CheckCircle.png")}
                    />
                  )}
                </TouchableOpacity>
                <Spacer size={3} />
                <View style={styles.newBorder}></View>
                <Spacer size={3} />
                <TouchableOpacity
                  style={styles.bottomSheetContent}
                  onPress={() => handleSelectPaymentType("TRANSFER")}
                >
                  <View style={styles.bottomSheetInner}>
                    <Image
                      source={require("@/assets/images/Group2.png")}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text style={{ fontSize: 12, fontFamily: "LufgaMedium" }}>
                      TRANSFER
                    </Text>
                  </View>
                  {selectedPaymentType === "TRANSFER" && (
                    <Image
                      source={require("@/assets/images/CheckCircle.png")}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <Spacer size={4} />

              {selectedPaymentType === "CARD" && (
                <>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#ffffff",
                      padding: 10,
                      borderRadius: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "LufgaMedium",
                        fontSize: 12,
                        color: "#00000033",
                      }}
                    >
                      Input Card
                    </Text>
                    <Spacer size={5} />
                    <Image
                      source={require("@/assets/images/Card.png")}
                      style={{ width: 80, height: 80, objectFit: "contain" }}
                    />
                    <Spacer size={5} />
                    <Image
                      source={require("@/assets/images/ArrowFatLinesUp.png")}
                    />
                  </View>
                  <Spacer size={8} />
                  <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={handleOpenPinBottomSheet}
                  >
                    <Text style={styles.btnContent}>Verify</Text>
                  </TouchableOpacity>
                </>
              )}
              {selectedPaymentType === "CASH" && (
                <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={handleSignIn}
                >
                  {buttonSpinner ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Text style={styles.btnContent}>Pay</Text>
                  )}
                </TouchableOpacity>
              )}
              {selectedPaymentType === "TRANSFER" && (
                <>
                  <Text
                    style={[
                      styles.headerText,
                      { fontFamily: "LufgaMedium", fontSize: 14 },
                    ]}
                  >
                    Account Details
                  </Text>
                  <View style={styles.paymentDetail}>
                    {payments.map((payment) => (
                      <View key={payment.id} style={styles.paymentInner}>
                        <Text style={styles.paymentLHS}>{payment.item}</Text>
                        <Text style={styles.paymentRHS}>{payment.value}</Text>
                      </View>
                    ))}
                  </View>
                  <Spacer size={10} />
                  <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={handleSignIn}
                  >
                    {buttonSpinner ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Text style={styles.btnContent}>Verify Payment</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </BottomSheet>

      <BottomSheet
        ref={pinBottomSheetRef}
        index={-1}
        snapPoints={pinSnapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#FFFFFF" }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.bottomSheetTitle}>Enter Card Pin</Text>
              <Feather
                name="x"
                size={18}
                onPress={() => pinBottomSheetRef.current?.close()}
              />
            </View>
            <Spacer size={16} />
            <Text style={[styles.amount, { textAlign: "center" }]}>
              ₦2,500.0
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
                  autoFocus={index === 0}
                />
              ))}
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <Feather name="eye" size={20} color={"#333333"} />
                ) : (
                  <Image
                    source={require("@/assets/images/eye-close-line.png")}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Spacer size={16} />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            ></View>
            <Spacer size={16} />
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleSignIn}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.btnContent}>Confirm</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BottomSheet>
      <Spacer size={20} />
    </SafeAreaView>
  );
}
