import React from "react";
import { View, Animated, TouchableOpacity, Text } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { card } from "../globalStyle";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class Card extends React.Component {
  constructor() {
    super();

    this.state = {
      markAsImp: false,
    };

    this.fadeAnim = new Animated.Value(0);
    this.resizeAnim = new Animated.Value(400);
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 500,
      }),
      Animated.spring(this.resizeAnim, {
        toValue: 370,
        tension: 10,
        friction: 3,
      }),
    ]).start();
  }

  fadeOut = (value) => {
    console.log("value: ", value);

    Animated.timing(this.fadeAnim, {
      toValue: 0,
      duration: 200,
    }).start();

    Animated.timing(this.resizeAnim, {
      toValue: 400,
      duration: 200,
    }).start();

    if (value === "delete") {
      setTimeout(() => {
        this.props.onDelete();
      }, 200);
    } else if (value === "toggle") {
      setTimeout(() => {
        this.props.onToggleFinished();
      }, 200);

      setTimeout(() => {
        Animated.timing(this.fadeAnim, {
          toValue: 1,
          duration: 200,
        }).start();

        Animated.timing(this.resizeAnim, {
          toValue: 370,
          duration: 200,
        }).start();
      }, 200);
    }
  };

  // openMenu = () => {
  //   this.menu.open();
  // };

  render() {
    return (
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="#ebebeb"
        onLongPress={() => this.menu.open()}
      >
        <Animated.View
          style={
            this.props.item.markAsImp
              ? {
                  ...card.impCard,
                  opacity: this.fadeAnim,
                  width: this.resizeAnim,
                }
              : {
                  ...card.card,
                  opacity: this.fadeAnim,
                  width: this.resizeAnim,
                }
          }
        >
          <View style={card.cardContent}>
            {/* toggle finished */}
            <TouchableOpacity
              style={{ marginLeft: 0, height: 25 }}
              onPress={() => this.fadeOut("toggle")}
            >
              {this.props.item.finished === true ? (
                <AntDesign name="checkcircle" size={24} color="#fca944" />
              ) : (
                <AntDesign name="checkcircle" size={24} color="#a3a3a3" />
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
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: "#fca944",
                  }}
                />
                <MenuOption
                  onSelect={() => this.props.onMarkAsImp()}
                  text="Mark as Important"
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: "#fca944",
                  }}
                />
              </MenuOptions>
            </Menu>

            {/* delete task */}
            <TouchableOpacity
              style={{ marginLeft: "auto", height: 25 }}
              onPress={() => this.fadeOut("delete")}
            >
              <AntDesign name="closecircle" size={24} color="#fca944" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableHighlight>
    );
  }
}
