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

const payments = [
  {
    id: 1,
    item: "Amount",
    value: "₦3,000,000",
  },
  {
    id: 2,
    item: "Biller Name",
    value: "Mal. Umar Suleman Sodangi",
  },
  {
    id: 3,
    item: "House ID",
    value: "AMD-0001",
  },
];

export default function SuccessScreen() {
  const [buttonSpinner, setButtonSpiner] = useState(false);

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(routes)/success");
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SuccessHeader title="Rent Payment" showHistory={true} />
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
              ₦3,000,000
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
          <Text
            style={{
              color: "#212121",
              fontFamily: "GilroyMedium",
              fontSize: 14,
              textDecorationLine: "underline",
              textAlign: "center",
            }}
            onPress={() => router.push("/(routes)/details")}
          >
            View Details
          </Text>
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
              <Text style={styles.btnContent}>Pay Againx</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
