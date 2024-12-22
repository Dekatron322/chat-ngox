import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
import { showMessage } from "react-native-flash-message";

export default function RequestMeterNunber() {
  const [buttonSpinner, setButtonSpiner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [otherCategory, setOtherCategory] = useState<string>("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "null",
    email: "",
    phone: "",
    address: "",
    lga: "",
    state: "",
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    
  
    const applicantDetails =
      selectedOption === "Others Specify" ? otherCategory : selectedOption;
  
    const payload = {
      ...formData,
      applicant_details: applicantDetails,
      status: true, // Assuming true for a successful request
      pub_date: new Date().toISOString(),
    };
  
    setButtonSpiner(true);
  
    try {
      const response = await fetch(
        "https://kad-electric-mob-api.fyber.site/meter-request/meter-request/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      // Log the raw response for debugging
      console.log("Raw Response:", response);
  
      // Parse the JSON from the response
      const result = await response.json();
      console.log("Parsed Response:", result);
  
      if (!response.ok) {
        throw new Error(result?.message || "Failed to submit the request. Please try again.");
      }
      // Navigate to the home screen
      showMessage({
        message: "Success",
        description: "Meter request submitted successfully!",
        type: "success",
        backgroundColor: "#008000", // Optional color customization
        color: "#fff", // Text color
        textStyle: { fontFamily: 'GilroyMedium' }
      });
      router.push("/(routes)/requestSuccess");
    } catch (error: any) {
      console.error("Error:", error);
      showMessage({
        message: "Error",
        description: error?.message || "Something Went Wrong!",
        type: "danger",
        backgroundColor: "#FF3B30", // Optional color customization
        textStyle: { fontFamily: 'GilroyMedium' }
      });
    } finally {
      setButtonSpiner(false);
    }
  };

  return (
    <LinearGradient
      colors={["#F6F6F6", "#F6F6F6", "#F6F6F6"]}
      style={{ flex: 1 }}
    >
      
      <CustomHeader title="Request for meter" showHistory={true} />
      <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#008000"
          translucent={false}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.topText}>Applicant Detais</Text>
            <Spacer size={10} />

            <View
              style={[
                styles.TextInput,
                focusedInput === "first_name" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>Full Name</Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Sherif Adamu"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    value={formData.first_name}
                    onChangeText={(value) => handleInputChange("first_name", value)}
                    onFocus={() => setFocusedInput("first_name")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>
            <Spacer size={10} />

            <View
              style={[
                styles.TextInput,
                focusedInput === "email" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>Email</Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Sherif@gmail.com"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    value={formData.email}
                    onChangeText={(value) => handleInputChange("email", value)}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>
            <Spacer size={10} />
            <View
              style={[
                styles.TextInput,
                focusedInput === "phone" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>
                    National Identity Number
                  </Text>
                  <TextInput
                    maxLength={100}
                    placeholder="1234567890"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange("phone", value)}
                    onFocus={() => setFocusedInput("phone")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>
            <Spacer size={10} />
            <View
              style={[
                styles.TextInput,
                focusedInput === "house_address" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>House Address</Text>
                  <TextInput
                    maxLength={100}
                    placeholder="No.10 kaduna North"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    value={formData.address}
                    onChangeText={(value) => handleInputChange("address", value)}
                    onFocus={() => setFocusedInput("address")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>
            <Spacer size={10} />
            <View
              style={[
                styles.TextInput,
                focusedInput === "lga" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>Local Government</Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Kaduna North"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    value={formData.lga}
                    onChangeText={(value) => handleInputChange("lga", value)}
                    onFocus={() => setFocusedInput("lga")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>
            <Spacer size={10} />
            <View
              style={[
                styles.TextInput,
                focusedInput === "state" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>State</Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Kaduna"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    value={formData.state}
                    onChangeText={(value) => handleInputChange("state", value)}
                    onFocus={() => setFocusedInput("state")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>

            <Spacer size={16} />
            <Text style={styles.topText}>Applicant Detais</Text>
            <Spacer size={16} />
            {/* Radio Buttons for Applicant Type */}
            {["Residential", "Commercial", "Industrial", "Others Specify"].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setSelectedOption(option)}
                style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
              >
                <View style={{ width: 20, height: 20, borderWidth: 2, borderColor: "#008000", justifyContent: "center", alignItems: "center", marginRight: 8 }}>
                  {selectedOption === option && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#008000" }} />}
                </View>
                <Text style={styles.TextInputTitle}>{option}</Text>
              </TouchableOpacity>
            ))}
            <Spacer size={4} />
            {selectedOption === "Others Specify" && (
              <View
                style={[
                  styles.TextInput,
                  focusedInput === "other_category" && {
                    borderColor: "#008000",
                    borderWidth: 1,
                  },
                ]}
              >
                <TextInput
                  placeholder="Specify your category"
                  placeholderTextColor="#212121"
                  style={styles.inputText}
                  value={otherCategory}
                  onChangeText={setOtherCategory}
                  onFocus={() => setFocusedInput("other_category")}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            )}
            <Spacer size={10} />

            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleSubmit}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.btnContent}>Send</Text>
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
