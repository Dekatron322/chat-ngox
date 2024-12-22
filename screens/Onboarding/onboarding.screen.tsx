import { useState } from "react";
import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
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
import { LinearGradient } from "expo-linear-gradient";
import AppIntroSlider from "react-native-app-intro-slider";
import { router } from "expo-router";
import { onboardingSwiperData } from "@/constants/constants";
import { styles } from "@/styles/onboarding/onboarding";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Manrope_700Bold,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderItem = ({ item }: { item: onboardingSwiperData }) => (
    <LinearGradient
      colors={["#ffffff", "#ffffff", "#ffffff"]}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 24,
        }}
      >
        <StatusBar barStyle="dark-content" />
        <Spacer size={16} />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 5,
            alignItems: "center",
          }}
          onPress={() => router.push("/(routes)/welcome")}
        >
          <Text
            style={[
              styles.paragraphText,
              { fontFamily: "Manrope_400Regular", textAlign: "right" },
            ]}
          >
            Skip
          </Text>
          <MaterialCommunityIcons name="arrow-top-right" size={18} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Image source={item.image} style={styles.slideImage} />
          </View>
          <Spacer size={24} />
          <Text
            style={{
              fontFamily: "Manrope_700Bold",
              fontSize: 24,
              color: "#004680",
            }}
          >
            {item.header}
          </Text>
          <Text
            style={[styles.paragraphText, { fontFamily: "Manrope_400Regular" }]}
          >
            {item.text}
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      onDone={() => {
        router.push("/welcome");
      }}
      onSkip={() => {
        router.push("/welcome");
      }}
      onSlideChange={(index: number) => setCurrentIndex(index)}
      renderNextButton={() => (
        <Image
          source={
            currentIndex === 1 || currentIndex === 2
              ? require("@/assets/images/next2.png")
              : require("@/assets/images/next1.png")
          }
          style={styles.slideImage}
        />
      )}
      renderDoneButton={() => (
        <View>
          <TouchableOpacity onPress={() => router.push("/(routes)/welcome")}>
            <Image
              source={require("@/assets/images/next3.png")}
              style={styles.slideImage}
            />
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
