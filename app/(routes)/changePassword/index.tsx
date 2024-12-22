import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    Alert,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { LinearGradient } from "expo-linear-gradient";
  import { styles } from "@/styles/onboarding/onboarding";
  import { Spacer } from "@/components/CustomUIComponets/Spacer";
  import { router } from "expo-router";
  import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    meter_number: string;
  };
  
  export default function ChangePassword() {
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userId = await AsyncStorage.getItem("userId");
          if (userId) {
            const response = await fetch(
              `https://kad-electric-mob-api.fyber.site/custom-user/get-user-detail/${userId}/`
            );
            const data = await response.json();
            setUser({
              id: data.id,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              meter_number: data.meter_number,
            });
          } else {
            console.error("No user ID found.");
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
  
      fetchUserData();
    }, []);
  
    const handleChangePassword = async () => {
      if (!oldPassword || !newPassword) {
        Alert.alert("Error", "Both fields are required.");
        return;
      }
  
      if (!user) {
        Alert.alert("Error", "User not found.");
        return;
      }
  
      setButtonSpinner(true);
  
      try {
        const response = await fetch(
          `https://kad-electric-mob-api.fyber.site/custom-user/change-password/${user.id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              old_password: oldPassword,
              new_password: newPassword,
            }),
          }
        );
  
        const data = await response.json();
  
        if (response.ok) {
          Alert.alert("Success", "Password changed successfully.");
          router.push("/(routes)/login");
        } else {
          Alert.alert("Error", data.message || "Failed to change password.");
        }
      } catch (error) {
        console.error("Error changing password:", error);
        Alert.alert("Error", "An unexpected error occurred.");
      } finally {
        setButtonSpinner(false);
      }
    };
  
    return (
      <LinearGradient colors={["#F6F6F6", "#F6F6F6", "#F6F6F6"]} style={{ flex: 1 }}>
        <CustomHeader title="Change Password" showHistory={true} />
        <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor="#008000" translucent={false} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Spacer size={40} />
              <View
                style={[
                  styles.TextInput,
                  focusedInput === "Old Password" && {
                    borderColor: "#008000",
                    borderWidth: 1,
                  },
                ]}
              >
                <Text style={styles.TextInputTitle}>Old Password</Text>
                <TextInput
                  maxLength={100}
                  placeholder="Enter your old password"
                  placeholderTextColor="#212121"
                  style={styles.inputText}
                  secureTextEntry={true}
                  onFocus={() => setFocusedInput("Old Password")}
                  onBlur={() => setFocusedInput(null)}
                  onChangeText={setOldPassword}
                  value={oldPassword}
                />
              </View>
              <Spacer size={10} />
              <View
                style={[
                  styles.TextInput,
                  focusedInput === "New Password" && {
                    borderColor: "#008000",
                    borderWidth: 1,
                  },
                ]}
              >
                <Text style={styles.TextInputTitle}>New Password</Text>
                <TextInput
                  maxLength={100}
                  placeholder="Enter your new password"
                  placeholderTextColor="#212121"
                  style={styles.inputText}
                  secureTextEntry={true}
                  onFocus={() => setFocusedInput("New Password")}
                  onBlur={() => setFocusedInput(null)}
                  onChangeText={setNewPassword}
                  value={newPassword}
                />
              </View>
              <Spacer size={24} />
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={handleChangePassword}
                disabled={buttonSpinner}
              >
                {buttonSpinner ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.btnContent}>Confirm</Text>
                )}
              </TouchableOpacity>
            </View>
            <Spacer size={20} />
          </ScrollView>
          <View style={styles.footerContainer}>
            <Text style={{ fontFamily: "LufgaRegular", color: "#00000033" }}>
              Powered By Blumentech
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
  