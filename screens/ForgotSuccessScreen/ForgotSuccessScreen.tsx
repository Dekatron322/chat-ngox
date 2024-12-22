import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ForgotSuccessScreen() {
  const [buttonSpinner, setButtonSpiner] = useState(false);
  const [buttonOutlineSpinner, setOutlineButtonSpiner] = useState(false);

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(routes)/resetPassword");
    }, 3000);
  };

  const handleEmail = () => {
    setOutlineButtonSpiner(true);

    setTimeout(() => {
      setOutlineButtonSpiner(false);
      router.push("/(routes)/resetPassword");
    }, 3000);
  };

  return (
    <LinearGradient
      colors={["#ffffff", "#ffffff", "#ffffff"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        <Spacer size={16} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              fontFamily: "GilroyMedium",
              fontSize: 20,
              color: "#111111",
              textAlign: "center",
            }}
          >
            Forgot Password
          </Text>
        </View>
        <Spacer size={40} />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={require("@/assets/images/rafiki.png")}
            style={styles.slideImage}
          />
          <Text
            style={{
              fontFamily: "GilroyBold",
              fontSize: 24,
              color: "#008000",
              textAlign: "center",
            }}
          >
            Success
          </Text>
          <Spacer size={20} />
          <Text
            style={{
              fontFamily: "GilroyMedium",
              color: "#38434A",
              textAlign: "center",
              paddingHorizontal: 40,
            }}
          >
            Password Reset link has been sent to Joh********16@gmail,com
          </Text>

          <Spacer size={28} />

          <TouchableOpacity style={styles.btnContainer} onPress={handleSignIn}>
            {buttonSpinner ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.btnContent}>Continue</Text>
            )}
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,

            
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => router.push("/(routes)/signup")}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "LufgaMedium",
                  opacity: 0.6,
                  color: "#00000099",
                }}
              >
                Don't have an Account?{" "}
                <Text style={{ color: "#008000" }}>Create Account </Text>
              </Text>
            </TouchableOpacity>
          </View>
          <Spacer size={10} />
         
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
