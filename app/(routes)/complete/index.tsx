import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboarding";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { router } from "expo-router";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Feather } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

export default function CompleteSignUp() {
  const [buttonSpinner, setButtonSpiner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [code, setCode] = useState(new Array(4).fill(""));
  const pinBottomSheetRef = useRef<BottomSheetMethods>(null);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const pinSnapPoints = useMemo(() => ["30%", "40%"], []);
  const snapPoints = useMemo(() => ["30%", "40%"], []);

  const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));

  const handleSignIn = () => {
    setButtonSpiner(true);

    setTimeout(() => {
      setButtonSpiner(false);
      router.push("/(tabs)/home");
    }, 3000);
  };

  const handleOpenPinBottomSheet = () => {
    pinBottomSheetRef.current?.expand(); // Open the second bottom sheet
  };

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index >= 0);
  }, []);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
    pinBottomSheetRef.current?.close(); // Open the second bottom sheet
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

  return (
    <LinearGradient
      colors={["#F6F6F6", "#F6F6F6", "#F6F6F6"]}
      style={{ flex: 1 }}
    >
      <Spacer size={6} />
      <CustomHeader title="Sign Up" showHistory={true} />
      <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#008000"
          translucent={false}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Spacer size={10} />

            <View
              style={[
                styles.TextInput,
                focusedInput === "first_name" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>First Name</Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Sherif"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    onFocus={() => setFocusedInput("first_name")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>
            <Spacer size={10} />
            <View
              style={[
                styles.TextInput,
                focusedInput === "last_name" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>Last Name</Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Sherif"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    onFocus={() => setFocusedInput("last_name")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>
            <Spacer size={10} />
            <View
              style={[
                styles.TextInput,
                focusedInput === "email" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>Email</Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Sherif@gmail.com"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>
            <Spacer size={10} />
            <View
              style={[
                styles.TextInput,
                focusedInput === "house_address" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>House Address</Text>
                  <TextInput
                    maxLength={100}
                    placeholder="No.10 kaduna North"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    onFocus={() => setFocusedInput("house_address")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>
            <Spacer size={10} />
            <View
              style={[
                styles.TextInput,
                focusedInput === "lga" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>Local Government</Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Kaduna North"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    onFocus={() => setFocusedInput("lga")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>
            <Spacer size={10} />
            <View
              style={[
                styles.TextInput,
                focusedInput === "state" && {
                  borderColor: "#008000",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.TextInputTitle}>State</Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Kaduna"
                    placeholderTextColor="#212121"
                    style={styles.inputText}
                    onFocus={() => setFocusedInput("state")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>

            <Spacer size={16} />

            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleOpenPinBottomSheet}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.btnContent}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>

          <Spacer size={20} />
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text style={{ fontFamily: "LufgaRegular", color: "#00000033" }}>
            Powered By Blumentech
          </Text>
        </View>

        {/* Overlay for shadow background */}
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
          ref={pinBottomSheetRef}
          index={-1}
          snapPoints={pinSnapPoints}
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
                Create Pin
              </Text>
              <Feather
                name="x"
                size={18}
                onPress={() => pinBottomSheetRef.current?.close()}
              />
            </View>
            <Spacer size={16} />

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
                  <Image
                    source={require("@/assets/images/eye-close-line.png")}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Spacer size={16} />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            ></View>
            <Spacer size={16} />
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleOpenBottomSheet}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.btnContent}>Confirm</Text>
              )}
            </TouchableOpacity>
          </View>
        </BottomSheet>

        <BottomSheet
          ref={bottomSheetRef}
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
                Repeat Pin
              </Text>
              <Feather
                name="x"
                size={18}
                onPress={() => pinBottomSheetRef.current?.close()}
              />
            </View>
            <Spacer size={16} />

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
                  <Image
                    source={require("@/assets/images/eye-close-line.png")}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Spacer size={16} />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            ></View>
            <Spacer size={16} />
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleSignIn}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.btnContent}>Confirm</Text>
              )}
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </SafeAreaView>
    </LinearGradient>
  );
}
