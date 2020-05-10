import React from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  TouchableOpacityComponent,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { card } from "../globalStyle";
import { AntDesign } from "@expo/vector-icons";
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native-gesture-handler";

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
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="#ebebeb"
        onLongPress={() => this.menu.open()}
      >
        <Animated.View
          style={{
            ...card.card,
            opacity: this.fadeAnim,
          }}
        >
          <View style={card.cardContent}>
            {/* toggle finished */}
            <TouchableOpacity
              style={{ marginLeft: 0, height: 25 }}
              onPress={this.props.onToggleFinished}
            >
              {this.props.item.finished === true ? (
                <AntDesign name="checkcircle" size={24} color="#fca944" />
              ) : (
                <AntDesign name="checkcircle" size={24} color="#303030" />
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
                    color="black"
                  />
                  <Text style={{ color: "black", fontSize: 10 }}>
                    {this.props.item.time}
                  </Text>
                </View>
                <Text
                  style={{
                    ...card.todoItem,
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
                    color="black"
                  />
                  <Text style={{ color: "black", fontSize: 10 }}>
                    {this.props.item.time}
                  </Text>
                </View>
                <Text style={card.todoItem}>{this.props.item.name}</Text>
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
                  style={{ padding: 10, backgroundColor: "#fca944" }}
                />
              </MenuOptions>
            </Menu>

            {/* delete task */}
            <TouchableOpacity
              style={{ marginLeft: "auto", height: 25 }}
              onPress={this.fadeOut}
            >
              <AntDesign name="closecircle" size={24} color="#fca944" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableHighlight>
    );
  }
}
