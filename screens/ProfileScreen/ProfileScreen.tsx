import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  meter_number: string;
};

type Transaction = {
  id: string;
  customerName: string;
  amount: string;
  pub_date: string;
  paymentChannelAmount: string;
};

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      // Retrieve user ID from AsyncStorage
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const response = await fetch(
          `https://kad-electric-mob-api.fyber.site/custom-user/get-user-detail/${userId}/`
        );
        const data = await response.json();

        // Set user information
        const {
          id,
          first_name,
          last_name,
          email,
          meter_number,
          
        } = data;
        setUser({
          id,
          first_name,
          last_name,
          email,
          meter_number,
          
        });

        // Check if transactions exist
        if (data.transactions) {
          setTransactions(data.transactions);
        } else {
          setTransactions([]);
        }
      } else {
        console.error("No user ID found.");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const formatEmail = (email: string | undefined) => {
    const firstPartLength = 4; // First part of the email before "****"
    if (email) {
      const [localPart, domain] = email.split('@');
      if (localPart.length > firstPartLength) {
        return localPart.slice(0, firstPartLength) + '****' + localPart.slice(-3) + '@' + domain;
      }
    }
    return email || ''; // Return the email or empty string if undefined
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
      <CustomHeader title="Profile" showHistory={true} />
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
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <View style={styles.cardContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image source={require("@/assets/images/Avt.png")} />
                  <View>
                    <Text
                      style={{
                        fontFamily: "GilroyBold",
                        fontSize: 12,
                        color: "#171D19",
                      }}
                    >
                      {formatEmail(user?.email)}
                    </Text>
                    <Spacer size={4} />
                    <Text
                      style={{
                        fontFamily: "GilroyRegular",
                        fontSize: 12,
                        color: "#000000",
                      }}
                    >
                      {user?.meter_number}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#008000",
                    width: 60,
                    height: 32,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <Text style={{ color: "#F3F3F3" }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Spacer size={25} />

            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => router.push("/(routes)/requestMeterNumber")}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Image source={require("@/assets/images/DeviceTablet.png")} />
                  <Text style={styles.rhs}>Request for Meter</Text>
                </View>
                <Entypo name="chevron-thin-right" size={18} />
              </TouchableOpacity>
            </View>

            <Spacer size={25} />

            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <TouchableOpacity 
                style={styles.cardContainer}
                onPress={() => router.push("/(routes)/changePassword")}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Image source={require("@/assets/images/Lock.png")} />
                  <Text style={styles.rhs}>Change Password</Text>
                </View>
                <Entypo name="chevron-thin-right" size={18} />
              </TouchableOpacity>
            </View>

            <Spacer size={25} />

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
                  <Image source={require("@/assets/images/Shield.png")} />
                  <Text style={styles.rhs}>Terms of Service </Text>
                </View>
                <Entypo name="chevron-thin-right" size={18} />
              </View>

              <Spacer size={30} />

              <View style={styles.cardContainer}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Image source={require("@/assets/images/Shield.png")} />
                  <Text style={styles.rhs}>Privacy Policy </Text>
                </View>
                <Entypo name="chevron-thin-right" size={18} />
              </View>

              <Spacer size={30} />

              <View style={styles.cardContainer}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Image source={require("@/assets/images/Shield.png")} />
                  <Text style={styles.rhs}>Share App </Text>
                </View>
                <Entypo name="chevron-thin-right" size={18} />
              </View>

              <Spacer size={30} />

              <View style={styles.cardContainer}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Image source={require("@/assets/images/Shield.png")} />
                  <Text style={styles.rhs}>Website </Text>
                </View>
                <Entypo name="chevron-thin-right" size={18} />
              </View>

              <Spacer size={30} />

              <View style={styles.cardContainer}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Image source={require("@/assets/images/Logout.png")} />
                  <Text style={styles.rhs}>Log Out </Text>
                </View>
                <Entypo name="chevron-thin-right" size={18} />
              </View>
            </View>
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
    backgroundColor: "#F6F6F6",
  },
  lhs: {
    fontFamily: "GilroyMedium",
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
