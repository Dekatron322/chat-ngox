import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { Text, View } from "react-native";

import { styles } from "@/styles/onboarding/onboarding";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTabsNavigator from "@/components/navigation/BottomTabsNavigator";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "transparent" }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <BottomTabsNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
