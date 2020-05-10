import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  ToastAndroid,
  Keyboard,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Card from "./Card";
import { time } from "./getTime";

export default class Todos extends Component {
  constructor() {
    super();

    this.textInput = React.createRef();

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
      ToastAndroid.show("Please enter a todo!", ToastAndroid.SHORT);
    } else {
      const newTodo = {
        id: Math.random().toString(),
        time: time(),
        name: this.state.todoInput,
        finished: false,
      };

      //   save to async
      const allData = [newTodo, ...this.state.todos];
      await AsyncStorage.setItem("a", JSON.stringify(allData));

      this.setState({
        todos: [newTodo, ...this.state.todos],
      });
      this.setState({
        todoInput: "",
      });
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

  onEdit = (item) => {
    this.setState({ todoInput: item.name }, () => {
      this.onDelete(item.id);
    });
    this.textInput.current.focus();
  };

  onToggleFinished = async (id) => {
    // fetch all data from asyncStorage
    let allData = await AsyncStorage.getItem("a");
    allData = JSON.parse(allData);

    // toggle finished property
    // 1.checking ticking or unticking...
    let taskDone = true;
    // 2. toggling
    allData.map((person) => {
      if (person.id === id) {
        person.finished = !person.finished;

        if (person.finished === true) {
          taskDone = true;
        } else {
          taskDone = false;
        }
      }
    });

    // if clicked to finish task, push to bottom, else if clicked to unfinish task, push to top !
    let notFinishedTodos = allData.filter((person) => person.id !== id);
    let singleTodo = allData.filter((person) => person.id === id);

    if (taskDone === true) {
      notFinishedTodos.push(singleTodo[0]);
    } else {
      notFinishedTodos = [singleTodo[0], ...notFinishedTodos];
    }

    allData = notFinishedTodos;
    // saving back to asyncStorage
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

        {this.state.todos.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text style={styles.emptyTodosText}>Enter your First Task!</Text>
          </View>
        ) : null}

        <FlatList
          data={this.state.todos}
          renderItem={({ item }) => (
            <Card
              item={item}
              onDelete={() => this.onDelete(item.id)}
              onEdit={() => this.onEdit(item)}
              onToggleFinished={() => this.onToggleFinished(item.id)}
            />
          )}
        />

        <View style={styles.bottomPart}>
          <TextInput
            ref={this.textInput}
            multiline
            style={styles.todoInput}
            placeholder="Add Task"
            onChangeText={(text) => this.setState({ todoInput: text })}
            value={this.state.todoInput}
          />
          <TouchableOpacity
            style={{
              width: 50,
              alignSelf: "center",
            }}
            onPress={this.onAdd}
          >
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
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#2A345D",
  },

  emptyTodosText: {
    color: "white",
    fontSize: 20,
    borderColor: "#A3661C",
    backgroundColor: "#151d3d",
    borderWidth: 2,
    borderRadius: 15,
    alignSelf: "center",
    padding: 20,
  },

  todoInput: {
    borderWidth: 2,
    borderColor: "#A3661C",
    color: "white",
    padding: 10,
    fontSize: 18,
    borderRadius: 15,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },

  btn: {
    alignSelf: "center",
  },

  bottomPart: {
    backgroundColor: "#151d3d",
    paddingTop: 20,
    paddingBottom: 5,
    marginBottom: -10,
    // marginTop: 3,
    alignSelf: "center",
    width: "110%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
