import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { styles } from "@/styles/onboarding/onboarding";

type HeaderProps = {
  title: string;
  showHistory?: boolean;
  onBackPress?: () => void;
};

export default function SuccessHeader({
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
      }}
    >
      <TouchableOpacity onPress={onBackPress || (() => router.back())}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",

            justifyContent: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Text style={[styles.headerText, { fontFamily: "GilroyMedium" }]}>
        {title}
      </Text>
      {showHistory && (
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              textAlign: "center",
              color: "#236645",
            }}
          ></Text>
        </TouchableOpacity>
      )}
      <Image source={require("@/assets/images/Headset.png")} />
    </View>
  );
}
