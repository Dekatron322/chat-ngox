import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { showMessage } from "react-native-flash-message"; // Import showMessage
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";

export default function SignUp() {
  const [meterNumber, setMeterNumber] = useState("");
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const verifyMeterNumber = async () => {
    setButtonSpinner(true);

    try {
      const response = await fetch(
        `https://kad-electric-mob-api.fyber.site/payment/verify-customer/${meterNumber}`
      );
      const data = await response.json();

      console.log("API Response:", data); // Log API response

      if (response.ok && data?.status) {
        showMessage({
          message: "Success",
          description: "Meter number verified successfully!",
          type: "success",
          backgroundColor: "#008000", // Optional color customization
          color: "#fff", // Text color
          textStyle: { fontFamily: 'GilroyMedium' }
        });
        router.push("/(routes)/login");
      } else {
        showMessage({
          message: "Error",
          description: data?.message || "Invalid meter number!",
          type: "danger",
          backgroundColor: "#FF3B30", // Optional color customization
          textStyle: { fontFamily: 'GilroyMedium' }
        });
      }
    } catch (error) {
      console.error("Error verifying meter number:", error);
      showMessage({
        message: "Error",
        description: "An error occurred. Please try again.",
        type: "danger",
        backgroundColor: "#FF3B30",
        textStyle: { fontFamily: 'GilroyMedium' }
      });
    } finally {
      setButtonSpinner(false);
    }
  };

  return (
    <LinearGradient
      colors={["#F6F6F6", "#F6F6F6", "#F6F6F6"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
        <StatusBar barStyle="dark-content" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer size={20} />
          <Image
            source={require("@/assets/images/kelogo.png")}
            style={styles.slideImage}
          />

          <Spacer size={30} />
          <View>
            <Image
              source={require("@/assets/images/meter.png")}
              style={styles.slideImage}
            />

            <Spacer size={20} />

            <View
              style={[
                styles.TextInput,
                focusedInput === "meter_number" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <Text style={styles.TextInputTitle}>Meter Number</Text>
              <TextInput
                maxLength={100}
                placeholder="23456789012"
                placeholderTextColor="#212121"
                style={{
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

            <Spacer size={16} />

            <TouchableOpacity
              onPress={() => router.push("/(routes)/requestMeterNumber")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "LufgaMedium",
                  opacity: 0.6,
                  color: "#00000099",
                }}
              >
                Don't have?{" "}
                <Text style={{ color: "#008000" }}>
                  Request for meter number{" "}
                </Text>
              </Text>
            </TouchableOpacity>

            <Spacer size={16} />
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={verifyMeterNumber}
              disabled={!meterNumber || buttonSpinner}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.btnContent}>Proceed</Text>
              )}
            </TouchableOpacity>
          </View>

          <Spacer size={20} />
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text style={{ fontFamily: "LufgaRegular", color: "#00000033" }}>
            Powered By Blumentech
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
