import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Alert,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Card from "./Card";

export default class Todos extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      todoInput: "",
      finished: false,
    };
  }

  componentDidMount = async () => {
    try {
      let data = await AsyncStorage.getItem("a");
      data = JSON.parse(data);
      console.log("data: ", data);

      // set state
      this.setState({
        todos: [...data, ...this.state.todos],
      });
    } catch (e) {
      let data = [];
      await AsyncStorage.setItem("a", JSON.stringify(data));
      console.log("didnt get data: ", data);
    }
  };

  onAdd = async () => {
    if (this.state.todoInput === "") {
      Alert.alert("Oops", "Please enter a todo!");
    } else {
      const newTodo = {
        id: Math.random().toString(),
        name: this.state.todoInput,
        finished: false,
      };

      this.setState({
        todos: [newTodo, ...this.state.todos],
      });

      this.setState({ todoInput: "" });

      // saving to localstorage
      //1. get data
      try {
        const data = await AsyncStorage.getItem("a");
        var newData = JSON.parse(data);
      } catch (e) {
        console.log(e);
      }

      //2. update data
      newData.push(newTodo);
      console.log("data: ", newData);

      //3. save data
      await AsyncStorage.setItem("a", JSON.stringify(newData));
    }

    Keyboard.dismiss();
  };

  onDelete = async (id) => {
    this.setState({
      ...this.state,
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });

    // deleting from asyncStorage
    try {
      var data = await AsyncStorage.getItem("a");
      data = JSON.parse(data);
      const filteredData = data.filter((person) => person.id !== id);
      await AsyncStorage.setItem("a", JSON.stringify(filteredData));
    } catch (e) {
      console.log(e);
    }
    console.log("deleted: ", id);
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#2A345D", "#1C245A"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 1000,
          }}
        />
        <FlatList
          data={this.state.todos}
          renderItem={({ item }) => (
            <Card>
              <TouchableOpacity
                style={styles.icon}
                // onPress={() => this.onFinished(item.id)}
              >
                <AntDesign name="checkcircle" size={24} />
              </TouchableOpacity>

              {item.finished.toString() === "true" ? (
                <Text
                  style={{
                    ...styles.todoItem,
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                  }}
                >
                  {item.name.toString()}
                </Text>
              ) : (
                <Text style={styles.todoItem}>{item.name.toString()}</Text>
              )}

              <TouchableOpacity
                style={styles.icon}
                onPress={() => this.onDelete(item.id)}
              >
                <AntDesign name="closecircle" size={24} color="#c9822a" />
              </TouchableOpacity>
            </Card>
          )}
        />
        <View style={{ marginBottom: 20 }}>
          <TextInput
            multiline
            style={styles.todoInput}
            placeholder="Enter your Todo!"
            onChangeText={(text) => this.setState({ todoInput: text })}
            value={this.state.todoInput}
          />
          <TouchableOpacity onPress={this.onAdd}>
            <AntDesign
              style={styles.btn}
              name="pluscircle"
              size={44}
              color="#A3661C"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: "auto",
  },

  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#2A345D",
  },

  todoItem: {
    marginLeft: 10,
    fontSize: 18,
    color: "white",
    width: "88%",
  },

  todoInput: {
    borderWidth: 2,
    borderColor: "#A3661C",
    color: "white",
    padding: 10,
    fontSize: 18,
    borderRadius: 15,
    marginBottom: 10,
  },

  btn: {
    alignSelf: "center",
  },
});
