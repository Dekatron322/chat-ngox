import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { styles } from "@/styles/onboarding/onboarding";

type HeaderProps = {
  title: string;
  showHistory?: boolean;
  onBackPress?: () => void;
};

export default function TransactionHeader({
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
        // paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity onPress={onBackPress || (() => router.back())}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            backgroundColor: "#0505050f",
            borderRadius: 100,
            justifyContent: "center",
            padding: 10,
          }}
        >
          <AntDesign name="left" />
        </View>
      </TouchableOpacity>
      <Text style={[styles.headerText, { fontFamily: "Raleway_700Bold" }]}>
        {title}
      </Text>
      {showHistory && (
        <TouchableOpacity onPress={() => router.push("/(routes)/transactions")}>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              textAlign: "center",
              color: "#236645",
            }}
          >
            Download
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
