import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
import { styles } from "@/styles/general/general";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message"; 

type User = {
  id: string;
  meter_number: string;
};

export default function PrepaidScreen() {
  const [buttonSpinner, setButtonSpiner] = useState(false);
  const [meterNumber, setMeterNumber] = useState("");
  const PRICE_PER_UNIT = 600; 
  const [amount, setAmount] = useState(""); 
  const [units, setUnits] = useState(0); 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("SELF");

  const handleAmountChange = (text: string) => {
    const enteredAmount = parseFloat(text) || 0;
    setAmount(text);
    setUnits(enteredAmount / PRICE_PER_UNIT);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const response = await fetch(
          `https://kad-electric-mob-api.fyber.site/custom-user/get-user-detail/${userId}/`
        );
        const data = await response.json();
        const { id, meter_number } = data;
        setUser({ id, meter_number }); 
      } else {
        console.error("No user ID found.");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const initializePayment = async () => {
    if (loading) {
      showMessage({
        message: "Loading",
        description: "User data is still being fetched. Please try again.",
        type: "danger",
        backgroundColor: "#FF3B30", // Optional color customization
        textStyle: { fontFamily: 'GilroyMedium' }
      });
      
      return;
    }
  
    if (!user || !user.id || !user.meter_number) {
      showMessage({
        message: "Error",
        description: "User data is not available. Please try again later.",
        type: "danger",
        backgroundColor: "#FF3B30", // Optional color customization
        textStyle: { fontFamily: 'GilroyMedium' }
      });
      return;
    }
  
    if (!amount || parseFloat(amount) <= 0) {
      showMessage({
        message: "Error",
        description: "Please enter a valid amount.",
        type: "danger",
        backgroundColor: "#FF3B30", // Optional color customization
        textStyle: { fontFamily: 'GilroyMedium' }
      });    
      return;
    }
  
    if (selectedOption === "OTHERS" && !meterNumber) {
      showMessage({
        message: "Error",
        description: "Please enter the meter number for 'Buy for Others'.",
        type: "danger",
        backgroundColor: "#FF3B30", // Optional color customization
        textStyle: { fontFamily: 'GilroyMedium' }
      });
      return;
    }
  
    setButtonSpiner(true);
  
    const paymentData = {
      agentId: user.id, // Using fetched user ID
      meterNumber: selectedOption === "SELF" ? user.meter_number : meterNumber, // Using fetched meter number or entered value
      amount,
      locationOfPayment: "Kaduna",
      notes: "pay",
      telephoneNumber: "08012345678", // Default phone number
      laitude: "1", // Default latitude
      longitude: "1", // Default longitude
      payment_type: "ONLINE",
    };
  
    console.log("Payment Data Sent:", paymentData);
  
    try {
      const response = await fetch(
        `https://kad-electric-mob-api.fyber.site/payment/init/online-pay-prepaid/${user.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );
  
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
  
      const result = await response.json();
  
      console.log("Response Data:", result);
  
      if (response.ok) {
        showMessage({
          message: "Success",
          description: "Payment initialized successfully.",
          type: "success",
          backgroundColor: "#008000", // Optional color customization
          color: "#fff", // Text color
          textStyle: { fontFamily: 'GilroyMedium' }
        });
        
        // router.push("/(routes)/waterSuccess");
        router.push({
          pathname: "/(routes)/powerDetail",
          params: {
            agentId: result.agentId,
            amount: result.payload.amount,
            token: result.data.token,
            customerName: result.meterNumber,
            meterNumber: result.payload.meterNumber,
            totalUnitVended: result.data.totalUnitVended,
            checkoutUrl: result.data.checkoutUrl,
            reference: result.data.reference,
          },
        });
      } else {
        console.error("Payment initialization failed:", result);
        showMessage({
          message: "Error",
          description: result?.message || "Payment initialization failed.",
          type: "danger",
          backgroundColor: "#FF3B30", // Optional color customization
          textStyle: { fontFamily: 'GilroyMedium' }
        });
      }
    } catch (error) {
      console.error("Error during payment initialization:", error);
      showMessage({
        message: "Error",
        description: "An unexpected error occurred. Please try again.",
        type: "danger",
        backgroundColor: "#FF3B30", // Optional color customization
        textStyle: { fontFamily: 'GilroyMedium' }
      });
      
    } finally {
      setButtonSpiner(false);
    }
  };
  
  
  

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Payment" showHistory={true} />
      <View style={styles.border}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer size={20} />
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            style={[styles.headerArea, { borderRadius: 8 }]}
            onPress={() => handleOptionSelect("SELF")}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View>
                <Text style={styles.johnDoe}>Buy for Self</Text>
                <Spacer size={4} />
                <Text style={styles.posId}>Meter Number: {user?.meter_number}</Text>
              </View>
            </View>
            {selectedOption === "SELF" && (
              <Image
                style={{ height: 24, width: 24, objectFit: "contain" }}
                source={require("@/assets/images/AccountConfirm.png")}
              />
            )}
          </TouchableOpacity>
          <Spacer size={16} />
          <TouchableOpacity
            style={[styles.headerArea, { borderRadius: 8 }]}
            onPress={() => handleOptionSelect("OTHERS")}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View>
                <Text style={styles.johnDoe}>Buy for Others</Text>
                <Spacer size={4} />
              </View>
            </View>
            {selectedOption === "OTHERS" && (
              <Image
                style={{ height: 24, width: 24, objectFit: "contain" }}
                source={require("@/assets/images/AccountConfirm.png")}
              />
            )}
          </TouchableOpacity>
          <Spacer size={16} />

          <View style={[styles.cardContainer]}>
            {selectedOption === "OTHERS" && (
              <>
                <Text style={styles.info}>Meter Number</Text>
                <TextInput
                  maxLength={100}
                  placeholder="Enter Meter Number"
                  placeholderTextColor="#212121"
                  style={styles.enterAmount}
                  value={meterNumber}
                  onChangeText={setMeterNumber}
                />
                <View style={[styles.newBorder, { borderColor: "#008000" }]}></View>
                <Spacer size={16} />
              </>
            )}
            <Text style={styles.info}>Amount</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "LufgaMedium", fontSize: 24 }}>₦</Text>
              <TextInput
                keyboardType="number-pad"
                maxLength={100}
                placeholder="2500"
                placeholderTextColor="#212121"
                style={styles.enterAmount}
                value={amount}
                onChangeText={handleAmountChange}
              />
            </View>
            <View style={[styles.newBorder, { borderColor: "#008000" }]}></View>
            <Spacer size={16} />
            <Text style={styles.info}>Unit</Text>
            <Spacer size={8} />
            <Text style={{ fontFamily: "LufgaMedium", fontSize: 24 }}>
              {units.toFixed(2)}{" "}
            </Text>
            <Spacer size={8} />
            <TouchableOpacity
              style={[styles.btnContainer, { width: "100%", height: 48 }]}
              onPress={initializePayment}
              disabled={buttonSpinner}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.btnContent}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView> 
    </SafeAreaView>
  );
}
