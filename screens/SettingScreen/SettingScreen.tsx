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

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ProfileHeader title="Settings" showHistory={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer size={25} />
          <Text style={{ fontFamily: "Raleway_700Bold", fontSize: 16 }}>
            General Settings
          </Text>
          <Spacer size={10} />
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <View style={styles.cardContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Feather name="lock" size={18} />
                <Text style={styles.rhs}>Change Password</Text>
              </View>
              <AntDesign name="right" size={18} />
            </View>

            <Spacer size={25} />

            <View style={styles.cardContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <MaterialIcons name="password" size={18} />
                <Text style={styles.rhs}>Two-Factor Authentication</Text>
              </View>
              <AntDesign name="right" size={18} />
            </View>
          </View>

          <Spacer size={25} />
          <Text style={{ fontFamily: "Raleway_700Bold", fontSize: 16 }}>
            Privacy Controls
          </Text>
          <Spacer size={10} />
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <View style={styles.cardContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Feather name="trash-2" size={18} />
                <Text style={styles.rhs}>Clear Data</Text>
              </View>
              <AntDesign name="right" size={18} />
            </View>

            <Spacer size={25} />

            <View style={styles.cardContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Octicons name="blocked" size={18} />
                <Text style={styles.rhs}>Block Account</Text>
              </View>
              <AntDesign name="right" size={18} />
            </View>

            <Spacer size={25} />

            <View style={styles.cardContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Entypo name="chat" size={18} />
                <Text style={styles.rhs}>Contact Us</Text>
              </View>
              <AntDesign name="right" size={18} />
            </View>
          </View>

          <Spacer size={25} />
          <Text style={{ fontFamily: "Raleway_700Bold", fontSize: 16 }}>
            Support
          </Text>
          <Spacer size={10} />
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <View style={styles.cardContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <AntDesign name="swap" size={18} />
                <Text style={styles.rhs}>Failed Transaction</Text>
              </View>
              <AntDesign name="right" size={18} />
            </View>

            <Spacer size={25} />

            <View style={styles.cardContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <AntDesign name="questioncircle" size={18} />
                <Text style={styles.rhs}>I have a privacy question</Text>
              </View>
              <AntDesign name="right" size={18} />
            </View>

            <Spacer size={25} />

            <View style={styles.cardContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <AntDesign name="questioncircle" size={18} />
                <Text style={styles.rhs}>I have safety concern</Text>
              </View>
              <AntDesign name="right" size={18} />
            </View>
          </View>

          <Spacer size={25} />
          <Text style={{ fontFamily: "Raleway_700Bold", fontSize: 16 }}>
            More Information
          </Text>
          <Spacer size={10} />
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <View style={styles.cardContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <MaterialIcons name="privacy-tip" size={18} />
                <Text style={styles.rhs}>Privacy Policy</Text>
              </View>
              <AntDesign name="right" size={18} />
            </View>

            <Spacer size={25} />

            <View style={styles.cardContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <MaterialIcons name="privacy-tip" size={18} />
                <Text style={styles.rhs}>Terms of Service</Text>
              </View>
              <AntDesign name="right" size={18} />
            </View>

            <Spacer size={25} />

            <View style={styles.cardContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <AntDesign name="customerservice" size={18} />
                <Text style={styles.rhs}>Help and Support</Text>
              </View>
              <AntDesign name="right" size={18} />
            </View>
          </View>
          <Spacer size={10} />
          <Text
            style={{
              color: "#CE2C60",
              fontFamily: "Raleway_600SemiBold",
              fontSize: 14,
              marginTop: 2,
              textAlign: "center",
            }}
          >
            Delete Account
          </Text>

          <Spacer size={10} />
          <Text
            style={{
              color: "#888c8b",
              fontFamily: "Raleway_600SemiBold",
              fontSize: 14,
              marginTop: 2,
              textAlign: "center",
            }}
          >
            Log Out
          </Text>

          <Spacer size={60} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  lhs: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#888c8b",
  },
  rhs: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 14,
    marginTop: 2,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
