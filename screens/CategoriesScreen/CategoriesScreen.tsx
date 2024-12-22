import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import ProfileHeader from "@/components/CustomUIComponets/ProfileHeader";

const categories = [
  {
    id: 1,
    image: require("@/assets/images/Rent_Green.png"),
    label: "Rent",
    url: "rents",
  },
  {
    id: 2,
    image: require("@/assets/images/Bulb.png"),
    label: "Power",
    url: "power",
  },
  {
    id: 3,
    image: require("@/assets/images/fi-sr-raindrops.png"),
    label: "Water",
    url: "water",
  },
  {
    id: 4,
    image: require("@/assets/images/Alert.png"),
    label: "Alert",
    url: "alert",
  },
  {
    id: 5,
    image: require("@/assets/images/Notice.png"),
    label: "Notice",
    url: "notifications",
  },
  {
    id: 6,
    image: require("@/assets/images/gear.png"),
    label: "Mainten..",
    url: "maintenance",
  },
  {
    id: 7,
    image: require("@/assets/images/fi-sr-home.png"),
    label: "Fixes",
    url: "fixes",
  },

  {
    id: 8,
    image: require("@/assets/images/directory.png"),
    label: "Directory",
    url: "directory",
  },
  {
    id: 9,
    image: require("@/assets/images/bookings.png"),
    label: "Bookings",
    url: "bookings",
  },
  {
    id: 10,
    image: require("@/assets/images/documents.png"),
    label: "Documents",
    url: "documents",
  },
  {
    id: 11,
    image: require("@/assets/images/chat.png"),
    label: "Chat",
    url: "chat",
  },
];

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F6F8" }}>
      <ProfileHeader title="Categories" showHistory={true} />
      <Spacer size={20} />
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "#000000",
          opacity: 0.1,
        }}
      ></View>
      <Spacer size={25} />
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            borderRadius: 18,
            backgroundColor: "#ffffff",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={{
                width: "25%", // Adjust to show 4 items per row
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
              onPress={() => router.push(`/(routes)/${category.url}`)}
            >
              <Image
                style={{ height: 24, width: 24, objectFit: "contain" }}
                source={category.image}
              />
              <Spacer size={5} />
              <Text
                style={{
                  color: "#374957",
                  fontFamily: "GilroyMedium",
                  fontSize: 14,
                }}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
