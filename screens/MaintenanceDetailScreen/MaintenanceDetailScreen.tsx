import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
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
    item: "Owed Amount",
    value: "₦150,000",
  },
  {
    id: 2,
    item: "Payment Amount",
    value: "₦150,000",
  },
];

const details = [
  {
    id: 1,
    item: "Biller Name",
    value: "Gaduwa Estate Mgt.",
  },
  {
    id: 2,
    item: "Transaction Type",
    value: "Maintenance",
  },
  {
    id: 3,
    item: "Payment Method",
    value: "Wallet Balance",
  },
  {
    id: 4,
    item: "Transaction ID",
    value: "1327hbm09ab00",
  },
  {
    id: 5,
    item: "Created Time",
    value: "17:09, Aug 11, 2024",
  },
  {
    id: 6,
    item: "Completed Time",
    value: "17:09, Aug 11, 2024",
  },
];

export default function MaintenanceDetailScreen() {
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
      <SuccessHeader title="Transaction Details" showHistory={true} />
      <ScrollView showsHorizontalScrollIndicator={false}>
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
                source={require("@/assets/images/Electrical.png")}
              />
              <Spacer size={8} />
              <Text
                style={[
                  styles.titleText,
                  { fontSize: 20, textAlign: "center" },
                ]}
              >
                Maintenance
              </Text>
              <Spacer size={8} />
              <Text style={[styles.titleTextBold, { textAlign: "center" }]}>
                ₦150,000
              </Text>
              <Spacer size={8} />
              <View
                style={{
                  gap: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ alignSelf: "center", height: 14, width: 14 }}
                  source={require("@/assets/images/green.png")}
                />
                <Text style={[styles.textSubTitle, { fontSize: 14 }]}>
                  Successful
                </Text>
              </View>
            </View>
            <Spacer size={16} />
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

            <Spacer size={16} />
            <View
              style={{
                backgroundColor: "#ffffff",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 16,
              }}
            >
              {details.map((payment) => (
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
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          backgroundColor: "#ffffff",
          alignItems: "center",
        }}
        onPress={() => router.push("/(routes)/maintenanceReciept")}
      >
        <Image
          style={{ alignSelf: "center", height: 20, width: 20 }}
          source={require("@/assets/images/Note.png")}
        />
        <Text
          style={{
            paddingVertical: 20,
            color: "#044982",
            fontFamily: "GilroyMedium",
          }}
        >
          View Reciept
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
