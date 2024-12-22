import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Clipboard, // Import Clipboard API
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/general/general";

import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router, useLocalSearchParams } from "expo-router";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";

interface Transaction {
  amount: string;
  token: string;
  result: string;
  pub_date: string;
  meterNumber: string;
  customerName: string;
  payment_type: string;
  totalUnitVended: string;
  paymentChannelAmount: string;
  laitude: string;
  longitude: string;
  tariffCode: string;
  tariffRate: string;
}

export default function PowerRecieptScreen() {
  const [buttonSpinner, setButtonSpiner] = useState(false);
  const { transactionId } = useLocalSearchParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(routes)/success");
    }, 3000);
  };

  const fetchTransactionDetails = async () => {
    try {
      const response = await fetch(
        `https://kad-electric-mob-api.fyber.site/transaction/transaction/${transactionId}/`
      );
      const data = await response.json();
      setTransaction(data);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionDetails();
  }, [transactionId]);

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("Copied", "Transaction result has been copied to clipboard.");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#008000" />;
  }

  if (!transaction) {
    return <Text>No transaction data found</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={6} />
      <CustomHeader title="Transaction Details" showHistory={true} />
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
              source={require("@/assets/images/Subtract.png")}
              style={{ width: "100%" }}
              resizeMode="stretch"
            >
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 40,
                }}
              >
                <Image
                  style={{ alignSelf: "center" }}
                  source={require("@/assets/images/Kad_logo.png")}
                />
                <Spacer size={16} />

                <Text
                  style={[
                    styles.titleTextBold,
                    { textAlign: "center", color: "#008000" },
                  ]}
                >
                  {" "}
                  +₦
                  {transaction.amount
                    ? transaction.amount
                    : transaction.paymentChannelAmount}
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
                    {new Date(transaction.pub_date).toLocaleString()}
                  </Text>
                </View>
                <Spacer size={8} />
                {transaction.result ? (
                  <View style={styles.transactionToken}>
                    <Text
                      style={[
                        styles.textSubTitle,
                        { color: "#008000", fontSize: 16 },
                      ]}
                    >
                      Token:
                    </Text>
                    <Text
                      style={[
                        styles.textSubTitle,
                        { color: "#008000", fontSize: 16 },
                      ]}
                    >
                      {transaction.result}
                    </Text>
                    <TouchableOpacity
                      onPress={() => copyToClipboard(transaction.result)}
                    >
                      <Image
                        source={require("@/assets/images/CopySimple.png")}
                        style={{ width: 18, height: 18 }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.transactionToken}>
                    <Text
                      style={[
                        styles.textSubTitle,
                        {
                          color: "#008000",
                          fontSize: 16,
                          textAlign: "center",
                          flex: 1,
                        },
                      ]}
                    >
                      Cash Postpaid
                    </Text>
                  </View>
                )}
              </View>
              <Image
                style={{ alignSelf: "center" }}
                source={require("@/assets/images/darkline.png")}
              />
              <View style={styles.transactionCard}>
                <View style={styles.transactionInner}>
                  <Text style={styles.transactionRHS}>Transaction Type</Text>
                  <Text style={styles.transactionLHS}>Electricity Bill</Text>
                </View>
                <View style={styles.transactionInner}>
                  <Text style={styles.transactionRHS}>Bill Provider</Text>
                  <Text style={styles.transactionLHS}>Kaduna Electric</Text>
                </View>
                {transaction.meterNumber ? (
                  <View style={styles.transactionInner}>
                    <Text style={styles.transactionRHS}>Meter Number</Text>
                    <Text style={styles.transactionLHS}>
                      {transaction.meterNumber}
                    </Text>
                  </View>
                ) : (
                  <View></View>
                )}
                <View style={styles.transactionInner}>
                  <Text style={styles.transactionRHS}>Order Amount</Text>
                  <Text style={styles.transactionLHS}>
                    {" "}
                    +₦
                    {transaction.amount
                      ? transaction.amount
                      : transaction.paymentChannelAmount}
                  </Text>
                </View>
                <View style={styles.transactionInner}>
                  <Text style={styles.transactionRHS}>Customer Name</Text>
                  <Text style={styles.transactionLHS}>
                    {transaction.customerName}
                  </Text>
                </View>
                <View style={styles.transactionInner}>
                  <Text style={styles.transactionRHS}>Transaction Date</Text>
                  <Text style={styles.transactionLHS}>
                    {new Date(transaction.pub_date).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.transactionInner}>
                  <Text style={styles.transactionRHS}>Unit Purchased</Text>
                  <Text style={styles.transactionLHS}>
                    {transaction.totalUnitVended} Units
                  </Text>
                </View>
                <View style={styles.transactionInner}>
                  <Text style={styles.transactionRHS}>Payment Method</Text>
                  <Text style={styles.transactionLHS}>
                    {transaction.payment_type}
                  </Text>
                </View>
                <View
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
                    Status
                  </Text>
                  <Text
                    style={{
                      color: "#008000",
                      fontFamily: "GilroyMedium",
                      fontSize: 14,
                    }}
                  >
                    Successful
                  </Text>
                </View>
                <View style={styles.transactionInner}>
                  <Text style={styles.transactionRHS}>Tariff Code</Text>
                  <Text style={styles.transactionLHS}>
                    {transaction.tariffCode}
                  </Text>
                </View>
                <View style={styles.transactionInner}>
                  <Text style={styles.transactionRHS}>Tariff Rate</Text>
                  <Text style={styles.transactionLHS}>
                    {transaction.tariffRate}
                  </Text>
                </View>
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
         onPress={() => router.push("/(tabs)/home")}
        >
          <Image
            style={{ alignSelf: "center", height: 20, width: 20 }}
            source={require("@/assets/images/House.png")}
          />
          
          <Text
            style={{
              paddingVertical: 20,
              color: "#008000",
              fontFamily: "LufgaMedium",
            }}
          >
            Return Home
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
              color: "#008000",
              fontFamily: "LufgaMedium",
            }}
          >
            Save Document
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}