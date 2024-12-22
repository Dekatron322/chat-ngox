import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "./Spacer";

type HeaderProps = {
  title: string;
  showHistory?: boolean;
  onBackPress?: () => void;
};

export default function CustomHeader({
  title,
  showHistory = true,
  onBackPress,
}: HeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <TouchableOpacity onPress={onBackPress || (() => router.back())}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",

            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Text style={[styles.headerText, { fontFamily: "LufgaMedium" }]}>
        {title}
      </Text>

      <Image source={require("@/assets/images/Question.png")} />
    </View>
  );
}
