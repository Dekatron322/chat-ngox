import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";

const handleSignIn = () => {
  router.push("/(tabs)/home");
};
export default function RequestSuccess() {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpiner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(tabs)/home");
    }, 3000);
  };

  return (
    <LinearGradient
      colors={["#F6F6F6", "#F6F6F6", "#F6F6F6"]}
      style={{ flex: 1 }}
    >
      
      <CustomHeader title="Request for meter" showHistory={true} />
      <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#008000"
          translucent={false}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.successCirle}>
              <Image
                style={{ alignSelf: "center" }}
                source={require("@/assets/images/CheckCircle3.png")}
              />
              <Text style={styles.status}>Sent</Text>
              <Spacer size={6} />
              <Text style={styles.message}>
                You will be contacted via call from our Agents when your meter
                is Ready, Thank you.
              </Text>
            </View>
            <Spacer size={20} />
            <Text style={styles.message}>
              If you have received your Meter Validate Meter Number to Proceed
            </Text>
            <Spacer size={10} />
            <View
              style={[
                styles.TextInput,
                focusedInput === "state" && {
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
                  <TextInput
                    maxLength={100}
                    placeholder="Enter Meter Number"
                    placeholderTextColor="#212121"
                    style={styles.inputText2}
                    onFocus={() => setFocusedInput("state")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>

            <Spacer size={16} />

            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleSignIn}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.btnContent}>Validate</Text>
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
