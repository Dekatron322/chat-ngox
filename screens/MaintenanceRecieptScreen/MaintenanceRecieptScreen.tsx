import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/general/general";
import SuccessHeader from "@/components/CustomUIComponets/SuccessHeader";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";

const details = [
  {
    id: 1,
    item: "Transaction Type",
    value: "Maintenance",
  },
  {
    id: 2,
    item: "Bill Provider",
    value: "Gaduwa Estate Mgt.",
  },
  {
    id: 3,
    item: "Property ID",
    value: "AMD-P0001",
  },
  {
    id: 4,
    item: "Order Amount",
    value: "₦ 150,000",
  },

  {
    id: 5,
    item: "Transaction ID",
    value: "1327hbm09ab00",
  },
  {
    id: 6,
    item: "Transaction Date",
    value: "17:09, Aug 11, 2024",
  },
  {
    id: 7,
    item: "Maintenance Type",
    value: "Electrical",
  },
  {
    id: 8,
    item: "Payment Method",
    value: "Wallet Balance",
  },
  {
    id: 9,
    item: "Status ",
    value: "Successful",
  },
];

export default function MaintenceRecieptScreen() {
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
            <Spacer size={16} />

            <ImageBackground
              source={require("@/assets/images/bgImage.png")}
              style={{ width: "100%" }}
              resizeMode="stretch" // or "stretch" if you need to cover the entire area without cutting the edges
            >
              <View
                style={{
                  padding: 40,
                }}
              >
                <Image
                  style={{ alignSelf: "center" }}
                  source={require("@/assets/images/amdlogo.png")}
                />
                <Spacer size={8} />

                <Spacer size={8} />
                <Text style={[styles.titleTextBold, { textAlign: "center" }]}>
                  ₦150,000
                </Text>
                <Spacer size={4} />
                <View
                  style={{
                    gap: 4,

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.textSubTitle, { color: "#171D19" }]}>
                    Successful Transaction
                  </Text>

                  <Text style={[styles.textSubTitle, { color: "#171D19" }]}>
                    Today 5:44PM
                  </Text>
                </View>
              </View>
              <Image
                style={{ alignSelf: "center" }}
                source={require("@/assets/images/darkline.png")}
              />
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
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
            </ImageBackground>

            <Spacer size={8} />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          //   onPress={() => router.push("/(routes)/reciept")}
        >
          <Image
            style={{ alignSelf: "center", height: 20, width: 20 }}
            source={require("@/assets/images/ShareNetwork.png")}
          />
          <Text
            style={{
              paddingVertical: 20,
              color: "#044982",
              fontFamily: "GilroyMedium",
            }}
          >
            Share Reciept
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          //   onPress={() => router.push("/(routes)/reciept")}
        >
          <Image
            style={{ alignSelf: "center", height: 20, width: 20 }}
            source={require("@/assets/images/DownloadSimple.png")}
          />
          <Text
            style={{
              paddingVertical: 20,
              color: "#044982",
              fontFamily: "GilroyMedium",
            }}
          >
            Save Document
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
