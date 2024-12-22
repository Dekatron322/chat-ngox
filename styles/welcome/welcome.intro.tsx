import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import AppIntroSlider from "react-native-app-intro-slider";
import { router } from "expo-router";
import { styles } from "../onboarding/onboarding";
import { onboardingSwiperData } from "@/constants/constants";

export default function WelcomeIntroScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderItem = ({ item }: { item: onboardingSwiperData }) => (
    <LinearGradient
      colors={["#E5Ecf9", "#f6f7f9", "#e8eef9"]}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      <View style={{ marginTop: 80 }}>
        <Image source={item.image} style={styles.slideImage} />
      </View>
      <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
        {item.header}
      </Text>
      <Text style={[styles.paragraphText, { fontFamily: "Inter_400Regular" }]}>
        {item.text}
      </Text>
    </LinearGradient>
  );
  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      onDone={() => {
        router.push("/login");
      }}
      onSkip={() => {
        router.push("/login");
      }}
      renderNextButton={() => (
        <View style={styles.newButtonContainer}>
          <Text
            style={[
              styles.paragraphText,
              { fontFamily: "Inter_400Regular", color: "#FAB319" },
            ]}
          >
            Next
          </Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.newButtonContainer}>
          <TouchableOpacity
            onPress={() => router.push("/(routes)/login")}
            style={{
              backgroundColor: "#FAB319",
              overflow: "hidden",
              borderRadius: 100,
              height: "100%",
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontFamily: "Raleway_600SemiBold" }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(routes)/signup")}
            style={{
              overflow: "hidden",
              borderRadius: 100,
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: "#FAB319", fontFamily: "Raleway_600SemiBold" }}
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      )}
      showSkipButton={false}
      dotStyle={styles.dot}
      bottomButton={true}
      activeDotStyle={styles.activeDot}
    />
  );
}
