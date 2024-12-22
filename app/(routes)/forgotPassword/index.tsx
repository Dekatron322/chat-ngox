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
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { forgotPassword, signUp } from "@/services/authService";
import { showMessage } from "react-native-flash-message";


export default function ForgotPaassword() {
  const [email, setEmail] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSignUp = async () => {
    console.log("Email:", email); // Debugging email state
    
    setButtonSpinner(true);
    try {
      const response = await forgotPassword({ email });
      showMessage({
        message: "Success",
        description: "Request successful.",
        type: "success",
        backgroundColor: "#008000", // Optional color customization
        color: "#fff", // Text color
        textStyle: { fontFamily: 'GilroyMedium' }
      });
      router.push("/(routes)/forgotSuccess");
    } catch (error: any) {
      console.log(error); // Log the full error response
      showMessage({
        message: "Error",
        description: error?.message || "Failed to verify email.",
        type: "danger",
        backgroundColor: "#FF3B30", // Optional color customization
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
              source={require("@/assets/images/Frame 23.png")}
              style={styles.slideImage}
            />

            
            <Spacer size={16} />
            

            <View
              style={[
                styles.TextInput,
                focusedInput === "property_id" && {
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
                    placeholder="kad@gmail.com"
                    placeholderTextColor="#212121"
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
                  />
                </View>
              </View>
            </View>
            

            

            

            <Spacer size={16} />
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleSignUp}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color="#ffffff" />
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
      </SafeAreaView>
    </LinearGradient>
  );
}
