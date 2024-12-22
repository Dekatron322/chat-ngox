import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import HomeScreen from "@/screens/HomeScreen/HomeScreen";
import TransactionScreen from "@/screens/TransactionScreen/TransactionScreen";
import ProfileScreen from "@/screens/ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          alignSelf: "center",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 80,
          width: "60%",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 13,
        },
        tabBarActiveTintColor: "#044982",
        tabBarInactiveTintColor: "#A8A8A8",
        tabBarIcon: ({ color, focused }) => {
          let imageSource;

          switch (route.name) {
            case "(routes)/home/index":
              imageSource = focused
                ? require("@/assets/images/activeTab.png")
                : require("@/assets/images/normal.png");
              break;
            case "(routes)/history/index":
              imageSource = focused
                ? require("@/assets/images/history-active.png")
                : require("@/assets/images/history.png");
              break;
            case "(routes)/wallet/index":
              imageSource = focused
                ? require("@/assets/images/website-active.png")
                : require("@/assets/images/website.png");
              break;
            case "(routes)/profile/index":
              imageSource = focused
                ? require("@/assets/images/profile-active.png")
                : require("@/assets/images/profile.png");
              break;
            default:
              return null;
          }

          return (
            <View style={[styles.iconContainer]}>
              <Image
                source={imageSource}
                style={[
                  { width: 30, height: 30 },
                  focused && styles.activeImage,
                ]}
                resizeMode="contain"
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="(routes)/home/index"
        component={HomeScreen}
        options={{
          tabBarLabel: "",
        }}
      />

      <Tab.Screen
        name="(routes)/history/index"
        component={TransactionScreen}
        options={{
          tabBarLabel: "",
        }}
      />

      <Tab.Screen
        name="(routes)/wallet/index"
        component={TransactionScreen} // This can be a placeholder since we won't actually navigate to this screen
        options={{
          tabBarLabel: "",
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                // Replace the URL with the website you want to open
                Linking.openURL("https://www.amaltechstore.com");
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="(routes)/profile/index"
        component={ProfileScreen}
        options={{
          tabBarLabel: "",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
  },

  activeImage: {
    width: 44,
    height: 44,
  },
});
