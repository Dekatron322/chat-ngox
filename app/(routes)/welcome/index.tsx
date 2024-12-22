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
import CustomNav from "@/components/CustomUIComponets/CustomNav";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Welcome() {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpiner] = useState(false);
  const [selectedOption, setSelectedOption] = useState("owned");

  const barColorStyle =
    Platform.OS === "ios" ? "dark-content" : "light-content";
  const keyboardVerticalOffset = Platform.OS === "ios" ? 64 : 0;

  const handleSignIn = () => {
    setButtonSpiner(true);
    if (selectedOption === "renting") {
      setTimeout(() => {
        setButtonSpiner(false);
        router.push("/(routes)/rent");
      }, 3000);
    } else if (selectedOption === "owned") {
      setTimeout(() => {
        setButtonSpiner(false);
        router.push("/(routes)/owner");
      }, 3000);
    }
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
            <Spacer size={50} />

            <View style={styles.screenContent}>
              <Image
                source={require("@/assets/images/GetStarted.png")}
                style={styles.slideImage}
              />
              <Spacer size={20} />

              <TouchableOpacity
                style={
                  selectedOption === "renting"
                    ? styles.selectionCardContainerActive
                    : styles.selectionCardContainer
                }
                onPress={() => setSelectedOption("renting")}
              >
                <View style={styles.imageStyling}>
                  <Image
                    source={
                      selectedOption === "renting"
                        ? require("@/assets/images/Radio.png")
                        : require("@/assets/images/Radio-rest.png")
                    }
                  />
                </View>
                <View>
                  <Text style={styles.selectionHeader}>Renting</Text>
                  <Spacer size={6} />
                  <Text style={styles.selectionBody}>
                    Have a landlord that owns the house, and gets a yearly
                    payment from you
                  </Text>
                </View>
              </TouchableOpacity>

              <Spacer size={18} />

              <TouchableOpacity
                style={
                  selectedOption === "owned"
                    ? styles.selectionCardContainerActive
                    : styles.selectionCardContainer
                }
                onPress={() => setSelectedOption("owned")}
              >
                <Image
                  source={
                    selectedOption === "owned"
                      ? require("@/assets/images/Radio.png")
                      : require("@/assets/images/Enabled--unselected.png")
                  }
                />
                <View>
                  <Text style={styles.selectionHeader}>Owned the house</Text>
                  <Spacer size={6} />
                  <Text style={styles.selectionBody}>
                    Don't have a landlord that owns the house, you are the
                    owner.
                  </Text>
                </View>
              </TouchableOpacity>

              <Spacer size={32} />
            </View>

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
              Don't know how to get started{" "}
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
