import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";
import { styles } from '../../styles/general/general';
import BottomSheet from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  meter_number: string;
  
};

type Transaction = {
  id: string;
  customerName: string;
  amount: string;
  pub_date: string;
  paymentChannelAmount: string;
};


export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const accountNumberSheetRef = useRef<BottomSheet>(null);
  const meterNumberSheetRef = useRef<BottomSheet>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const snapPoints = useMemo(() => ["30%", "35%"], []);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchUserData = async () => {
    try {
      // Retrieve user ID from AsyncStorage
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const response = await fetch(
          `https://kad-electric-mob-api.fyber.site/custom-user/get-user-detail/${userId}/`
        );
        const data = await response.json();

        // Set user information
        const {
          id,
          first_name,
          last_name,
          email,
          meter_number,
          
        } = data;
        setUser({
          id,
          first_name,
          last_name,
          email,
          meter_number,
          
        });

        // Check if transactions exist
        if (data.transactions) {
          setTransactions(data.transactions);
        } else {
          setTransactions([]);
        }
      } else {
        console.error("No user ID found.");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  
  
  useState(false);
  const [selectedPaymentType, setSelectedPaymentType] =
    useState<string>("Post Paid");
  const [accountNumber, setAccountNumber] = useState("");
  const [meterNumber, setMeterNumber] = useState("");

  const formatEmail = (email: string | undefined) => {
    const firstPartLength = 4; // First part of the email before "****"
    if (email) {
      const [localPart, domain] = email.split('@');
      if (localPart.length > firstPartLength) {
        return localPart.slice(0, firstPartLength) + '****' + localPart.slice(-3) + '@' + domain;
      }
    }
    return email || ''; // Return the email or empty string if undefined
  };
  

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index >= 0);
  }, []);

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#008000"
        translucent={false}
      />

      <View style={styles.headerArea}>
        <Image source={require("@/assets/images/LOGO-HORIZONTAL-COLOUR (1).png")} />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View>
            <Text style={styles.johnDoe}>{formatEmail(user?.email)}</Text>
            <Spacer size={4} />
            <Text style={styles.posId}>ID: 23456712</Text>
          </View>
          <Image source={require("@/assets/images/Group.png")} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer size={20} />
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.walletContainer}>
            <View style={styles.walletContent}>
              <Text style={styles.walletText}>Meter Numberx</Text>
              <Image source={require("@/assets/images/Eye.png")} />
            </View>
            <Spacer size={4} />

            <Text style={[styles.walletAmount, { color: "#008000", fontSize:26 }]}>
            {user?.meter_number}
            </Text>
            <Spacer size={16} />
            <View style={styles.newBorder}></View>
            <Spacer size={16} />
            <TouchableOpacity
              style={styles.bottomArea}
              onPress={() => router.push("/(routes)/stats")}
            >
              <Image source={require("@/assets/images/ChartDonut.png")} />

              <Text style={styles.walletAmountSmall}>
                View Transaction Stats
              </Text>
            </TouchableOpacity>
            <Spacer size={16} />
            <View style={styles.newBorder}></View>
            
            <TouchableOpacity
              style={styles.btnContainer}
              // onPress={handleOpenBottomSheet}
              onPress={() => {
                console.log("Account Number:", meterNumber);
                accountNumberSheetRef.current?.close();
                router.push("/(routes)/water");
              }}
            >
              <Text style={styles.btnContent}>Buy Power</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Spacer size={30} />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.transactionContainer}>
            <Text style={styles.transactionBody}>Transaction History</Text>
            <TouchableOpacity onPress={() => router.push("/(routes)/details")}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#008000" />
          ) : transactions.length > 0 ? (
            transactions
              .sort(
                (a, b) =>
                  new Date(b.pub_date).getTime() -
                  new Date(a.pub_date).getTime()
              ) // Sort by date, most recent first
              .slice(0, 7) // Limit to 7 most recent transactions
              .map((transaction) => (
                <TouchableOpacity
                  style={styles.transactionList}
                  key={transaction.id}
                  onPress={() =>
                    router.push({
                      pathname: "/(routes)/waterReciept",
                      params: { transactionId: transaction.id }, // Passing transactionId as a parameter
                    })
                  }
                >
                  <View style={styles.tranLHS}>
                    <Image
                      source={require("@/assets/images/money.png")}
                      style={{ height: 30, width: 30 }}
                    />
                    <View>
                      <Text style={styles.topText}>
                        {transaction.customerName}
                      </Text>
                      <Spacer size={4} />
                      <Text style={styles.bottomText}>
                        {new Date(transaction.pub_date).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.amount}>
                      {" "}
                      +₦
                      {transaction.amount
                        ? transaction.amount
                        : transaction.paymentChannelAmount}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
          ) : (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6, height: 300,}}>
               <Image source={require("@/assets/images/bin.png")} />
              <Text style={[styles.walletAmountSmall, { color: "#00000055"}]}>No transactions found</Text>
            </View>
          )}
        </View>
        
      </ScrollView>
      {isBottomSheetOpen && <View style={styles.overlay} />}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.bottomSheetTitle}>Top Up Wallet</Text>
              <Feather
                name="x"
                size={18}
                onPress={() => bottomSheetRef.current?.close()}
              />
            </View>
            <Spacer size={16} />
            <View>
              <View style={styles.transactionList}>
                <View style={styles.tranLHS}>
                  <Image source={require("@/assets/images/Unit.png")} />
                  <View>
                    <Text style={styles.topText}>Paga</Text>
                    <Spacer size={4} />
                    <Text style={styles.bottomText}>Bank Name</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <View>
                    <Text style={styles.amount}>8129859405</Text>
                    <Text style={styles.bottomText}>Account Number</Text>
                  </View>
                  <Image
                    source={require("@/assets/images/CopySimple (3).png")}
                  />
                </View>
              </View>
            </View>
            <Spacer size={4} />
            <Text style={styles.bottomText}>
              Money Transfers sent to this wallet will top up your paga account
              automatically and can be used for transactions
            </Text>
          </ScrollView>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
