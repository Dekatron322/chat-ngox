import { View, Text, StyleSheet, Appearance, Image } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome6";

const CustomNav = ({ onPress, text, pt, pb }) => {
  return (
    <View
      style={{
        ...styles.nav,
        paddingTop: pt ? pb : 11,
        alignItems: "center",
      }}
    >
      <FontAwesome5
        onPress={onPress}
        name="arrow-left-long"
        size={16}
        color={"#000000"}
      />

      <View style={styles.navText}>
        <Text
          style={{
            color: "#131313",
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",

    alignItems: "center",
  },
  navText: {
    flex: 1,
    marginLeft: 8,

    fontSize: 14,
    lineHeight: 19,
    textAlignVertical: "center", // Added to vertically center text
  },
});

export default CustomNav;
