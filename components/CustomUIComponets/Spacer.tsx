import React from "react";
import { View } from "react-native";

interface PropType {
  size?: number;
  mt?: number;
  mb?: number;
}
export const Spacer: React.FC<PropType> = ({ size = 15, mt = 0, mb = 0 }) => (
  <View style={{ height: size, marginTop: mt, marginBottom: mb }} />
);
