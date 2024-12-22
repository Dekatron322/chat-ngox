import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/general/general";
import SuccessHeader from "@/components/CustomUIComponets/SuccessHeader";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const payments = [
  {
    id: 1,
    item: "Amount",
    value: "₦150,000",
  },
  {
    id: 2,
    item: "Biller Name",
    value: "Gaduwa Estate Mgt",
  },
  {
    id: 3,
    item: "Property ID",
    value: "AMD-0001",
  },
];

export default function MaintenanceSuccessScreen() {
  const [buttonSpinner, setButtonSpiner] = useState(false);

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(routes)/maintenaceDetail");
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SuccessHeader title="Payment Made" showHistory={true} />
      <Spacer size={28} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#ffffff",
              padding: 20,
              borderRadius: 16,
            }}
          >
            <Image
              style={{ alignSelf: "center" }}
              source={require("@/assets/images/green.png")}
            />
            <Spacer size={8} />
            <Text
              style={[styles.titleText, { fontSize: 20, textAlign: "center" }]}
            >
              Successful
            </Text>
            <Spacer size={8} />
            <Text style={[styles.titleTextBold, { textAlign: "center" }]}>
              ₦150,000
            </Text>
          </View>
          <Spacer size={20} />
          <View
            style={{
              backgroundColor: "#ffffff",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 16,
            }}
          >
            {payments.map((payment) => (
              <View
                key={payment.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: "#00000080",
                    fontFamily: "GilroyMedium",
                    fontSize: 14,
                  }}
                >
                  {payment.item}
                </Text>
                <Text
                  style={{
                    color: "#212121",
                    fontFamily: "GilroyMedium",
                    fontSize: 14,
                  }}
                >
                  {payment.value}
                </Text>
              </View>
            ))}
          </View>
          <Spacer size={8} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#044982",
                fontFamily: "GilroyMedium",
                fontSize: 14,
                textDecorationLine: "underline",
                textAlign: "center",
              }}
              onPress={() => router.push("/(routes)/maintenanceDetail")}
            >
              View Details
            </Text>
            <AntDesign name="arrowright" size={18} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            paddingHorizontal: 20,
            paddingBottom: 20, // Add paddingBottom to give space at the bottom
          }}
        >
          <TouchableOpacity style={styles.btnDisabled} onPress={handleSignIn}>
            {buttonSpinner ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.textContent}>Complete</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnContainer, { flex: 1 }]}
            onPress={handleSignIn}
          >
            {buttonSpinner ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.btnContent}>Pay Again</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
