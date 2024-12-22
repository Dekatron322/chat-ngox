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
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";

const payments = [
  {
    id: 1,
    item: "Amount",
    value: "₦150,000",
  },
  {
    id: 2,
    item: "Biller Name",
    value: "Kaduna Electricity",
  },
  {
    id: 3,
    item: "Customer",
    value: "Musa Umar",
  },
  {
    id: 4,
    item: "Account Number",
    value: "1234567890",
  },
];

export default function PowerSuccessScreen() {
  const [buttonSpinner, setButtonSpiner] = useState(false);

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(routes)/powerDetail");
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={8} />
      <CustomHeader title="Payment" showHistory={true} />
      <Spacer size={28} />

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ borderRadius: 16 }}>
              <Image
                style={{ alignSelf: "center" }}
                source={require("@/assets/images/Vector3.png")}
              />
              <Spacer size={8} />
              <Text
                style={[
                  styles.titleText,
                  { fontSize: 20, textAlign: "center" },
                ]}
              >
                Successful
              </Text>
              <Spacer size={8} />
              <Text style={[styles.titleTextBold, { textAlign: "center" }]}>
                ₦150,000
              </Text>
            </View>
            <Spacer size={20} />
            <View style={styles.paymentDetail}>
              {payments.map((payment) => (
                <View key={payment.id} style={styles.paymentInner}>
                  <Text style={styles.paymentLHS}>{payment.item}</Text>
                  <Text style={styles.paymentRHS}>{payment.value}</Text>
                </View>
              ))}
            </View>
            <Spacer size={8} />
            <View style={styles.viewDetails}>
              <Text
                style={styles.detailText}
                onPress={() => router.push("/(routes)/powerDetail")}
              >
                View Details
              </Text>
              <AntDesign name="arrowright" size={18} />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomTextContainer}>
          <TouchableOpacity
            style={[styles.btnContainer, { flex: 1 }]}
            onPress={handleSignIn}
          >
            {buttonSpinner ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.btnContent}>Finish</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
