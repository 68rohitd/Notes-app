import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Card(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
    }).start();
  }, []);

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
    }).start();

    setTimeout(() => {
      props.onDelete();
    }, 200);
  };

  return (
    <Animated.View
      style={{
        ...styles.card,
        opacity: fadeAnim,
      }}
    >
      <View style={styles.cardContent}>
        <TouchableOpacity style={styles.icon} onPress={props.onToggleFinished}>
          {props.item.finished.toString() === "true" ? (
            <AntDesign name="checkcircle" size={24} color="#c9822a" />
          ) : (
            <AntDesign name="checkcircle" size={24} />
          )}
        </TouchableOpacity>

        {props.item.finished === true ? (
          <Text
            style={{
              ...styles.todoItem,
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
              opacity: 0.4,
            }}
          >
            {props.item.name}
          </Text>
        ) : (
          <Text style={styles.todoItem}>{props.item.name}</Text>
        )}

        <TouchableOpacity style={styles.icon} onPress={fadeOut}>
          <AntDesign name="closecircle" size={24} color="#c9822a" />
        </TouchableOpacity>
      </View>
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

  icon: {
    marginLeft: "auto",
  },

  todoItem: {
    marginLeft: 8,
    fontSize: 18,
    color: "white",
    width: "82%",
  },
});
