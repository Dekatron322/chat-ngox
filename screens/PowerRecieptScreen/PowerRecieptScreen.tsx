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
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
import { printAsync, printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing"; // Optional for sharing functionality

const details = [
  {
    id: 1,
    item: "Transaction Type",
    value: "Electricity Bill",
  },
  {
    id: 2,
    item: "Bill Provider",
    value: "Kaduna Electric",
  },
  {
    id: 3,
    item: "Meter Number",
    value: "123H-GR4-5241-800K2",
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
    item: "Unit Purchased",
    value: "45.62",
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

export default function PowerRecieptScreen() {
  const [buttonSpinner, setButtonSpiner] = useState(false);

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(routes)/success");
    }, 3000);
  };

  const handlePrint = async () => {
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="text-align: center; color: #008000;">Transaction Receipt</h1>
          <h2 style="text-align: center;">₦150,000</h2>
          <p style="text-align: center; color: #171D19;">Successful Transaction</p>
          <p style="text-align: center; color: #171D19;">Today 5:44PM</p>
          <hr style="margin: 20px 0;"/>
          <div style="padding: 20px;">
            ${details
              .map(
                (payment) => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #00000080;">${payment.item}</span>
                  <span style="color: #212121;">${payment.value}</span>
                </div>
              `
              )
              .join("")}
          </div>
        </body>
      </html>
    `;

    try {
      // Print the HTML content
      await printAsync({
        html: htmlContent,
      });
    } catch (error) {
      console.error("Failed to print receipt:", error);
    }
  };

  const handleSaveDocument = async () => {
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="text-align: center; color: #008000;">Transaction Receipt</h1>
          <h2 style="text-align: center;">₦150,000</h2>
          <p style="text-align: center; color: #171D19;">Successful Transaction</p>
          <p style="text-align: center; color: #171D19;">Today 5:44PM</p>
          <hr style="margin: 20px 0;"/>
          <div style="padding: 20px;">
            ${details
              .map(
                (payment) => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #00000080;">${payment.item}</span>
                  <span style="color: #212121;">${payment.value}</span>
                </div>
              `
              )
              .join("")}
          </div>
        </body>
      </html>
    `;

    try {
      // Generate a PDF from the HTML content
      const { uri } = await printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      const fileName = "receipt.pdf";
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Move the PDF to a visible location
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      // Optionally allow the user to share the file
      await shareAsync(fileUri);

      console.log("File saved to:", fileUri);
    } catch (error) {
      console.error("Failed to save document:", error);
    }
  };

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
                  padding: 40,
                }}
              >
                <Image
                  style={{ alignSelf: "center" }}
                  source={require("@/assets/images/Kad_logo.png")}
                />
                <Spacer size={8} />

                <Spacer size={8} />
                <Text
                  style={[
                    styles.titleTextBold,
                    { textAlign: "center", color: "#008000" },
                  ]}
                >
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
          onPress={handlePrint}
        >
          <Image
            style={{ alignSelf: "center", height: 20, width: 20 }}
            source={require("@/assets/images/ShareNetwork.png")}
          />
          <Text
            style={{
              paddingVertical: 20,
              color: "#008000",
              fontFamily: "LufgaMedium",
            }}
          >
            Print Reciepts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          onPress={handleSaveDocument}
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
