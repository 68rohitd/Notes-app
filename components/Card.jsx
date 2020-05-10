import React from "react";
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import { AntDesign } from "@expo/vector-icons";

export default class Card extends React.Component {
  constructor() {
    super();

    this.fadeAnim = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  }

  fadeOut = () => {
    Animated.timing(this.fadeAnim, {
      toValue: 0,
      duration: 200,
    }).start();

    setTimeout(() => {
      this.props.onDelete();
    }, 200);
  };

  openMenu = () => {
    this.menu.open();
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onLongPress={() => this.menu.open()}
      >
        <Animated.View
          style={{
            ...styles.card,
            opacity: this.fadeAnim,
          }}
        >
          <View style={styles.cardContent}>
            {/* toggle finished */}
            <TouchableOpacity
              style={{ marginLeft: 0, height: 25 }}
              onPress={this.props.onToggleFinished}
            >
              {this.props.item.finished === true ? (
                <AntDesign name="checkcircle" size={24} color="#c9822a" />
              ) : (
                <AntDesign name="checkcircle" size={24} />
              )}
            </TouchableOpacity>
            {/* task content */}
            {this.props.item.finished === true ? (
              <View style={{ marginLeft: 5 }}>
                <View style={{ opacity: 0.7, flexDirection: "row" }}>
                  <AntDesign
                    style={{ marginHorizontal: 5, marginBottom: 5 }}
                    name="clockcircleo"
                    size={15}
                    color="white"
                  />
                  <Text style={{ color: "white", fontSize: 10 }}>
                    {this.props.item.time}
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
                  {this.props.item.name}
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
                    {this.props.item.time}
                  </Text>
                </View>
                <Text style={styles.todoItem}>{this.props.item.name}</Text>
              </View>
            )}

            {/* popup */}
            <Menu ref={(c) => (this.menu = c)}>
              <MenuTrigger
                customStyles={{
                  triggerTouchable: {
                    onLongPress: () => this.menu.open(),
                  },
                }}
              ></MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={this.props.onEdit}
                  text="Edit this task"
                  style={{ padding: 10 }}
                />
              </MenuOptions>
            </Menu>

            {/* delete task */}
            <TouchableOpacity
              style={{ marginLeft: "auto", height: 25 }}
              onPress={this.fadeOut}
            >
              <AntDesign name="closecircle" size={24} color="#c9822a" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
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
