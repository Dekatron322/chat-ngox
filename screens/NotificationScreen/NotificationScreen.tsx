import ProfileHeader from "@/components/CustomUIComponets/ProfileHeader";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = [
  {
    id: 1,
    date: "26th Oct, 2023 8:30am",
    title: "Rent Paid success",
    description:
      "Your purchase of light bill of $1000 from Kadco has been successful.",
    image: require("@/assets/images/unread.png"),
  },
  {
    id: 2,
    date: "25th Oct, 2023 7:45am",
    title: "Power Unit Nearly Depleted:",
    description:
      "⚡ Warning: Your power unit is nearly depleted! Please recharge as soon as possible to avoid any disruption in your service. Ensure continuous power by topping up now.",
    image: require("@/assets/images/read.png"),
  },
  {
    id: 3,
    date: "25th Oct, 2023 7:45am",
    title: "Water Usage Exceeding Average:",
    description:
      "🚨 Water Usage Alert: Your water consumption has exceeded the average limits. Please review your usage to help conserve resources and avoid potential additional charges. Let's work together to make a difference!",
    image: require("@/assets/images/read.png"),
  },
  // Add more notifications as needed
];

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ProfileHeader title="Notifications" showHistory={true} />
        <Spacer size={20} />
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: "#000000",
            opacity: 0.1,
          }}
        ></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer size={25} />
          <View style={{ paddingHorizontal: 20 }}>
            {notifications.map((notification) => (
              <View
                key={notification.id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 20,
                }}
              >
                <View style={styles.cardContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 15,
                    }}
                  >
                    <Image source={notification.image} />
                    <View>
                      <Text
                        style={{
                          fontFamily: "GilroyMedium",
                          fontSize: 12,
                          color: "#A8A8A8",
                        }}
                      >
                        {notification.date}
                      </Text>
                      <Spacer size={4} />
                      <Text
                        style={{
                          fontFamily: "GilroyMedium",
                          fontSize: 14,
                          color: "#044982",
                        }}
                      >
                        {notification.title}
                      </Text>
                      <Spacer size={6} />
                      <Text
                        style={{
                          fontFamily: "GilroyRegular",
                          fontSize: 12,
                          color: "#000000",
                          width: 230,
                          lineHeight: 20,
                        }}
                      >
                        {notification.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <Spacer size={60} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F6F8",
  },
  lhs: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#888c8b",
  },
  rhs: {
    fontFamily: "GilroyMedium",
    fontSize: 14,
    marginTop: 2,
    color: "#38434A",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
