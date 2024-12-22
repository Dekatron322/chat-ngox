import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import DropdownMenu from "@/components/CustomUIComponets/DropdownMenu";
import BottomSheet from "@gorhom/bottom-sheet";
import { styles } from "@/styles/general/general";
import { router } from "expo-router";

// Define the types for your data
type MaintenanceItem = {
  id: number;
  image: any; // You can replace 'any' with the actual type if you know it
  label: string;
};

type QuoteItem = MaintenanceItem & {
  price: string;
};

type RequestItem = MaintenanceItem & {
  date: string;
};

type QuoteInfoItem = {
  id: number;
  name: string;
  value: string;
};

const maintenance: MaintenanceItem[] = [
  {
    id: 1,
    image: require("@/assets/images/Electrical.png"),
    label: "Electrical",
  },
  {
    id: 2,
    image: require("@/assets/images/Plumbing.png"),
    label: "Plumbing",
  },
  {
    id: 3,
    image: require("@/assets/images/Technical.png"),
    label: "Technical",
  },
  {
    id: 4,
    image: require("@/assets/images/Support.png"),
    label: "Support",
  },
];

const requests: RequestItem[] = [
  {
    id: 1,
    image: require("@/assets/images/Electrical.png"),
    label: "Electrical",
    date: "Submitted: Aug 11, 2024  10:00 PM",
  },
  {
    id: 2,
    image: require("@/assets/images/Plumbing.png"),
    label: "Plumbing",
    date: "Submitted: Aug 11, 2024  10:00 PM",
  },
  {
    id: 3,
    image: require("@/assets/images/Technical.png"),
    label: "Technical",
    date: "Submitted: Aug 11, 2024  10:00 PM",
  },
  {
    id: 4,
    image: require("@/assets/images/Support.png"),
    label: "Support",
    date: "Submitted: Aug 11, 2024  10:00 PM",
  },
  {
    id: 5,
    image: require("@/assets/images/Electrical.png"),
    label: "Electrical",
    date: "Submitted: Aug 11, 2024  10:00 PM",
  },
  {
    id: 6,
    image: require("@/assets/images/Electrical.png"),
    label: "Electrical",
    date: "Submitted: Aug 11, 2024  10:00 PM",
  },
  {
    id: 7,
    image: require("@/assets/images/Electrical.png"),
    label: "Electrical",
    date: "Submitted: Aug 11, 2024  10:00 PM",
  },
];

const quotes: QuoteItem[] = [
  {
    id: 1,
    image: require("@/assets/images/Electrical.png"),
    label: "Electrical",
    price: "₦ 30,000",
  },
  {
    id: 2,
    image: require("@/assets/images/Plumbing.png"),
    label: "Plumbing",
    price: "₦ 30,000",
  },
  {
    id: 3,
    image: require("@/assets/images/Technical.png"),
    label: "Technical",
    price: "₦ 30,000",
  },
];

const quoteInfo: QuoteInfoItem[] = [
  {
    id: 1,
    name: "Amount",
    value: "₦150,000",
  },
  {
    id: 2,
    name: "Gaduwa Estate Mgt",
    value: "₦150,000",
  },
  {
    id: 3,
    name: "Property ID",
    value: "AMD-0001",
  },
];

const breakdown: QuoteInfoItem[] = [
  {
    id: 1,
    name: "Ac Adapter:",
    value: "₦15,000",
  },
  {
    id: 2,
    name: "Electric Chamber:",
    value: " ₦2,000",
  },
  {
    id: 3,
    name: "Circut 3: ",
    value: "₦3,000",
  },

  {
    id: 4,
    name: "Gas:  ",
    value: "₦5,000",
  },
  {
    id: 3,
    name: "Labor:  ",
    value: "₦10,000",
  },
];

