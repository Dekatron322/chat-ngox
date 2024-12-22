import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Spacer } from "@/components/CustomUIComponets/Spacer";
import CustomHeader from "@/components/CustomUIComponets/CustomHeader";
import { styles } from "@/styles/general/general";

const StatsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={8} />
      <CustomHeader title="Transaction Stats" showHistory={true} />
    </SafeAreaView>
  );
};

export default StatsScreen;
