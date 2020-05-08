import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Todos from "./components/Todos";

export default class App extends Component {
  render() {
    return <Todos style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
});
