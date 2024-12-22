import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";

import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function OwnerScreen() {
  const [buttonSpinner, setButtonSpiner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const barColorStyle =
    Platform.OS === "ios" ? "dark-content" : "light-content";
  const keyboardVerticalOffset = Platform.OS === "ios" ? 64 : 0;

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(routes)/signup");
    }, 3000);
  };

  return (
    <LinearGradient
      colors={["#ffffff", "#ffffff", "#ffffff"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <Spacer size={16} />

            <View style={styles.screenContent}>
              <TouchableOpacity onPress={() => router.back()}>
                <Feather
                  name="arrow-left"
                  size={24}
                  style={{ color: "#38434A" }}
                />
              </TouchableOpacity>
              <Spacer size={40} />
              <Image
                source={require("@/assets/images/property.png")}
                style={styles.slideImage}
              />

              <Text
                style={{
                  fontFamily: "Manrope_400Regular",
                  color: "#000000",
                  textAlign: "center",
                  paddingHorizontal: 40,
                }}
              >
                Property details, crucial for the functionality of the app
              </Text>
              <Spacer size={16} />

              <View
                style={[
                  styles.TextInput,
                  focusedInput === "state" && {
                    borderColor: "#004680",
                    borderWidth: 2,
                  },
                ]}
              >
                <View style={styles.TextinputBody}>
                  <View>
                    <Text style={styles.TextInputTitle}>Property ID</Text>
                    <TextInput
                      maxLength={25}
                      placeholder="235TGREIGH"
                      placeholderTextColor="#212121"
                      style={{ padding: 0, marginTop: 3, fontSize: 16 }}
                      onFocus={() => setFocusedInput("state")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                </View>
              </View>
              <Spacer size={16} />
            </View>
            <Spacer size={16} />
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleSignIn}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.btnContent}>Continue</Text>
              )}
            </TouchableOpacity>

            <Spacer size={20} />
          </KeyboardAvoidingView>
          <View style={styles.footerContainer}>
            <Text
              style={{ fontFamily: "Manrope_400Regular", color: "#000000" }}
            >
              Don't have a property ID?{" "}
              <Text
                onPress={() => router.push("/(routes)/disclaimer")}
                style={styles.action}
              >
                Help
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
