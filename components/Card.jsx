import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";

export default function Card(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.card,
        opacity: fadeAnim,
      }}
    >
      <View style={styles.cardContent}>{props.children}</View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#3b4982",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
  },
});
