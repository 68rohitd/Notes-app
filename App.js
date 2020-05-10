import React, { Component } from "react";
import { MenuProvider } from "react-native-popup-menu";
import Todos from "./components/Todos";
import Header from "./components/Header";

export default class App extends Component {
  render() {
    return (
      <MenuProvider>
        <Header />
        <Todos />
      </MenuProvider>
    );
  }
}
