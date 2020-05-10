import React from "react";
import { View, Text } from "react-native";
import { greet } from "./getTime";
import { header } from "../globalStyle";

export default function Header() {
  return (
    <View style={header.header}>
      <Text style={header.headerText}>{greet()}</Text>
    </View>
  );
}
