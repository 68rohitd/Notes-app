import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { greet } from "./getTime";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{greet()}</Text>
    </View>
  );
}

styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    backgroundColor: "#0a1040",
    flexDirection: "row",
  },

  headerText: {
    padding: 10,
    color: "white",
    fontSize: 30,
  },
});
