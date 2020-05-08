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

      this.setState({
        todos: [...data],
      });
      console.log("Todos: ", this.state.todos);
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

      //   save to async
      const allData = [newTodo, ...this.state.todos];
      await AsyncStorage.setItem("a", JSON.stringify(allData));

      this.setState({
        todos: [newTodo, ...this.state.todos],
      });
      this.setState({ todoInput: "" });
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

  onToggleFinished = async (id) => {
    let allData = await AsyncStorage.getItem("a");
    allData = JSON.parse(allData);

    allData.map((person) => {
      if (person.id === id) {
        person.finished = !person.finished;
      }
    });

    await AsyncStorage.setItem("a", JSON.stringify(allData));

    this.setState({
      todos: [...allData],
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#0a1040", "#2e3880"]}
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
            <Card
              item={item}
              onDelete={() => this.onDelete(item.id)}
              onToggleFinished={() => this.onToggleFinished(item.id)}
            />
          )}
        />

        <View style={styles.bottomPart}>
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
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#2A345D",
  },

  todoInput: {
    borderWidth: 2,
    borderColor: "#A3661C",
    color: "white",
    padding: 10,
    fontSize: 18,
    borderRadius: 15,
    marginBottom: 10,
    width: "80%",
    alignSelf: "center",
  },

  btn: {
    alignSelf: "center",
  },

  bottomPart: {
    backgroundColor: "#151d3d",
    paddingTop: 35,
    paddingBottom: 5,
    marginBottom: -10,
    marginTop: 10,
    alignSelf: "center",
    width: "120%",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
});
