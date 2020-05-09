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
        <TouchableOpacity
          style={{ marginLeft: 0 }}
          onPress={props.onToggleFinished}
        >
          {props.item.finished === true ? (
            <AntDesign name="checkcircle" size={24} color="#c9822a" />
          ) : (
            <AntDesign name="checkcircle" size={24} />
          )}
        </TouchableOpacity>

        {props.item.finished === true ? (
          <View style={{ marginLeft: 5 }}>
            <View style={{ opacity: 0.7, flexDirection: "row" }}>
              <AntDesign
                style={{ marginHorizontal: 5, marginBottom: 5 }}
                name="clockcircleo"
                size={15}
                color="white"
              />
              <Text style={{ color: "white", fontSize: 10 }}>
                {props.item.time}
              </Text>
            </View>

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
          </View>
        ) : (
          <View style={{ marginLeft: 5 }}>
            <View style={{ opacity: 0.7, flexDirection: "row" }}>
              <AntDesign
                style={{ marginHorizontal: 5, marginBottom: 5 }}
                name="clockcircleo"
                size={15}
                color="white"
              />
              <Text style={{ color: "white", fontSize: 10 }}>
                {props.item.time}
              </Text>
            </View>

            <Text style={styles.todoItem}>{props.item.name}</Text>
          </View>
        )}

        <TouchableOpacity style={{ marginLeft: "auto" }} onPress={fadeOut}>
          <AntDesign name="closecircle" size={24} color="#c9822a" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
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

  todoItem: {
    marginLeft: 8,
    lineHeight: 25,
    fontSize: 16,
    color: "white",
    marginRight: 55,
  },
});