export default function MaintenanceScreen() {
  const [activeTab, setActiveTab] = useState<string>("Request");
  const [hasRequests, setHasRequests] = useState<boolean>(true);
  const [hasCompleted, setHasCompleted] = useState<boolean>(true);
  const [hasQuote, setHasQuote] = useState<boolean>(true);
  const [selectedMaintenance, setSelectedMaintenance] =
    useState<MaintenanceItem | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isSuccessBottomSheetOpen, setIsSuccessBottomSheetOpen] =
    useState<boolean>(false);
  const [isQuoteBottomSheetOpen, setIsQuoteBottomSheetOpen] =
    useState<boolean>(false);
  const successBottomSheetRef = useRef<BottomSheet>(null);
  const quoteBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "50%"], []);
  const quoteSnapPoints = useMemo(() => ["50%", "90%", "95%"], []);
  const [selectedMethod, setSelectedMethod] = useState("Wallet");
  const pinBottomSheetRef = useRef<BottomSheet>(null);
  const [buttonSpinner, setButtonSpiner] = useState(false);
  const [code, setCode] = useState(new Array(4).fill(""));
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePresentModalPress = useCallback((item: MaintenanceItem) => {
    setSelectedMaintenance(item);
    bottomSheetRef.current?.expand();
  }, []);

  const handleQuotePresentModalPress = useCallback((item: QuoteItem) => {
    setSelectedQuote(item);
    quoteBottomSheetRef.current?.expand();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index >= 0);
  }, []);

  const handleSuccessSheetChanges = useCallback((index: number) => {
    setIsSuccessBottomSheetOpen(index >= 0);
  }, []);

  const handleEdit = () => {
    console.log("Edit option selected");
    // Add your edit logic here
  };

  const handleDelete = () => {
    console.log("Delete option selected");
    // Add your delete logic here
  };

  const handleSubmit = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      successBottomSheetRef.current?.expand();
    }, 300);
  };

  const handleMethodSelect = (method: React.SetStateAction<string>) => {
    setSelectedMethod(method);
  };

  const handleOpenPinBottomSheet = () => {
    quoteBottomSheetRef.current?.close(); // Close the first bottom sheet
    pinBottomSheetRef.current?.expand(); // Open the second bottom sheet
  };

  const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(routes)/maintenanceSuccess");
    }, 3000);
  };

  const handleInput = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].current.focus();
    }

    if (text === "" && index > 0) {
      inputs.current[index - 1].current.focus();
    }
  };

  const renderBottomSheetContent = () => (
    <View style={{ padding: 20 }}>
      {/* Close Icon */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 16,
            color: "#212121",
            fontFamily: "GilroyMedium",
            textAlign: "center",
            flex: 1,
          }}
        >
          {selectedMaintenance?.label}
        </Text>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }} // Positioning the icon at the top-right corner
          onPress={() => bottomSheetRef.current?.close()}
        >
          <Feather name="x" size={24} color="#212121" />
        </TouchableOpacity>
      </View>

      <Spacer size={20} />
      <View
        style={{
          backgroundColor: "#ffffff",
          height: 220,
          borderRadius: 16,
          padding: 20,
        }}
      >
        <Text style={[styles.maintainanceLabel, { opacity: 0.5 }]}>
          Describe The Problem in Details
        </Text>
        <Spacer size={5} />
        <TextInput
          style={{
            height: 80, // Adjust height for textarea
            textAlignVertical: "top", // Align text to the top
            fontFamily: "GilroyMedium",
            lineHeight: 30,
          }}
          placeholder="My AC is making some sounds and bringing out huge amounts of water from inside, and the remote seems to also be having some issues too."
          multiline={true} // Enable multiline to allow textarea functionality
        />

        <View style={styles.border}></View>
        <Spacer size={10} />
        <Text style={[styles.maintainanceLabel, { opacity: 0.5 }]}>
          Suggest Inspection Date and Time
        </Text>
        <Spacer size={10} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.moreSubTitle, { fontSize: 14 }]}>
            Aug 11, 2024 10:00 PM
          </Text>
          <Image
            style={{ alignSelf: "center" }}
            source={require("@/assets/images/Calendar.png")}
          />
        </View>
      </View>
      <Spacer size={10} />
      <TouchableOpacity style={styles.btnContainer} onPress={handleSubmit}>
        <Text style={styles.btnContent}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSuccessBottomSheetContent = () => (
    <>
      <View style={{ padding: 20, alignItems: "center" }}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "#212121",
                fontFamily: "GilroyMedium",
                textAlign: "center",
                flex: 1,
              }}
            >
              {selectedMaintenance?.label}
            </Text>
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }} // Positioning the icon at the top-right corner
              onPress={() => successBottomSheetRef.current?.close()}
            >
              <Feather name="x" size={24} color="#212121" />
            </TouchableOpacity>
          </View>
          <Spacer size={20} />
          <Image
            style={{ alignSelf: "center" }}
            source={require("@/assets/images/green.png")}
          />
          <Spacer size={20} />
          <Text
            style={{
              fontSize: 18,
              color: "#212121",
              fontFamily: "GilroyBold",
              textAlign: "center",
            }}
          >
            Request Sent
          </Text>
          <Spacer size={10} />
          <Text
            style={{
              fontSize: 14,
              color: "#000000",
              fontFamily: "GilroyMedium",
              opacity: 0.5,
              lineHeight: 24,
              textAlign: "center",
            }}
          >
            An email or in app Notification will be sent to you for Approval of
            this request
          </Text>

          <Spacer size={60} />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => successBottomSheetRef.current?.close()}
          >
            <Text style={styles.btnContent}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  const renderQuoteBottomSheetContent = () => (
    <>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#212121",
              fontFamily: "GilroyMedium",
              textAlign: "center",
              flex: 1,
            }}
          >
            {selectedQuote?.label}
          </Text>
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }} // Positioning the icon at the top-right corner
            onPress={() => quoteBottomSheetRef.current?.close()}
          >
            <Feather name="x" size={24} color="#212121" />
          </TouchableOpacity>
        </View>
        <Spacer size={20} />
        <Text
          style={{
            color: "#044982",
            fontFamily: "GilroyBold",
            fontSize: 24,
            textAlign: "center",
          }}
        >
          {" "}
          {selectedQuote?.price}
        </Text>
        <Spacer size={20} />

        <View style={styles.cardContainer}>
          {quoteInfo.map((quote) => (
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
                {quote.name}
              </Text>
              <Text
                style={{
                  color: "#212121",
                  fontFamily: "GilroyMedium",
                  fontSize: 14,
                }}
              >
                {quote.value}
              </Text>
            </View>
          ))}
        </View>
        <Spacer size={8} />

        <View style={styles.cardContainer}>
          <Text style={{ fontFamily: "GilroyRegular", color: "#00000080" }}>
            Breakdown of Charges
          </Text>
          <Spacer size={8} />
          {breakdown.map((quote) => (
            <View
              style={{
                flexDirection: "row",

                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  color: "#212121",
                  fontFamily: "GilroyMedium",
                  fontSize: 14,
                }}
              >
                {quote.name}
              </Text>
              <Text
                style={{
                  color: "#212121",
                  fontFamily: "GilroyMedium",
                  fontSize: 14,
                }}
              >
                {quote.value}
              </Text>
            </View>
          ))}
        </View>

        <Spacer size={8} />
        <Text style={styles.titleText}>Payment Method</Text>
        <Spacer size={8} />
        <View style={styles.cardContainer}>
          {/* Wallet Option */}
          <View style={styles.rowContent}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              onPress={() => handleMethodSelect("Wallet")}
            >
              <Image source={require("@/assets/images/Wallet.png")} />
              <Text style={styles.textSubTitle}>Wallet</Text>
              <Text style={styles.moreSubTitle}> {selectedQuote?.price}</Text>
            </TouchableOpacity>

            {/* Check mark only for selected method */}
            {selectedMethod === "Wallet" && (
              <Image source={require("@/assets/images/Check.png")} />
            )}
          </View>

          <Spacer size={10} />
          <View style={styles.border}></View>
          <Spacer size={10} />

          {/* Paystack Option */}
          <View style={styles.rowContent}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              onPress={() => handleMethodSelect("Paystack")}
            >
              <Image source={require("@/assets/images/Paystack.png")} />
              <Text style={styles.textSubTitle}>Paystack</Text>
            </TouchableOpacity>

            {/* Check mark only for selected method */}
            {selectedMethod === "Paystack" && (
              <Image source={require("@/assets/images/Check.png")} />
            )}
          </View>
        </View>
        <Spacer size={8} />
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleOpenPinBottomSheet}
        >
          <Text style={styles.btnContent}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderTabContent = () => {
    if (activeTab === "Request") {
      if (!hasRequests) {
        return (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Image
              style={{ alignSelf: "center" }}
              source={require("@/assets/images/Frame.png")}
            />
          </View>
        );
      } else {
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
              {requests.map((maintain) => (
                <>
                  <Spacer size={10} />
                  <View style={styles.requestBodyContainer}>
                    <View key={maintain.id} style={styles.requestBodyContent}>
                      <Image source={maintain.image} />
                      <Spacer size={6} />
                      <View>
                        <Text style={styles.maintainanceLabel}>
                          {maintain.label}
                        </Text>
                        <Spacer size={3} />
                        <View style={styles.requestContent}>
                          <Image
                            style={{ alignSelf: "center" }}
                            source={require("@/assets/images/PaperPlaneTilt.png")}
                          />
                          <Text style={styles.requestBody}>
                            {maintain.date}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <DropdownMenu onEdit={handleEdit} onDelete={handleDelete} />
                  </View>
                </>
              ))}
            </View>
          </ScrollView>
        );
      }
    } else {
      switch (activeTab) {
        case "Approved":
          return (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={{ alignSelf: "center" }}
                source={require("@/assets/images/Frame.png")}
              />
            </View>
          );
        case "Quote":
          if (activeTab === "Quote") {
            if (!hasQuote) {
              return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Image
                    style={{ alignSelf: "center" }}
                    source={require("@/assets/images/Frame.png")}
                  />
                </View>
              );
            } else {
              return (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                    {quotes.map((quote) => (
                      <>
                        <Spacer size={10} />
                        <TouchableOpacity
                          onPress={() => handleQuotePresentModalPress(quote)}
                          style={styles.requestBodyContainer}
                        >
                          <View style={styles.requestBodyContent}>
                            <Image
                              style={{ alignSelf: "center" }}
                              source={quote.image}
                            />
                            <Spacer size={6} />
                            <View>
                              <Text style={styles.maintainanceLabel}>
                                {quote.label}
                              </Text>
                              <Spacer size={3} />
                              <View style={styles.requestContent}>
                                <Text style={styles.requestBody}>
                                  Breakdown Of Charges
                                </Text>
                                <Entypo
                                  style={{ color: "#044982" }}
                                  name="chevron-thin-down"
                                />
                              </View>
                            </View>
                          </View>
                          <Text style={styles.maintainanceLabel}>
                            {quote.price}
                          </Text>
                        </TouchableOpacity>
                      </>
                    ))}
                  </View>
                </ScrollView>
              );
            }
          }
        case "Completed":
          if (activeTab === "Completed") {
            if (!hasCompleted) {
              return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Image
                    style={{ alignSelf: "center" }}
                    source={require("@/assets/images/Frame.png")}
                  />
                </View>
              );
            } else {
              return (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                    <>
                      <Spacer size={10} />
                      <View style={styles.requestBodyContainer}>
                        <View style={styles.requestBodyContent}>
                          <Image
                            style={{ alignSelf: "center" }}
                            source={require("@/assets/images/Electrical.png")}
                          />
                          <Spacer size={6} />
                          <View>
                            <Text style={styles.maintainanceLabel}>
                              Electrical
                            </Text>
                            <Spacer size={3} />
                            <View style={styles.requestContent}>
                              <Image
                                style={{
                                  alignSelf: "center",
                                  height: 14,
                                  width: 14,
                                }}
                                source={require("@/assets/images/green.png")}
                              />
                              <Text style={styles.requestBody}>Completed</Text>
                            </View>
                          </View>
                        </View>
                        <Text style={styles.maintainanceLabel}>₦ 30,000</Text>
                      </View>
                    </>
                  </View>
                </ScrollView>
              );
            }
          }
        default:
          return null;
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container2}>
        <View style={{ backgroundColor: "#ffffff" }}>
          <CustomHeader title="Maintenance" showHistory={true} />
          <View style={styles.border}></View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Spacer size={10} />
            <View style={styles.maintenanceContainer}>
              {maintenance.map((maintain) => (
                <TouchableOpacity
                  onPress={() => handlePresentModalPress(maintain)}
                  key={maintain.id}
                  style={{ alignItems: "center" }}
                >
                  <Image source={maintain.image} />
                  <Spacer size={6} />
                  <Text style={styles.maintainanceLabel}>{maintain.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Spacer size={10} />
            <View style={styles.border}></View>
            <View style={styles.requestContainer}>
              <Text style={styles.requestText}>My Requests</Text>
              <TouchableOpacity
                style={styles.buttonRequest}
                onPress={() => setHasRequests(true)} // Simulate adding a request
              >
                <Text style={styles.buttonInnerText}>New Request</Text>
                <AntDesign style={{ color: "#ffffff" }} size={16} name="plus" />
              </TouchableOpacity>
            </View>
            <Spacer size={20} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <TouchableOpacity onPress={() => setActiveTab("Request")}>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={
                      activeTab === "Request" ? styles.tabActive : styles.tab
                    }
                  >
                    Request
                  </Text>
                  {activeTab === "Request" && <View style={styles.underline} />}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab("Approved")}>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={
                      activeTab === "Approved" ? styles.tabActive : styles.tab
                    }
                  >
                    Approved
                  </Text>
                  {activeTab === "Approved" && (
                    <View style={styles.underline} />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab("Quote")}>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={
                      activeTab === "Quote" ? styles.tabActive : styles.tab
                    }
                  >
                    Quote
                  </Text>
                  {activeTab === "Quote" && <View style={styles.underline} />}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab("Completed")}>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={
                      activeTab === "Completed" ? styles.tabActive : styles.tab
                    }
                  >
                    Completed
                  </Text>
                  {activeTab === "Completed" && (
                    <View style={styles.underline} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <View style={styles.container}>{renderTabContent()}</View>

      {isBottomSheetOpen && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
          }}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#F7F9FB" }}
      >
        {renderBottomSheetContent()}
      </BottomSheet>

      <BottomSheet
        ref={successBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#F7F9FB" }}
      >
        {renderSuccessBottomSheetContent()}
      </BottomSheet>

      <BottomSheet
        ref={quoteBottomSheetRef}
        index={-1}
        snapPoints={quoteSnapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#F7F9FB" }}
      >
        {renderQuoteBottomSheetContent()}
      </BottomSheet>

      <BottomSheet
        ref={pinBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#FFFFFF" }}
      >
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "#212121",
                fontFamily: "GilroyMedium",
                textAlign: "center",
                flex: 1,
              }}
            >
              Enter Pin To Pay
            </Text>
            <Feather
              name="x"
              size={18}
              onPress={() => pinBottomSheetRef.current?.close()}
            />
          </View>
          <Spacer size={16} />
          <Text
            style={{
              color: "#044982",
              fontFamily: "GilroyBold",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            ₦30,000
          </Text>
          <Spacer size={16} />
          <View style={styles.inputContainer}>
            {code.map((_, index) => (
              <TextInput
                key={index}
                style={styles.inputBox}
                keyboardType="number-pad"
                secureTextEntry={!passwordVisible}
                maxLength={1}
                onChangeText={(text) => handleInput(text, index)}
                value={code[index]}
                ref={inputs.current[index]}
                // returnKeyType="done"
                autoFocus={index === 0}
              />
            ))}
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <Feather name="eye" size={20} color={"#333333"} />
              ) : (
                <Image source={require("@/assets/images/eye-close-line.png")} />
              )}
            </TouchableOpacity>
          </View>
          <Spacer size={16} />
          <Text
            style={{
              color: "#044982",
              fontFamily: "GilroyMedium",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Forgot Pin
          </Text>
          {/* Add number buttons if needed */}
          {/* Example of a number button grid */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* Render number buttons */}
          </View>
          <Spacer size={16} />
          <TouchableOpacity style={styles.btnContainer} onPress={handleSignIn}>
            <Text style={styles.btnContent}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
}
