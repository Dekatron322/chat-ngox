import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Correct import for Picker
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import { styles } from "@/styles/general/general";

export default function PaymentHistory() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState("SEP");

  // Payment status for each year
  const paymentStatus2024 = {
    JAN: "paid",
    FEB: "paid",
    MAR: "paid",
    APR: "paid",
    MAY: "paid",
    JUN: "paid",
    JUL: "paid",
    AUG: "overdue",
    SEP: "pending",
    OCT: "unpaid",
    NOV: "unpaid",
    DEC: "unpaid",
  };

  const paymentStatus2023 = {
    JAN: "paid",
    FEB: "paid",
    MAR: "paid",
    APR: "paid",
    MAY: "paid",
    JUN: "paid",
    JUL: "paid",
    AUG: "paid",
    SEP: "paid",
    OCT: "overdue",
    NOV: "paid",
    DEC: "paid",
  };

  const paymentData = {
    2024: paymentStatus2024,
    2023: paymentStatus2023,
  };

  const months = [
    { key: "JAN", label: "JAN" },
    { key: "FEB", label: "FEB" },
    { key: "MAR", label: "MAR" },
    { key: "APR", label: "APR" },
    { key: "MAY", label: "MAY" },
    { key: "JUN", label: "JUN" },
    { key: "JUL", label: "JUL" },
    { key: "AUG", label: "AUG" },
    { key: "SEP", label: "SEP" },
    { key: "OCT", label: "OCT" },
    { key: "NOV", label: "NOV" },
    { key: "DEC", label: "DEC" },
  ];

  const renderIcon = (status: any) => {
    switch (status) {
      case "paid":
        return <Image source={require("@/assets/images/CheckCircle1.png")} />;
      case "pending":
        return <Image source={require("@/assets/images/WarningCircle1.png")} />;
      case "overdue":
        return <Image source={require("@/assets/images/WarningCircle.png")} />;
      default:
        return <Image source={require("@/assets/images/Ellipse33.png")} />;
    }
  };

  const years = [2024, 2023];

  return (
    <ScrollView>
      <View>
        <Spacer size={10} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Year Selector */}
          <View
            style={{ flex: 1, backgroundColor: "#F6F6F6", borderRadius: 8 }}
          >
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => setSelectedYear(itemValue)}
              style={{ height: 50 }}
            >
              {years.map((year) => (
                <Picker.Item key={year} label={`${year}`} value={year} />
              ))}
            </Picker>
          </View>

          <View
            style={{ flex: 1, backgroundColor: "#F6F6F6", borderRadius: 8 }}
          >
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
              style={{ height: 50 }}
            >
              {months.map((month) => (
                <Picker.Item
                  key={month.key}
                  label={month.label}
                  value={month.key}
                />
              ))}
            </Picker>
          </View>
        </View>

        <Spacer size={10} />

        <View style={styles.paymentHistoryGrid}>
          {months.map((month) => (
            <TouchableOpacity
              key={month.key}
              style={[
                styles.monthContainer,
                {
                  borderWidth: selectedMonth === month.key ? 2 : 0,
                  borderRadius: selectedMonth === month.key ? 8 : 0,
                  padding: selectedMonth === month.key ? 2 : 0,
                  borderColor:
                    selectedMonth === month.key ? "#008000" : "transparent",
                },
              ]}
              onPress={() => setSelectedMonth(month.key)} // Month selection
            >
              {renderIcon(paymentData[selectedYear][month.key])}
              <Spacer size={10} />
              <Text style={{ fontFamily: "LufgaMedium" }}>{month.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
