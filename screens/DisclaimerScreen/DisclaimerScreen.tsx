import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function DisclaimerScreen() {
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
              fontFamily: "Manrope_500Medium",
              fontSize: 20,
              color: "#111111",
              textAlign: "center",
            }}
          >
            Disclaimer
          </Text>
        </View>
        <Spacer size={20} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontFamily: "LufgaRegular",
              fontSize: 14,
              color: "#333333",
              lineHeight: 22,
            }}
          >
            Here are some steps to get a property ID from your landlord to sign
            up for a real estate app:
          </Text>
          <Spacer size={16} />
          <View style={{ paddingLeft: 10 }}>
            {[
              "Contact your landlord (in person, email, phone call etc) and explain that you want to sign up for a real estate app that requires the property ID. Let them know the app will allow you to pay rent, submit maintenance requests, etc. more easily.",
              "Politely request they provide the property ID for your rental unit. This is usually a unique number assigned to each property managed by the landlord or property management company.",
              "If they don't know what it is, explain that it may be listed on your lease agreement, or they can contact the property management company to lookup the ID.",
              "Once you get the property ID, make sure to thank the landlord for providing it.",
              "Sign up for the real estate app and enter the property ID when prompted during registration. This will link your account to the specific rental property.",
              "If the landlord is unwilling or unable to provide the property ID, contact the real estate app support team to see if there are alternative ways to sign up. They may be able to look up your rental unit another way.",
              "If you are unable to get the property ID, you may not be able to utilize all features of the real estate app, but you can still try using the basic features.",
            ].map((step, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", marginBottom: 10 }}
              >
                <Text
                  style={{
                    fontFamily: "LufgaRegular",
                    fontSize: 16,
                    color: "#333333",
                    lineHeight: 22,
                    marginRight: 5,
                  }}
                >
                  •
                </Text>
                <Text
                  style={{
                    fontFamily: "LufgaRegular",
                    fontSize: 14,
                    color: "#333333",
                    lineHeight: 22,
                    flex: 1,
                  }}
                >
                  {step}
                </Text>
              </View>
            ))}
          </View>
          <Spacer size={20} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
